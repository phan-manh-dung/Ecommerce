import React, { useEffect, useState } from 'react';
import styles from './AdminProduct.module.scss';
import classNames from 'classnames/bind';
import { Button, Form, Input, Modal, Upload } from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleFilled } from '@ant-design/icons';
import TableComponent from '~/component/TableComponent/TableComponent';
import { getBase64 } from '~/utils';
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
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
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

    const [stateProduct, setStateProduct] = useState(initial());
    const [stateProductDetails, setStateProductDetails] = useState(initial());
    const [form] = Form.useForm();

    const mutation = useMutationHook((data) => {
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
        const res = ProductService.updateProduct(id, token, { ...rests });
        return res;
    });

    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };

    const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts });

    const fetchGetDetailProduct = async (rowSelected) => {
        const res = await ProductService.getDetailProduct(rowSelected);
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

    const mutationDeleted = useMutationHook((data) => {
        const { id, token } = data;
        const res = ProductService.deleteProduct(id, token);
        return res;
    });

    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateProductDetails);
        } else {
            form.setFieldsValue(initial());
        }
    }, [form, stateProductDetails, isModalOpen]);

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

    const { data, isLoading, isSuccess, isError } = mutation;

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

    const { isLoading: isLoadingProducts, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
    });

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true);
            //  handleDetailProduct(rowSelected);
        }
    }, [rowSelected, isOpenDrawer]);

    const handleDetailProduct = () => {
        setIsOpenDrawer(true);
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

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

    const dataTable =
        products?.data?.length &&
        products?.data?.map((product) => {
            return { ...product, key: product._id };
        });

    const handleOk = () => {
        onFinish();
    };
    const onFinish = () => {
        mutation.mutate(stateProduct, {
            onSettled: () => {
                queryProduct.refetch();
            },
        });
    };
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnChangeDetail = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value,
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Color',
            dataIndex: 'color',
            render: (text) => <a>{text}</a>,
        },

        {
            title: 'Type',
            dataIndex: 'type',
            render: (text) => <a>{text}</a>,
        },

        {
            title: 'Sold',
            dataIndex: 'sold',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'CounInStock',
            dataIndex: 'countInStock',
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
        setStateProduct({
            ...stateProduct,
            image: file.preview,
        });
    };
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

    const onUpdateProduct = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateProductDetails },
            {
                onSettled: () => {
                    queryProduct.refetch();
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
                        isLoading={isLoadingProducts}
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
                                <Input value={stateProduct.name} onChange={handleOnChange} name="name" />
                            </Form.Item>

                            <Form.Item
                                label="Type"
                                name="Type"
                                rules={[{ required: true, message: 'Please input your type!' }]}
                            >
                                <Input value={stateProduct.type} onChange={handleOnChange} name="type" />
                            </Form.Item>

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
                            onFinish={onUpdateProduct}
                            form={form}
                            autoComplete="off"
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
