import { Button, Drawer } from 'antd';
import React from 'react';

const DrawerComponent = ({ title = 'Drawer', placement = 'right', isOpen = false, children, ...rests }) => {
    return (
        <>
            {/* <Button type="primary" onClick={showDrawer}>
        Open
      </Button> */}
            <Drawer title={title} placement={placement} open={isOpen} {...rests}>
                {children}
            </Drawer>
        </>
    );
};

export default DrawerComponent;
