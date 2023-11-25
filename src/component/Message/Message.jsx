import { message } from 'antd';

const success = (mes = 'Success') => {
    message.success(mes);
};

const error = (mes = 'Error') => {
    message.error(mes);
};

const successDelete = (mes = 'Delete Success') => {
    message.success(mes);
};

const errorDelete = (mes = 'Error Success') => {
    message.error(mes);
};

const warning = (mes = 'Warning') => {
    message.warning(mes);
};

export { success, error, warning, successDelete, errorDelete };
