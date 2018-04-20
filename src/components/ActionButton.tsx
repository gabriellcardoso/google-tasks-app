import * as React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import { AddIcon } from './AddIcon';

interface ActionButtonProps {
    onClick: () => void;
}

const ActionButton = (props: ActionButtonProps) => (
    <FloatingActionButton
        className="action-button"
        onClick={props.onClick}
    >
        <AddIcon />
    </FloatingActionButton>
);

export { ActionButton }