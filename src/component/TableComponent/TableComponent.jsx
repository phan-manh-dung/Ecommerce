import { Table } from 'antd';
import React, { useState } from 'react';
import Loading from '~/component/LoadingComponent/Loading';
// import { Excel } from 'antd-table-saveas-excel';
import { useMemo } from 'react';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data = [], columns = [], products = [], isLoading = false } = props;
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {},
        getCheckboxProps: (record) => ({
            disabled: record.name === 'User',
            name: record.name,
        }),
    };

    // const handleDeleteAll = () => {
    //     handleDelteMany(rowSelectedKeys);
    // };
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
        <Loading isLoading={isLoading}>
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
    );
};

export default TableComponent;
