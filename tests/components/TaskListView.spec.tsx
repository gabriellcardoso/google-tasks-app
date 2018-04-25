import { shallow, ShallowWrapper } from 'enzyme';
import { Divider, Paper } from 'material-ui';
import * as React from 'react';

import { CircularProgress } from '../../src/components/CircularProgress';
import { TaskItem } from '../../src/components/TaskItem';
import { TaskListView, TaskListViewProps } from '../../src/components/TaskListView';
import { Task } from '../../src/models/Task';
import { TaskList } from '../../src/models/TaskList';

describe('Given a TaskListView component', () => {

    const list: TaskList = {
        id: '1',
        title: 'TaskList 1'
    };

    const tasks: Task[] = [
        { id: '2', title: 'Task 2' },
        { id: '1', title: 'Task 1' },
        { id: '3', title: 'Task 3' }
    ];

    const onAddTask = jest.fn();
    const onUpdateTask = jest.fn();
    const onToggleTask = jest.fn();
    const onDeleteTask = jest.fn();

    let props: TaskListViewProps;
    let component: ShallowWrapper<TaskListViewProps>;

    beforeEach(() => {
        onAddTask.mockClear();
        onUpdateTask.mockClear();
        onToggleTask.mockClear();
        onDeleteTask.mockClear();

        props = {
            loading: false,
            list,
            tasks,
            onAddTask,
            onUpdateTask,
            onToggleTask,
            onDeleteTask
        };

        component = shallow<TaskListViewProps>(<TaskListView  {...props} />);
    });

    describe('when rendering and it is loading', () => {
        beforeEach(() => {
            props.loading = true;
            component = shallow<TaskListViewProps>(<TaskListView  {...props} />);
        });
        it('should have a section.task-list-view', () => {
            expect(component.find('section').hasClass('task-list-view')).toEqual(true);
        });
        it('should have a circular progress', () => {
            expect(component.find(CircularProgress).exists()).toEqual(true);
        });
    });

    describe('when rendering and it doesnt have task list', () => {
        beforeEach(() => {
            props.list = null;
            component = shallow<TaskListViewProps>(<TaskListView  {...props} />);
        });
        it('should not render', () => {
            expect(component.isEmptyRender()).toEqual(true);
        });
    });

    describe('when rendering and it doesnt have tasks', () => {
        beforeEach(() => {
            props.tasks = null;
            component = shallow<TaskListViewProps>(<TaskListView  {...props} />);
        });
        it('should not render', () => {
            expect(component.isEmptyRender()).toEqual(true);
        });
    });

    describe('when rendering', () => {
        it('should have a section.task-list-view', () => {
            expect(component.find('section').hasClass('task-list-view')).toEqual(true);
        });
        it('should have Paper with class equal to container', () => {
            expect(component.find(Paper).hasClass('container'));
        });
        it('should have a Divider', () => {
            expect(component.find(Divider).exists()).toEqual(true);
        });
        it('should have a task item for each task', () => {
            expect(component.find(TaskItem)).toHaveLength(3);
        });
        it('should have a task set in each task item', () => {
            tasks.forEach(
                (task, index) => expect(component.find(TaskItem).at(index).props().task).toEqual(task)
            );
        });
    });

    describe('when pressing enter in task item', () => {
        it('should call on add task callback with task id', () => {
            component.find(TaskItem).first().props().onPressEnter();
            expect(onAddTask).toHaveBeenCalledWith('2');
        });
    });

    describe('when updating a task item', () => {
        it('should call on update task callback', () => {
            component.find(TaskItem).first().props().onUpdate('3', 'Task 3');
            expect(onUpdateTask).toHaveBeenCalled();
        });
    });

    describe('when toggling a task item', () => {
        it('should call on toggle task callback', () => {
            component.find(TaskItem).first().props().onToggle('4', 'completed');
            expect(onToggleTask).toHaveBeenCalled();
        });
    });

    describe('when deleting a task item', () => {
        it('should call on delete task callback', () => {
            component.find(TaskItem).first().props().onDelete('5');
            expect(onDeleteTask).toHaveBeenCalled();
        });
    });

});