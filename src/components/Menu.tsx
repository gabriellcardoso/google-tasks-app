import * as React from 'react';

import {
    Drawer,
    FontIcon,
    Subheader,
    Divider
} from 'material-ui';

import { MenuItem } from './MenuItem';
import { AddIcon } from './AddIcon';

interface DrawerProps {
    open: boolean;
}

const Menu = (props: DrawerProps) => (
    <Drawer open={props.open}>
        <Subheader>Lists</Subheader>
        <Divider />
        <MenuItem>TODO List</MenuItem>
        <MenuItem>Other List</MenuItem>
        <Divider />
        <MenuItem leftIcon={<AddIcon />}>
            New List
        </MenuItem>
        <Divider />
    </Drawer>
);

export { Menu }