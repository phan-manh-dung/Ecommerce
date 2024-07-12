import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './AdminOrder.module.scss';
import classNames from 'classnames/bind';
import { Button, Input, Space, Form } from 'antd';
import { SearchOutlined, DeleteOutlined, DotChartOutlined } from '@ant-design/icons';
import TableComponent from '~/component/TableComponent/TableComponent';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '~/service/OrderService';
import ModalComponent from '../ModalComponent/ModalComponent';
import { useMutationHook } from '~/hook/useMutationHook';
import { useSelector } from 'react-redux';
import Loading from '../LoadingComponent/Loading';
import * as message from '~/component/Message/Message';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import moment from 'moment-timezone';

const cx = classNames.bind(styles);

const AdminOrderComponent = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idOrder, setIdOrder] = useState(''); // lấy id
    const searchInput = useRef(null);
    const user = useSelector((state) => state?.user);

    const initial = () => ({
        id: '',
        fullName: '',
        address: '',
        phone: '',
        itemsPrice: '',
        shippingPrice: '',
        totalPrice: '',
        isPaid: '',
        isDelivered: '',
        createdAt: '',
        updatedAt: '',
        paymentMethod: '',
    });

    const [stateOrder, setStateOrder] = useState(initial()); // khởi tạo dữ liệu với order
    const [stateOrderDetails, setStateOrderDetails] = useState(initial());
    const [form] = Form.useForm(); // form dữ liệu

    // convert date và thời gian VN
    const convertToVietnamTime = (utcTime) => {
        return moment(utcTime).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
    };

    // get detail product on service
    const fetchGetDetailProduct = useCallback(async (idOrder) => {
        const res = await OrderService.getDetailsOrder(idOrder);
        if (res?.data) {
            setStateOrderDetails({
                id: res?.data?._id,
                fullName: res?.data?.fullName,
                country: res?.data?.country,
                city: res?.data?.city,
                district: res?.data?.district,
                phone: res?.data?.phone,
                shippingPrice: res?.data?.shippingPrice,
                totalPrice: res?.data?.totalPrice,
                isPaid: res?.data?.isPaid,
                isDelivered: res?.data?.isDelivered,
                createdAt: convertToVietnamTime(res?.data?.createdAt),
                updatedAt: convertToVietnamTime(res?.data?.updatedAt),
                paymentMethod: res?.data?.paymentMethod,
            });
        }
    }, []);

    // fetch get detail
    useEffect(() => {
        if (idOrder && isOpenDrawer) {
            fetchGetDetailProduct(idOrder);
        }
    }, [idOrder, isOpenDrawer]);

    const handleDetailOrder = () => {
        setIsOpenDrawer(true);
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
    };

    const handleDetailProduct = () => {
        setIsOpenDrawer(true);
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    // get all product
    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder();
        return res;
    };

    // use query
    const {
        isLoading: isLoadingOrders,
        data: order,
        refetch: refetchOrders,
    } = useQuery({
        queryKey: ['order'],
        queryFn: getAllOrder,
    });

    const mutationDeleted = useMutationHook((data) => {
        const { id, token } = data;

        const res = OrderService.deleteOrderDatabaseByAdmin(id, token);
        return res;
    });

    const handleDeleteOrderByAdmin = () => {
        mutationDeleted.mutate(
            { id: idOrder, token: user?.access_token },
            {
                onSettled: () => {
                    refetchOrders();
                },
            },
        );
    };

    const {
        data: dataDeleted,
        isLoading: isLoadingDeleted,
        isSuccess: isSuccessDeleted,
        isError: isErrorDeleted,
    } = mutationDeleted;

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.successDelete();
            handleCancelDelete();
        } else if (isErrorDeleted) {
            message.errorDelete();
        }
    }, [isSuccessDeleted]);
    // get loading on fun delete

    // get onchange product detail on initial
    const handleOnChangeDetail = (e) => {
        setStateOrderDetails({
            ...stateOrderDetails,
            [e.target.name]: e.target.value,
        });
    };

    // delete many , data with token on service
    const mutationDeletedMany = useMutationHook((data) => {
        const { token, ...ids } = data;
        const res = OrderService.deleteManyOrder(ids, token);
        return res;
    });

    // delete redux
    const handleDeleteManyOrder = (ids) => {
        mutationDeletedMany.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    refetchOrders();
                },
            },
        );
    };

    const {
        data: dataDeletedMany,
        isLoading: isLoadingDeletedMany,
        isSuccess: isSuccessDeletedMany,
        isError: isErrorDeletedMany,
    } = mutationDeletedMany;

    // effect success delete many
    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            message.successDelete();
            handleCancelDelete();
        } else if (isErrorDeletedMany) {
            message.errorDelete();
        }
    }, [isSuccessDeletedMany]);

    // open modal detail product
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateOrderDetails);
        } else {
            form.setFieldsValue(initial());
        }
    }, [stateOrderDetails, isModalOpen, form]);

    // dữ liệu vào cột
    const dataTable = useMemo(() => {
        if (!order?.data?.length) return null;
        return order.data.map((orders) => {
            const fullName = orders?.fullName;
            const address = orders?.address;
            const phone = orders?.phone;
            const orderItems = orders?.orderItems || [];
            return {
                fullName,
                address,
                phone,
                orderItems,
                ...orders,
                key: orders._id,
            };
        });
    }, [order]);

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

    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined
                    style={{ color: 'red', fontSize: '25px', padding: '0 1%', cursor: 'pointer' }}
                    onClick={() => setIsModalOpenDelete(true)}
                    // onClick={() => {}}
                />
                <DotChartOutlined
                    style={{ color: 'green', fontSize: '25px', padding: '0 1%', cursor: 'pointer' }}
                    onClick={handleDetailOrder}
                />
            </div>
        );
    };

    const columns = useMemo(() => [
        {
            title: 'Name Customer',
            dataIndex: 'fullName',
            render: (text) => <span>{text}</span>,
            sorter: (a, b) => a.fullName.localeCompare(b.fullName),
            sortDirections: ['ascend', 'descend'],
            ...getColumnSearchProps('fullName'),
        },
        {
            title: 'Product name',
            dataIndex: 'orderItems',
            render: (orderItems) => (
                <>
                    {orderItems.map((item, index) => (
                        <span key={index}>{item.name}</span>
                    ))}
                </>
            ),
        },
        {
            title: 'Address',
            dataIndex: 'country',
            render: (text) => <span>{text}</span>,
            sorter: (a, b) => a.country.localeCompare(b.country),
            sortDirections: ['ascend', 'descend'],
        },

        {
            title: 'Phone',
            dataIndex: 'phone',
            render: (text) => <span>{text}</span>,
            //  sorter: (a, b) => a.rating - b.rating,
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
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            render: (text) => <span>{text}</span>,
            sorter: (a, b) => a.paymentMethod.localeCompare(b.paymentMethod),
            sortDirections: ['ascend', 'descend'],
        },

        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            render: (text) => <span>{text}</span>,
            sorter: (a, b) => a.totalPrice - b.totalPrice,
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
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ]);
    return (
        <div className={cx('container_user')}>
            <div className={cx('wrapper_user')}>
                <div style={{ textAlign: 'center', marginBottom: '2%' }}>
                    <span className={cx('title')}>Quản lý đơn hàng</span>
                </div>

                <div className={cx('wrapper-table')}>
                    <TableComponent
                        columns={columns}
                        data={dataTable}
                        orders={order?.data}
                        isLoading={isLoadingOrders}
                        handleDeleteMany={handleDeleteManyOrder}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    setIdOrder(record._id);
                                },
                            };
                        }}
                    />
                </div>
                <DrawerComponent
                    width="50%"
                    title="Chi tiết sản phẩm"
                    isOpen={isOpenDrawer}
                    onClose={() => setIsOpenDrawer(false)}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        //    onFinish={onUpdateProductNew}
                        autoComplete="off"
                        form={form}
                    >
                        {/* id */}
                        <Form.Item
                            label="Id Order"
                            name="id"
                            rules={[{ required: true, message: 'Please input your id!' }]}
                        >
                            <Input value={setStateOrderDetails._id} onChange={handleOnChangeDetail} name="id" />
                        </Form.Item>
                        {/* name */}
                        <Form.Item
                            label="Name Customer"
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your fullName!' }]}
                        >
                            <Input value={setStateOrderDetails.name} onChange={handleOnChangeDetail} name="fullName" />
                        </Form.Item>
                        {/* address */}
                        <Form.Item
                            label="Country"
                            name="country"
                            rules={[{ required: true, message: 'Please input your country!' }]}
                        >
                            <Input
                                value={setStateOrderDetails.country}
                                onChange={handleOnChangeDetail}
                                name="country"
                            />
                        </Form.Item>
                        {/*city */}
                        <Form.Item
                            label="City"
                            name="city"
                            rules={[{ required: true, message: 'Please input your city!' }]}
                        >
                            <Input value={setStateOrderDetails.city} onChange={handleOnChangeDetail} name="city" />
                        </Form.Item>
                        {/*district */}
                        <Form.Item
                            label="District"
                            name="district"
                            rules={[{ required: true, message: 'Please input your district!' }]}
                        >
                            <Input
                                value={setStateOrderDetails.district}
                                onChange={handleOnChangeDetail}
                                name="district"
                            />
                        </Form.Item>
                        {/* phone */}
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone!' }]}
                        >
                            <Input value={setStateOrderDetails.phone} onChange={handleOnChangeDetail} name="phone" />
                        </Form.Item>

                        {/* ship */}
                        <Form.Item
                            label="Ship"
                            name="shippingPrice"
                            rules={[{ required: true, message: 'Please input your shippingPrice!' }]}
                        >
                            <Input
                                value={setStateOrderDetails.shippingPrice}
                                onChange={handleOnChangeDetail}
                                name="shippingPrice"
                            />
                        </Form.Item>
                        {/* total price */}
                        <Form.Item
                            label="Total Price"
                            name="totalPrice"
                            rules={[{ required: true, message: 'Please input your totalPrice!' }]}
                        >
                            <Input
                                value={setStateOrderDetails.totalPrice}
                                onChange={handleOnChangeDetail}
                                name="totalPrice"
                            />
                        </Form.Item>
                        {/* payment method */}
                        <Form.Item
                            label="Payment Method"
                            name="paymentMethod"
                            rules={[{ required: true, message: 'Please input your paymentMethod!' }]}
                        >
                            <Input
                                value={setStateOrderDetails.paymentMethod}
                                onChange={handleOnChangeDetail}
                                name="paymentMethod"
                            />
                        </Form.Item>
                        {/* paid */}
                        <Form.Item
                            label="Paid"
                            name="isPaid"
                            rules={[{ required: true, message: 'Please input your isPaid!' }]}
                        >
                            <Input value={setStateOrderDetails.isPaid} onChange={handleOnChangeDetail} name="isPaid" />
                        </Form.Item>
                        {/* delivered */}
                        <Form.Item
                            label="Delivered"
                            name="isDelivered"
                            rules={[{ required: true, message: 'Please input your isDelivered!' }]}
                        >
                            <Input
                                value={setStateOrderDetails.isDelivered}
                                onChange={handleOnChangeDetail}
                                name="isDelivered"
                            />
                        </Form.Item>
                        {/* create at */}
                        <Form.Item
                            label="Create At"
                            name="createdAt"
                            rules={[{ required: true, message: 'Please input your createdAt!' }]}
                        >
                            <Input
                                value={setStateOrderDetails.createdAt}
                                onChange={handleOnChangeDetail}
                                name="createdAt"
                            />
                        </Form.Item>
                        {/* update at */}
                        <Form.Item
                            label="Update At"
                            name="updatedAt"
                            rules={[{ required: true, message: 'Please input your updatedAt!' }]}
                        >
                            <Input
                                value={setStateOrderDetails.updatedAt}
                                onChange={handleOnChangeDetail}
                                name="updatedAt"
                            />
                        </Form.Item>

                        <Button type="primary" htmlType="submit" onClick={() => {}}>
                            Submit
                        </Button>
                    </Form>
                </DrawerComponent>
                <ModalComponent
                    title="Xóa sản phẩm"
                    open={isModalOpenDelete}
                    onCancel={handleCancelDelete}
                    onOk={handleDeleteOrderByAdmin}
                >
                    <Loading isLoading={isLoadingDeleted}>
                        <div>Bạn có chắc xóa sản phẩm này không?</div>
                    </Loading>
                </ModalComponent>
            </div>
        </div>
    );
};

export default AdminOrderComponent;
