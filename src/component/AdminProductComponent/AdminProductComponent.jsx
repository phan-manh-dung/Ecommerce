import React, { useEffect, useRef, useState } from 'react';
import styles from './AdminProduct.module.scss';
import classNames from 'classnames/bind';
import { Button, Form, Input, Select, Space, Upload } from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import TableComponent from '~/component/TableComponent/TableComponent';
import { getBase64, renderOptions } from '~/utils';
import { useMutationHook } from '~/hook/useMutationHook';
import * as ProductService from '~/service/ProductService';
import * as message from '~/component/Message/Message';
import Loading from '../LoadingComponent/Loading';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';

const cx = classNames.bind(styles);

const AdminProductComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState(''); // lấy id
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [typeSelect, setTypeSelect] = useState('');
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

    const [stateProduct, setStateProduct] = useState(initial()); // khởi tạo state object với initial

    const [stateProductDetails, setStateProductDetails] = useState(initial());
    const [form] = Form.useForm(); // form dữ liệu

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

    // update product information
    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...rests } = data;
        const res = ProductService.updateProduct(id, { ...rests }, token);
        return res;
    });

    // get all product
    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };

    // get all type product
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        return res;
    };

    // useQuery
    const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProduct });

    const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct });

    // get detail product on service
    const fetchGetDetailProduct = async (rowSelected) => {
        const res = await ProductService.getDetailProduct(rowSelected); // rowselected là id
        if (res?.data) {
            setStateProductDetails({
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

    // delete product id with token
    const mutationDeleted = useMutationHook((data) => {
        const { id, token } = data;
        const res = ProductService.deleteProduct(id, token);
        return res;
    });

    // delete many , data with token on service
    const mutationDeletedMany = useMutationHook((data) => {
        const { token, ...ids } = data;
        const res = ProductService.deleteManyProduct(ids, token);
        return res;
    });

    // delete redux
    const handleDeleteManyProducts = (ids) => {
        mutationDeletedMany.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };

    // open modal detail product
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateProductDetails);
        } else {
            form.setFieldsValue(initial());
        }
    }, [form, stateProductDetails, isModalOpen]);

    // fetch get detail
    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true);
            fetchGetDetailProduct(rowSelected);
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
                    onClick={handleDetailProduct}
                />
            </div>
        );
    };

    const { data, isLoading, isSuccess, isError } = mutation; // tác vụ thay đổi dữ liệu

    // delete product on redux
    const handleDeleteProduct = () => {
        mutationDeleted.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };

    // get loading on fun update
    const {
        data: dataUpdated,
        isLoading: isLoadingUpdated,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated,
    } = mutationUpdate;

    // get loading on fun delete
    const {
        data: dataDeleted,
        isLoading: isLoadingDeleted,
        isSuccess: isSuccessDeleted,
        isError: isErrorDeleted,
    } = mutationDeleted;

    const {
        data: dataDeletedMany,
        isLoading: isLoadingDeletedMany,
        isSuccess: isSuccessDelectedMany,
        isError: isErrorDeletedMany,
    } = mutationDeletedMany;

    // use query
    const { isLoading: isLoadingProducts, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct,
    });

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true);
        }
    }, [rowSelected, isOpenDrawer]);

    const handleDetailProduct = () => {
        setIsOpenDrawer(true);
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    // cancel
    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
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

    // set data table on useQuery
    const dataTable =
        products?.data?.length &&
        products?.data?.map((product) => {
            return { ...product, key: product._id };
        });

    // status finish
    const onFinish = () => {
        const params = {
            name: stateProduct.name,
            price: stateProduct.price,
            description: stateProduct.description,
            rating: stateProduct.rating,
            image: stateProduct.image,
            type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
            countInStock: stateProduct.countInStock,
            discount: stateProduct.discount,
            color: stateProduct.color,
        };
        mutation.mutate(params, {
            onSettled: () => {
                queryProduct.refetch();
            },
        });
    };

    // get onchange on initial
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };

    // get onchange product detail on initial
    const handleOnChangeDetail = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
    };

    // filter theo column
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

    // close draw
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetails({
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

    // effect success and error
    useEffect(() => {
        if (isSuccess && data?.status == 'OK') {
            message.success();
            handleCancel();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);

    // effect success delete
    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success();
            handleCancelDelete();
        } else if (isErrorDeleted) {
            message.error();
        }
    }, [isSuccessDeleted]);

    // effect success delete many
    useEffect(() => {
        if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
            message.success();
            handleCancelDelete();
        } else if (isErrorDeletedMany) {
            message.error();
        }
    }, [isSuccessDelectedMany]);

    // effect success update
    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success();
            handleCloseDrawer();
        } else if (isErrorUpdated) {
            message.error();
        }
    }, [isSuccessUpdated]);

    // handle on change avatar
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview,
        });
    };

    // handle on change avatar detail
    const handleOnchangeAvatarDetail = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview,
        });
    };

    // update product
    const onUpdateProductNew = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateProductDetails },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };

    const handleOnChangeSelect = (value) => {
        setStateProduct({
            ...stateProduct,
            type: value,
        });
    };

    return (
        <div className={cx('container_Product')}>
            <div className={cx('wrapper_Product')}>
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
                        isLoading={isLoadingProducts}
                        handleDeleteMany={handleDeleteManyProducts}
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
                        //  onOk={handleOk}
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
                                <Input value={stateProduct.name} onChange={handleOnChange} name="name" />
                            </Form.Item>

                            <Form.Item
                                label="Type"
                                name="type"
                                rules={[{ required: true, message: 'Please input your type!' }]}
                            >
                                <Select
                                    name="type"
                                    value={stateProduct.type}
                                    onChange={handleOnChangeSelect}
                                    options={renderOptions(typeProduct?.data?.data)}
                                />
                            </Form.Item>
                            {stateProduct.type === 'add_type' && (
                                <Form.Item
                                    label="New type"
                                    name="newType"
                                    rules={[{ required: true, message: 'Please input your type!' }]}
                                >
                                    <Input value={stateProduct.newType} onChange={handleOnChange} name="newType" />
                                </Form.Item>
                            )}
                            <Form.Item
                                label="Price"
                                name="Price"
                                rules={[{ required: true, message: 'Please input your Price!' }]}
                            >
                                <Input value={stateProduct.price} onChange={handleOnChange} name="price" />
                            </Form.Item>

                            <Form.Item
                                label="CountInStock"
                                name="CountInStock"
                                rules={[{ required: true, message: 'Please input your countInStock!' }]}
                            >
                                <Input
                                    value={stateProduct.countInStock}
                                    onChange={handleOnChange}
                                    name="countInStock"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Rating"
                                name="Rating"
                                rules={[{ required: true, message: 'Please input your Rating!' }]}
                            >
                                <Input value={stateProduct.rating} onChange={handleOnChange} name="rating" />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="Description"
                                rules={[{ required: true, message: 'Please input your Description!' }]}
                            >
                                <Input value={stateProduct.description} onChange={handleOnChange} name="description" />
                            </Form.Item>
                            <Form.Item
                                label="Color"
                                name="Color"
                                rules={[{ required: true, message: 'Please input your Color!' }]}
                            >
                                <Input value={stateProduct.color} onChange={handleOnChange} name="color" />
                            </Form.Item>
                            <Form.Item
                                label="Discount"
                                name="Discount"
                                rules={[{ required: true, message: 'Please input your Discount!' }]}
                            >
                                <Input value={stateProduct.discount} onChange={handleOnChange} name="discount" />
                            </Form.Item>

                            {/* image  */}
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
                                                {stateProduct?.image && (
                                                    <img
                                                        src={stateProduct?.image}
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
                            onFinish={onUpdateProductNew}
                            autoComplete="off"
                            form={form}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input value={stateProductDetails.name} onChange={handleOnChangeDetail} name="name" />
                            </Form.Item>

                            <Form.Item
                                label="Type"
                                name="type"
                                rules={[{ required: true, message: 'Please input your type!' }]}
                            >
                                <Input value={stateProductDetails.type} onChange={handleOnChangeDetail} name="type" />
                            </Form.Item>

                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Please input your Price!' }]}
                            >
                                <Input value={stateProductDetails.price} onChange={handleOnChangeDetail} name="price" />
                            </Form.Item>

                            <Form.Item
                                label="CountInStock"
                                name="countInStock"
                                rules={[{ required: true, message: 'Please input your countInStock!' }]}
                            >
                                <Input
                                    value={stateProductDetails.countInStock}
                                    onChange={handleOnChangeDetail}
                                    name="countInStock"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Rating"
                                name="rating"
                                rules={[{ required: true, message: 'Please input your Rating!' }]}
                            >
                                <Input
                                    value={stateProductDetails.rating}
                                    onChange={handleOnChangeDetail}
                                    name="rating"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please input your Description!' }]}
                            >
                                <Input
                                    value={stateProductDetails.description}
                                    onChange={handleOnChangeDetail}
                                    name="description"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Color"
                                name="color"
                                rules={[{ required: true, message: 'Please input your Color!' }]}
                            >
                                <Input value={stateProductDetails.color} onChange={handleOnChangeDetail} name="color" />
                            </Form.Item>
                            <Form.Item
                                label="Discount"
                                name="discount"
                                rules={[{ required: true, message: 'Please input your Discount!' }]}
                            >
                                <Input
                                    value={stateProductDetails.discount}
                                    onChange={handleOnChangeDetail}
                                    name="discount"
                                />
                            </Form.Item>
                            {/* image */}
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
                                                {stateProductDetails?.image && (
                                                    <img
                                                        src={stateProductDetails?.image}
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
                            <Button type="primary" htmlType="submit" onClick={onUpdateProductNew}>
                                Submit
                            </Button>
                        </Form>
                    </Loading>
                </DrawerComponent>
                <ModalComponent
                    title="Xóa sản phẩm"
                    open={isModalOpenDelete}
                    onCancel={handleCancelDelete}
                    onOk={handleDeleteProduct}
                >
                    <Loading isLoading={isLoadingDeleted}>
                        <div>Bạn có chắc xóa sản phẩm này không?</div>
                    </Loading>
                </ModalComponent>
            </div>
        </div>
    );
};

export default AdminProductComponent;
