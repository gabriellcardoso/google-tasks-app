import * as React from 'react';

import MuiMenuItem from 'material-ui/MenuItem';

interface MenuItemProps {
    leftIcon?: React.ReactElement<any>;
    children: React.ReactNode;
}

const MenuItem = (props: MenuItemProps) => (
    <MuiMenuItem
        leftIcon={props.leftIcon}
    >
        {props.children}
    </MuiMenuItem>
);

export { MenuItem }