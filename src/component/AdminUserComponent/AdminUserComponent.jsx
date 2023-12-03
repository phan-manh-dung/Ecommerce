import React, { useEffect, useRef, useState } from 'react';
import styles from './AdminUser.module.scss';
import classNames from 'classnames/bind';
import { Button, Input, Space, Upload, Form } from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import TableComponent from '~/component/TableComponent/TableComponent';
import Loading from '../LoadingComponent/Loading';
import ModalComponent from '../ModalComponent/ModalComponent';

import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { getBase64 } from '~/utils';
import { useMutationHook } from '~/hook/useMutationHook';
import { useSelector } from 'react-redux';
import * as message from '~/component/Message/Message';
import { useQuery } from '@tanstack/react-query';
import * as UserService from '~/service/UserService';

const cx = classNames.bind(styles);

const AdminUserComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState(''); // lấy id
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchChedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const user = useSelector((state) => state?.user); // truy xuất dữ liệu từ store

    const initial = () => ({
        name: '',
        email: '',
        isAdmin: false,
        phone: '',
        address: '',
        avatar: '',
        city: '',
        //  dateOfBirth: '',
        sex: '',
        country: '',
        //   nickname: '',
    });

    const [stateUser, setStateUser] = useState(initial());
    const [stateUserDetails, setStateUserDetails] = useState(initial());
    const [form] = Form.useForm();

    const mutation = useMutationHook((data) => {
        // tương tác với store cập nhật data
        const { name, email, isAdmin, phone, address, city, dateOfBirth, sex, country, nickname, avatar } = data;
        const res = UserService.signUpUser({
            name,
            email,
            isAdmin,
            phone,
            address,
            city,
            dateOfBirth,
            sex,
            country,
            nickname,
            avatar,
        });
        return res;
    });

    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...rests } = data;
        const res = UserService.updateUser(id, { ...rests }, token);
        return res;
    });

    const getAllUsers = async () => {
        const res = await UserService.getAllUser();
        return res;
    };

    const queryUser = useQuery({ queryKey: ['user'], queryFn: getAllUsers });

    const fetchGetDetailUser = async (rowSelected) => {
        const res = await UserService.getDetailUser(rowSelected); // rowselected là id
        if (res?.data) {
            setStateUserDetails({
                name: res?.data?.name,
                email: res?.data?.email,
                isAdmin: res?.data?.isAdmin,
                phone: res?.data?.phone,
                address: res?.data?.address,
                city: res?.data?.city,
                dateOfBirth: res?.data?.dateOfBirth,
                sex: res?.data?.sex,
                country: res?.data?.country,
                nickname: res?.data?.nickname,
                avatar: res?.data?.avatar,
            });
        }
        setIsLoadingUpdate(false);
    };

    const mutationDeleted = useMutationHook((data) => {
        const { id, token } = data;
        const res = UserService.deleteUser(id, token);
        return res;
    });

    const mutationDeletedMany = useMutationHook((data) => {
        const { token, ...ids } = data;
        const res = UserService.deleteManyUser(ids, token);
        return res;
    });

    const handleDeleteManyUser = (ids) => {
        mutationDeletedMany.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            },
        ); // xử lí tác vụ bất đồng bộ backend
    };

    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateUserDetails);
        } else {
            form.setFieldsValue(initial());
        }
    }, [form, stateUserDetails, isModalOpen]);

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true);
            fetchGetDetailUser(rowSelected);
        }
    }, [rowSelected, isOpenDrawer]);

    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined
                    style={{ color: 'red', fontSize: '25px', padding: '0 1%', cursor: 'pointer' }}
                    onClick={() => setIsModalOpenDelete(true)}
                />
                <EditOutlined
                    style={{ color: 'green', fontSize: '25px', padding: '0 1%', cursor: 'pointer' }}
                    onClick={handleDetailUser}
                />
            </div>
        );
    };

    const { data, isLoading, isSuccess, isError } = mutation; // tác vụ thay đổi dữ liệu

    const handleDeleteUser = () => {
        mutationDeleted.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            },
        );
    };

    const {
        data: dataUpdated,
        isLoading: isLoadingUpdated,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated,
    } = mutationUpdate;

    const {
        data: dataDeleted,
        isLoading: isLoadingDeleted,
        isSuccess: isSuccessDelected,
        isError: isErrorDeleted,
    } = mutationDeleted;
    const {
        data: dataDeletedMany,
        isLoading: isLoadingDeletedMany,
        isSuccess: isSuccessDelectedMany,
        isError: isErrorDeletedMany,
    } = mutationDeletedMany;

    const { isLoading: isLoadingUsers, data: users } = useQuery({
        queryKey: ['user'],
        queryFn: getAllUsers,
    });

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true);
            //  handleDetailUser(rowSelected);
        }
    }, [rowSelected, isOpenDrawer]);

    const handleDetailUser = () => {
        setIsOpenDrawer(true);
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateUser({
            name: '',
            email: '',
            isAdmin: '',
            phone: '',
            address: '',
            city: '',
            dateOfBirth: '',
            sex: '',
            country: '',
            nickname: '',
        });
        form.resetFields();
    };

    const dataTable =
        users?.data?.length &&
        users?.data?.map((user) => {
            return { ...user, key: user._id };
        });

    const handleOk = () => {
        onFinish();
    };
    const onFinish = () => {
        mutation.mutate(stateUser, {
            onSettled: () => {
                queryUser.refetch();
            },
        });
    };
    const handleOnChange = (e) => {
        setStateUser({
            ...stateUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnChangeDetail = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend'],
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.email.localeCompare(b.email),
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            render: (text) => <a>{text ? 'Có' : 'Không'}</a>,
        },

        {
            title: 'Phone',
            dataIndex: 'phone',
            render: (text) => <a>{text}</a>,
        },

        {
            title: 'Address',
            dataIndex: 'address',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.address.localeCompare(b.address),
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Birth',
            dataIndex: 'dateOfBirth',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Sex',
            dataIndex: 'sex',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Country',
            dataIndex: 'country',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateUserDetails({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
            color: '',
            discount: '',
        });
        form.resetFields();
    };

    useEffect(() => {
        if (isSuccess && data?.status == 'OK') {
            message.success();
            handleCancel();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        if (isSuccessDelected && dataDeleted?.status === 'OK') {
            message.success();
            handleCancelDelete();
        } else if (isErrorDeleted) {
            message.error();
        }
    }, [isSuccessDelected]);

    useEffect(() => {
        if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
            message.success();
            handleCancelDelete();
        } else if (isErrorDeletedMany) {
            message.error();
        }
    }, [isSuccessDelectedMany]);

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success();
            handleCloseDrawer();
        } else if (isErrorUpdated) {
            message.error();
        }
    }, [isSuccessUpdated]);

    const handleOnchangeAvatarDetail = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUserDetails({
            ...stateUserDetails,
            avatar: file.preview,
        });
    };

    const onUpdateUser = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateUserDetails },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            },
        );
    };

    return (
        <div className={cx('container_user')}>
            <div className={cx('wrapper_user')}>
                <div style={{ textAlign: 'center', marginBottom: '2%' }}>
                    <span className={cx('title')}>Quản lý người dùng</span>
                </div>
                <div>
                    <Button className={cx('button')}>
                        <PlusCircleFilled style={{ fontSize: '20px' }} />
                    </Button>
                </div>
                <div className={cx('wrapper-table')}>
                    <TableComponent
                        columns={columns}
                        data={dataTable}
                        users={users?.data}
                        isLoading={isLoadingUsers}
                        handleDeleteMany={handleDeleteManyUser}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    setRowSelected(record._id);
                                },
                            };
                        }}
                    />
                </div>
                {/* <Loading isLoading={isLoading}>
                    <ModalComponent
                        forceRender
                        footer={null}
                        className={cx('custom-modal')}
                        title="Tạo sản phẩm"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        okText="..."
                        okType=""
                    >
                        <Form
                            name="basic"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            form={form}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Name"
                                name="Name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input value={stateUser.name} onChange={handleOnChange} name="name" />
                            </Form.Item>

                            <Form.Item
                                label="Type"
                                name="Type"
                                rules={[{ required: true, message: 'Please input your type!' }]}
                            >
                                <Input value={stateUser.type} onChange={handleOnChange} name="type" />
                            </Form.Item>

                            <Form.Item
                                label="Price"
                                name="Price"
                                rules={[{ required: true, message: 'Please input your Price!' }]}
                            >
                                <Input value={stateUser.price} onChange={handleOnChange} name="price" />
                            </Form.Item>

                            <Form.Item
                                label="CountInStock"
                                name="CountInStock"
                                rules={[{ required: true, message: 'Please input your countInStock!' }]}
                            >
                                <Input value={stateUser.countInStock} onChange={handleOnChange} name="countInStock" />
                            </Form.Item>

                            <Form.Item
                                label="Rating"
                                name="Rating"
                                rules={[{ required: true, message: 'Please input your Rating!' }]}
                            >
                                <Input value={stateUser.rating} onChange={handleOnChange} name="rating" />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="Description"
                                rules={[{ required: true, message: 'Please input your Description!' }]}
                            >
                                <Input value={stateUser.description} onChange={handleOnChange} name="description" />
                            </Form.Item>
                            <Form.Item
                                label="Color"
                                name="Color"
                                rules={[{ required: true, message: 'Please input your Color!' }]}
                            >
                                <Input value={stateUser.color} onChange={handleOnChange} name="color" />
                            </Form.Item>
                            <Form.Item
                                label="Discount"
                                name="Discount"
                                rules={[{ required: true, message: 'Please input your Discount!' }]}
                            >
                                <Input value={stateUser.discount} onChange={handleOnChange} name="discount" />
                            </Form.Item>

                            <Form.Item
                                label="Image"
                                name="Image"
                                rules={[{ required: true, message: 'Please input your Image!' }]}
                            >
                                <div>
                                    <Upload
                                        maxCount={1}
                                        showUploadList={false}
                                        className={cx('pen')}
                                        onChange={handleOnchangeAvatar}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                <Button>Select File</Button>
                                            </div>
                                            <div>
                                                {stateUser?.image && (
                                                    <img
                                                        src={stateUser?.image}
                                                        style={{
                                                            height: '40px',
                                                            width: '40px',
                                                            borderRadius: '50%',
                                                            objectFit: 'cover',
                                                            marginLeft: '10px',
                                                        }}
                                                        alt="avatar"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </Upload>
                                </div>
                            </Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form>
                    </ModalComponent>
                </Loading> */}
                <DrawerComponent
                    width="50%"
                    title="Chi tiết người dùng"
                    isOpen={isOpenDrawer}
                    onClose={() => setIsOpenDrawer(false)}
                >
                    <Loading isLoading={isLoading || isLoadingUpdated}>
                        <Form
                            name="basic"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onUpdateUser}
                            form={form}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input value={stateUserDetails.name} onChange={handleOnChangeDetail} name="name" />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input value={stateUserDetails.email} onChange={handleOnChangeDetail} name="email" />
                            </Form.Item>

                            <Form.Item
                                label="Admin"
                                name="isAdmin"
                                rules={[{ required: true, message: 'Please input your Admin!' }]}
                            >
                                <Input
                                    value={stateUserDetails.isAdmin}
                                    onChange={handleOnChangeDetail}
                                    name="isAdmin"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{ required: true, message: 'Please input your phone!' }]}
                            >
                                <Input value={stateUserDetails.phone} onChange={handleOnChangeDetail} name="phone" />
                            </Form.Item>

                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[{ required: true, message: 'Please input your Address!' }]}
                            >
                                <Input
                                    value={stateUserDetails.address}
                                    onChange={handleOnChangeDetail}
                                    name="address"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Sex"
                                name="sex"
                                rules={[{ required: true, message: 'Please input your Sex!' }]}
                            >
                                <Input value={stateUserDetails.sex} onChange={handleOnChangeDetail} name="sex" />
                            </Form.Item>
                            <Form.Item
                                label="Country"
                                name="country"
                                rules={[{ required: true, message: 'Please input your Country!' }]}
                            >
                                <Input
                                    value={stateUserDetails.country}
                                    onChange={handleOnChangeDetail}
                                    name="country"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Avatar"
                                name="avatar"
                                rules={[{ required: true, message: 'Please input your Avatar!' }]}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                    <div>
                                        <Button>Select File</Button>
                                    </div>
                                    <div>
                                        {stateUserDetails?.avatar && (
                                            <img
                                                src={stateUserDetails?.avatar}
                                                style={{
                                                    height: '60px',
                                                    width: '60px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    marginLeft: '10px',
                                                }}
                                                alt="avatar"
                                            />
                                        )}
                                    </div>
                                </div>
                            </Form.Item>

                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form>
                    </Loading>
                </DrawerComponent>
                <ModalComponent
                    title="Xóa sản phẩm"
                    open={isModalOpenDelete}
                    onCancel={handleCancelDelete}
                    onOk={handleDeleteUser}
                >
                    <Loading isLoading={isLoadingDeleted}>
                        <div>Bạn có chắc xóa sản phẩm này không?</div>
                    </Loading>
                </ModalComponent>
            </div>
        </div>
    );
};

export default AdminUserComponent;
