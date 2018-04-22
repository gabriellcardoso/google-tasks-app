import * as React from 'react';

import {
    ListItem,
    Checkbox,
    TextField
} from 'material-ui';

import { Task } from '../models/Task';
import { DeleteButton } from './DeleteButton';

const style: React.CSSProperties = {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 60
};

interface TaskItemProps {
    task: Task;
    onPressEnter: () => void;
    onUpdate: (taskId: string, title: string) => void;
    onToggle: (taskId: string) => void;
    onDelete: (taskId: string) => void;
}

interface TaskItemState { }

class TaskItem extends React.Component<TaskItemProps, TaskItemState> {

    componentWillMount(): void {
        this.setState({ text: this.props.task.title });
    }

    render(): React.ReactElement<any> | false {
        const {
            task,
            onToggle,
            onDelete
        } = this.props;

        const checkbox = this.getTaskCheckbox();
        const taskItemMenu = this.getTaskItemMenu();
        const fieldClassName = task.status === 'completed' ? 'completed' : null;

        return (
            <ListItem
                leftCheckbox={checkbox}
                rightIconButton={taskItemMenu}
                style={style}
            >
                <TextField
                    className={fieldClassName}
                    value={task.title}
                    fullWidth={true}
                    underlineShow={false}
                    autoFocus={true}
                    onChange={event => this.updateText(event)}
                    onKeyPress={event => this.handleKeyPress(event)}
                />
            </ListItem>
        );
    }

    private getTaskCheckbox(): React.ReactElement<any> {
        const { task, onToggle } = this.props;

        return (
            <Checkbox
                checked={task.status === 'completed'}
                onClick={() => onToggle(task.id)}
            />
        );
    }

    private getTaskItemMenu(): React.ReactElement<any> {
        const { task, onDelete } = this.props;

        return (
            <div>
                <DeleteButton onClick={() => onDelete(task.id)} />
            </div>
        );
    }

    private handleKeyPress(event: React.KeyboardEvent<{}>) {
        const { onPressEnter } = this.props;

        if (event.key === 'Enter') {
            onPressEnter();
        }
    }

    private updateText(event: React.ChangeEvent<any>): void {
        const { task, onUpdate } = this.props;
        const title = event.target.value;
        onUpdate(task.id, title);
    }

}


export { TaskItem }