import { Button } from 'antd';
import React from 'react';

const ButtonComponent = ({
    size,
    styleButton,
    color,
    backgroundColor,
    styleTextButton,
    textButton,
    disabled,
    height,
    border,
    width,
    ...rests
}) => {
    return (
        <Button
            style={{
                width,
                height,
                border,
                color,
                ...styleButton,
                backgroundColor,
            }}
            size={size}
            disabled={disabled}
            {...rests}
        >
            <span style={{ ...styleTextButton }}>{textButton}</span>
        </Button>
    );
};

export default ButtonComponent;
