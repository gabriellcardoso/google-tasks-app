import * as React from 'react';

import { IconButton } from 'material-ui';

import { DeleteIcon } from './DeleteIcon';

interface DeleteButtonProps {
    onClick: (event: React.MouseEvent<any>) => void;
}

const DeleteButton = (props: DeleteButtonProps) => (
    <IconButton
        onClick={event => props.onClick(event)}
    >
        <DeleteIcon />
    </IconButton>
);

export { DeleteButton }