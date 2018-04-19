import * as React from 'react';

import {
    ListItem,
    Checkbox,
    TextField
} from 'material-ui';

import { DeleteButton } from './DeleteButton';

const style: React.CSSProperties = {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 60
};

interface ListItemProps {
    index: React.Key;
}

const TaskItem = (props: ListItemProps) => (
    <ListItem
        leftCheckbox={<Checkbox />}
        rightIconButton={
            <div>
                <DeleteButton />
            </div>
        }
        style={style}
    >
        <TextField
            hintText={`Task #${props.index}`}
            underlineShow={false}
            fullWidth={true}
        />
    </ListItem>
);

export { TaskItem }