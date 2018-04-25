import { Checkbox, ListItem, TextField } from 'material-ui';
import * as React from 'react';

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
    onToggle: (taskId: string, status: string) => void;
    onDelete: (taskId: string) => void;
}

interface TaskItemState {
    title: string;
}

class TaskItem extends React.Component<TaskItemProps, TaskItemState> {

    componentWillMount(): void {
        this.setState({ title: this.props.task.title });
    }

    render(): React.ReactElement<any> | false {
        const { task } = this.props;
        const { title } = this.state;

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
                    value={title}
                    fullWidth={true}
                    underlineShow={false}
                    autoFocus={true}
                    onChange={(event, value) => this.updateText(value)}
                    onBlur={event => this.updateTask()}
                    onKeyPress={event => this.handleKeyPress(event.key)}
                />
            </ListItem>
        );
    }

    private getTaskCheckbox(): React.ReactElement<any> {
        const { task } = this.props;

        return (
            <Checkbox
                checked={task.status === 'completed'}
                onClick={() => this.toggleStatus(task)}
            />
        );
    }

    private toggleStatus(task: Task): void {
        const { onToggle } = this.props;

        const status = task.status !== 'completed' ?
            'completed' :
            'needsAction';

        onToggle(task.id, status);
    }

    private updateText(title: string): void {
        this.setState({ title });
    }

    private handleKeyPress(key: string) {
        const { onPressEnter } = this.props;

        if (key === 'Enter') {
            onPressEnter();
        }
    }

    private updateTask(): void {
        const { task, onUpdate } = this.props;
        const { title } = this.state;
        onUpdate(task.id, title);
    }

    private getTaskItemMenu(): React.ReactElement<any> {
        const { task, onDelete } = this.props;

        return (
            <div>
                <DeleteButton onClick={() => onDelete(task.id)} />
            </div>
        );
    }

}


export { TaskItem, TaskItemProps, TaskItemState }