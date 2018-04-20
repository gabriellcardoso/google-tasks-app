import * as React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import { AddIcon } from './AddIcon';

const ActionButton = () => (
    <FloatingActionButton
        className="action-button"
    >
        <AddIcon />
    </FloatingActionButton>
);

export { ActionButton }