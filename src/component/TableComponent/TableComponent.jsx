import { Table } from 'antd';
import React, { useState } from 'react';
import Loading from '~/component/LoadingComponent/Loading';
// import { Excel } from 'antd-table-saveas-excel';
import { useMemo } from 'react';
import styles from './Table.module.scss';
import classNames from 'classnames/bind';
import { Excel } from 'antd-table-saveas-excel';
import ButtonComponent from '../ButtonComponent/Buttoncomponent';
const cx = classNames.bind(styles);

const TableComponent = (props) => {
    const {
        selectionType = 'checkbox',
        data = [],
        columns = [],
        users = [],
        handleDeleteMany,
        isLoading = false,
        // data: dataSource = [],
    } = props;
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
    // const newColumnExport = useMemo(() => {
    //     const arr = columns?.filter((col) => col.dataIndex !== 'action');
    //     return arr;
    // }, [columns]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'User',
            name: record.name,
        }),
    };

    const handleDeleteAll = () => {
        console.log('sdd');
        handleDeleteMany(rowSelectedKeys);
    };
    // const exportExcel = () => {
    //     const excel = new Excel();
    //     excel
    //         .addSheet('test')
    //         .addColumns(newColumnExport)
    //         .addDataSource(dataSource, {
    //             str2Percent: true,
    //         })
    //         .saveAs('Excel.xlsx');
    // };

    return (
        <>
            <Loading isLoading={isLoading}>
                {!!rowSelectedKeys.length && (
                    <div className={cx('wrapper_delete')} onClick={handleDeleteAll}>
                        <div>Xóa tất cả</div>
                    </div>
                )}
                {/* <div style={{ marginBottom: '10px' }}>
                    <ButtonComponent
                        textButton="Xuất excel"
                        backgroundColor="green"
                        width="20%"
                        onClick={exportExcel}
                    />
                </div> */}
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    {...props}
                />
            </Loading>
        </>
    );
};

export default TableComponent;
