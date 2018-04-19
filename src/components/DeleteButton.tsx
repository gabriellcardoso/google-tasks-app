import * as React from 'react';

import { IconButton } from 'material-ui';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const DeleteButton = () => (
    <IconButton>
        <ActionDelete />
    </IconButton>
);

export { DeleteButton }