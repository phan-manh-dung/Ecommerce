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
    ...rests
}) => {
    return (
        <Button
            style={{
                color,
                backgroundColor,
                ...styleButton,
            }}
            size={size}
            {...rests}
        >
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    );
};

export default ButtonComponent;
