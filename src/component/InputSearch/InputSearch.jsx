import React from 'react';
import { Input } from 'antd';

const InputSearch = ({ size, width, height, ...props }) => {
    return <Input style={{ width: '80%', height: '34px' }} {...props} placeholder="Giao hàng nhanh chóng tiết kiệm" />;
};

export default InputSearch;
