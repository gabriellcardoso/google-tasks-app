import * as React from 'react';

import MuiMenuItem from 'material-ui/MenuItem';

interface MenuItemProps {
    children: React.ReactNode;
    onClick: () => void;
}

const MenuItem = (props: MenuItemProps) => (
    <MuiMenuItem
        onClick={props.onClick}
    >
        {props.children}
    </MuiMenuItem>
);

export { MenuItem }