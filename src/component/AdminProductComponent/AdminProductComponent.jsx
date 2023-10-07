import React, { useEffect, useRef, useState } from 'react';
import styles from './AdminProduct.module.scss';
import classNames from 'classnames/bind';
import { Button, Form, Input, Space, Upload } from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import TableComponent from '~/component/TableComponent/TableComponent';
import { getBase64 } from '~/utils';
import { useMutationHook } from '~/hook/useMutationHook';
import * as UserService from '~/service/UserService';
import * as message from '~/component/Message/Message';
import Loading from '../LoadingComponent/Loading';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';
import * as ProductService from '~/service/ProductService';

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
    const user = useSelector((state) => state?.user);

    const initial = () => ({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        newType: '',
        color: '',
        discount: '',
    });

    const [stateUser, setStateUser] = useState(initial());
    const [stateUserDetails, setStateUserDetails] = useState(initial());
    const [form] = Form.useForm();

    const mutation = useMutationHook((data) => {
        // tương tác với store cập nhật data
        const { name, price, description, rating, image, type, countInStock, discount, color } = data;
        const res = ProductService.createProduct({
            name,
            price,
            description,
            rating,
            image,
            type,
            countInStock,
            color,
            discount,
        });
        return res;
    });

    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...rests } = data;
        const res = UserService.updateUser(id, token, { ...rests });
        return res;
    });

    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };

    const queryUser = useQuery({ queryKey: ['Users'], queryFn: getAllProduct });

    const fetchGetDetailUser = async (rowSelected) => {
        const res = await UserService.getDetailUser(rowSelected); // rowselected là id
        if (res?.data) {
            setStateUserDetails({
                name: res?.data?.name,
                price: res?.data?.price,
                description: res?.data?.description,
                rating: res?.data?.rating,
                image: res?.data?.image,
                type: res?.data?.type,
                countInStock: res?.data?.countInStock,
                discount: res?.data?.discount,
                color: res?.data?.color,
            });
        }
        setIsLoadingUpdate(false);
    };

    const mutationDeleted = useMutationHook((data) => {
        const { id, token } = data;
        const res = UserService.deleteUser(id, token);
        return res;
    });

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

    const { isLoading: isLoadingUsers, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct,
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
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
            discount: '',
            color: '',
        });
        form.resetFields();
    };

    const dataTable =
        products?.data?.length &&
        products?.data?.map((User) => {
            return { ...User, key: User._id };
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
            title: 'Price',
            dataIndex: 'price',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.price - b.price,
            sortDirections: ['ascend', 'descend'],
            filters: [
                {
                    text: '>= 50',
                    value: '>=',
                },
                {
                    text: '<= 50',
                    value: '<=',
                },
            ],

            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.price >= 50;
                }
                return record.price <= 50;
            },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.rating - b.rating,
            sortDirections: ['ascend', 'descend'],
            filters: [
                {
                    text: '>= 3',
                    value: '>=',
                },
                {
                    text: '<= 3',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return Number(record.rating) >= 3;
                }
                return Number(record.rating) <= 3;
            },
        },
        {
            title: 'Color',
            dataIndex: 'color',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend'],
        },

        {
            title: 'Type',
            dataIndex: 'type',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend'],
        },

        {
            title: 'Sold',
            dataIndex: 'sold',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.sold - b.sold,
            sortDirections: ['ascend', 'descend'],
            filters: [
                {
                    text: '>= 3',
                    value: '>=',
                },
                {
                    text: '<= 3',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return Number(record.sold) >= 3;
                }
                return Number(record.sold) <= 3;
            },
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.discount - b.discount,
            sortDirections: ['ascend', 'descend'],
            filters: [
                {
                    text: '>= 50',
                    value: '>=50',
                },
                {
                    text: '<= 50',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return Number(record.discount) >= 50;
                }
                return Number(record.discount) <= 50;
            },
        },
        {
            title: 'Inventory',
            dataIndex: 'countInStock',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.countInStock - b.countInStock,
            sortDirections: ['ascend', 'descend'],
            filters: [
                {
                    text: '>= 100',
                    value: '>=',
                },
                {
                    text: '<= 100',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return Number(record.countInStock) >= 100;
                }
                return Number(record.countInStock) <= 100;
            },
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
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success();
            handleCloseDrawer();
        } else if (isErrorUpdated) {
            message.error();
        }
    }, [isSuccessUpdated]);

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUser({
            ...stateUser,
            image: file.preview,
        });
    };
    const handleOnchangeAvatarDetail = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUserDetails({
            ...stateUserDetails,
            image: file.preview,
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
                    <span className={cx('title')}>Quản lý sản phẩm</span>
                </div>
                <div>
                    <Button className={cx('button')} onClick={() => setIsModalOpen(true)}>
                        <PlusCircleFilled style={{ fontSize: '20px' }} />
                    </Button>
                </div>
                <div className={cx('wrapper-table')}>
                    <TableComponent
                        columns={columns}
                        data={dataTable}
                        products={products?.data}
                        isLoading={isLoadingUsers}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    setRowSelected(record._id);
                                },
                            };
                        }}
                    />
                </div>
                <Loading isLoading={isLoading}>
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
                </Loading>
                <DrawerComponent
                    width="50%"
                    title="Chi tiết sản phẩm"
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
                                label="Type"
                                name="type"
                                rules={[{ required: true, message: 'Please input your type!' }]}
                            >
                                <Input value={stateUserDetails.type} onChange={handleOnChangeDetail} name="type" />
                            </Form.Item>

                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Please input your Price!' }]}
                            >
                                <Input value={stateUserDetails.price} onChange={handleOnChangeDetail} name="price" />
                            </Form.Item>

                            <Form.Item
                                label="CountInStock"
                                name="countInStock"
                                rules={[{ required: true, message: 'Please input your countInStock!' }]}
                            >
                                <Input
                                    value={stateUserDetails.countInStock}
                                    onChange={handleOnChangeDetail}
                                    name="countInStock"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Rating"
                                name="rating"
                                rules={[{ required: true, message: 'Please input your Rating!' }]}
                            >
                                <Input value={stateUserDetails.rating} onChange={handleOnChangeDetail} name="rating" />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please input your Description!' }]}
                            >
                                <Input
                                    value={stateUserDetails.description}
                                    onChange={handleOnChangeDetail}
                                    name="description"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Color"
                                name="color"
                                rules={[{ required: true, message: 'Please input your Color!' }]}
                            >
                                <Input value={stateUserDetails.color} onChange={handleOnChangeDetail} name="color" />
                            </Form.Item>
                            <Form.Item
                                label="Discount"
                                name="discount"
                                rules={[{ required: true, message: 'Please input your Discount!' }]}
                            >
                                <Input
                                    value={stateUserDetails.discount}
                                    onChange={handleOnChangeDetail}
                                    name="discount"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Image"
                                name="image"
                                rules={[{ required: true, message: 'Please input your Image!' }]}
                            >
                                <div>
                                    <Upload
                                        maxCount={1}
                                        showUploadList={false}
                                        className={cx('pen')}
                                        onChange={handleOnchangeAvatarDetail}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                <Button>Select File</Button>
                                            </div>
                                            <div>
                                                {stateUserDetails?.image && (
                                                    <img
                                                        src={stateUserDetails?.image}
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
