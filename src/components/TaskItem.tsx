import * as React from 'react';

import {
    ListItem,
    Checkbox,
    TextField
} from 'material-ui';

import { DeleteButton } from './DeleteButton';
import { Task } from 'models/Task';

const style: React.CSSProperties = {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 60
};

interface TaskItemProps {
    index: React.Key;
    task: Task;
}

interface TaskItemState { }

class TaskItem extends React.Component<TaskItemProps, TaskItemState> {

    render(): React.ReactElement<any> | false {
        const { task, index } = this.props;
        return (
            <ListItem
                leftCheckbox={<Checkbox checked={task.completed} />}
                rightIconButton={<div><DeleteButton /></div>}
                style={style}
            >
                <TextField
                    value={task.text}
                    hintText={`Task #${index}`}
                    underlineShow={false}
                    fullWidth={false}
                />
            </ListItem>
        );
    }
}


export { TaskItem }