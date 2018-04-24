import MuiMenuItem from 'material-ui/MenuItem';
import * as React from 'react';

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

export { MenuItem, MenuItemProps }