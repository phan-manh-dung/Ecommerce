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

const cx = classNames.bind(styles);

const AdminProductComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const renderAction = () => {
        return (
            <div>
                {' '}
                <DeleteOutlined style={{ color: 'red', fontSize: '25px', padding: '0 1%', cursor: 'pointer' }} />
                <EditOutlined style={{ color: 'green', fontSize: '25px', padding: '0 1%', cursor: 'pointer' }} />
            </div>
        );
    };
    const initial = () => ({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        newType: '',
        discount: '',
        color: '',
    });
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
            discount,
            color,
        });
        return res;
    });
    const [stateProduct, setStateProduct] = useState(initial());
    const [stateProductDetails, setStateProductDetails] = useState(initial());
    const { data, isLoading, isSuccess, isError } = mutation;
    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct();
        console.log('resff', res);
        return res;
    };
    const { isLoading: isLoadingProducts, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
    });

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
        mutation.mutate(stateProduct);
    };
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
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

    useEffect(() => {
        if (isSuccess && data?.status == 'OK') {
            message.success();
            handleCancel();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);

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
                    />
                </div>
                <Loading isLoading={isLoading}>
                    <Modal
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
                    </Modal>
                </Loading>
            </div>
        </div>
    );
};

export default AdminProductComponent;
