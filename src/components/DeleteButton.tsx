import { IconButton } from 'material-ui';
import * as React from 'react';

import { DeleteIcon } from './DeleteIcon';

interface DeleteButtonProps {
    onClick: (event: React.MouseEvent<any>) => void;
}

const DeleteButton = (props: DeleteButtonProps) => (
    <IconButton
        onClick={props.onClick}
    >
        <DeleteIcon />
    </IconButton>
);

export { DeleteButton, DeleteButtonProps }