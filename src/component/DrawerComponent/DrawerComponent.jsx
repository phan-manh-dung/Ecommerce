import { Drawer } from 'antd';
import React from 'react';

const DrawerComponent = ({
  title = 'Drawer',
  placement = 'right',
  isOpen = false,
  onClose,
  maskClosable,
  children,
  ...rests
}) => {
  return (
    <>
      <Drawer
        title={title}
        placement={placement}
        open={isOpen}
        onClose={onClose}
        maskClosable={maskClosable}
        {...rests}
      >
        {children}
      </Drawer>
    </>
  );
};

export default DrawerComponent;
