import { mount, ReactWrapper } from 'enzyme';
import { Checkbox, ListItem, TextField } from 'material-ui';
import { getMuiTheme, MuiTheme } from 'material-ui/styles';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { DeleteButton } from '../../src/components/DeleteButton';
import { TaskItem, TaskItemProps, TaskItemState } from '../../src/components/TaskItem';
import { Task } from '../../src/models/Task';

describe('Given TaskItem component', () => {

    const muiTheme = getMuiTheme();

    const style: React.CSSProperties = {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 60
    };

    const task: Task = {
        id: '1',
        title: 'Task',
        status: 'needsAction',
        completed: null,
        position: '00001'
    };

    const onPressEnter = jest.fn();
    const onUpdate = jest.fn();
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    let props: TaskItemProps;
    let component: ReactWrapper<TaskItemProps, TaskItemState>;

    beforeEach(() => {
        props = {
            task,
            onPressEnter,
            onUpdate,
            onToggle,
            onDelete
        };

        component = mountComponent(props, muiTheme);
    });

    describe('when mounting', () => {
        it('should set title state to task title', () => {
            expect(component.state().title).toEqual('Task');
        });
        it('should have a list item', () => {
            expect(component.find(ListItem).exists()).toEqual(true);
        });
        it('should have a list item with correct style', () => {
            expect(component.find(ListItem).props().style).toEqual(style);
        });
        it('should have a text field', () => {
            expect(component.find(TextField).exists()).toEqual(true);
        });
        it('should have a text field with task item title', () => {
            expect(component.find(TextField).props().value).toEqual('Task');
        });
        it('should have a full width text field', () => {
            expect(component.find(TextField).props().fullWidth).toEqual(true);
        });
        it('should have a text field without underline', () => {
            expect(component.find(TextField).props().underlineShow).toEqual(false);
        });
        it('should have an auto focus text field', () => {
            expect(component.find(TextField).props().autoFocus).toEqual(true);
        });
        it('should have a checkbox', () => {
            expect(component.find(Checkbox).exists()).toEqual(true);
        });
        describe('and task is not complete', () => {
            it('should have a text field without class', () => {
                expect(component.find(TextField).props().className).toBeNull();
            });
            it('should have an unchecked checkbox', () => {
                expect(component.find(Checkbox).props().checked).toEqual(false);
            });
        });
        describe('and task is completed', () => {
            beforeEach(() => {
                props.task = {
                    ...task,
                    status: 'completed',
                    completed: '2018-04-24'
                };
                component = mountComponent(props, muiTheme);
            });
            it('should have text field class as completed', () => {
                expect(component.find(TextField).hasClass('completed')).toEqual(true);
            });
            it('should have checkbox checked', () => {
                expect(component.find(Checkbox).props().checked).toEqual(true);
            });
        });
    });

    describe('when checking', () => {
        describe('and task is not completed', () => {
            beforeEach(() => {
                component.setProps({ task });
                component.find(Checkbox).props().onClick(null);
            });
            it('should call on toggle callback with task id and completed status', () => {
                expect(onToggle).toHaveBeenCalledWith('1', 'completed')
            });
        });
        describe('and task is completed', () => {
            beforeEach(() => {
                component.setProps({
                    task: {
                        ...task,
                        status: 'completed',
                        completed: '2018-04-24'
                    }
                });
                component.find(Checkbox).props().onClick(null);
            });
            it('should call on toggle callback with task id and needs action status', () => {
                expect(onToggle).toHaveBeenCalledWith('1', 'needsAction')
            });
        });
    });

    describe('when pressing a key on text field', () => {
        describe('and is Enter key', () => {
            beforeEach(() => {
                component.find(TextField).find('input').simulate('keyPress', { key: 'Enter' });
            });
            it('should call on press enter callback', () => {
                expect(onPressEnter).toHaveBeenCalled();
            });
        });
        describe('and is not Enter key', () => {
            beforeEach(() => {
                component.find(TextField).find('input').simulate('keyPress', { key: 'a' });
            });
            it('should call on press enter callback', () => {
                expect(onPressEnter).toHaveBeenCalled();
            });
        });
    });

    describe('when changing text field', () => {
        beforeEach(() => {
            component.setState({ title: '' });
            component.find(TextField).props().onChange(null, 'Task 123');
        });
        it('should set title state', () => {
            expect(component.state().title).toEqual('Task 123');
        });
    });

    describe('when blurring', () => {
        beforeEach(() => {
            component.setProps({ task });
            component.setState({ title: 'New task' });
            component.find(TextField).props().onBlur(null);
        });
        it('should call update task callback with task id and title state', () => {
            expect(onUpdate).toHaveBeenCalledWith('1', 'New task');
        });
    });

    describe('when deleting', () => {
        beforeEach(() => {
            props.task = task;
            component = mountComponent(props, muiTheme);
            component.find(DeleteButton).props().onClick(null);
        });
        it('should call on delete callback with task id', () => {
            expect(onDelete).toHaveBeenCalledWith('1');
        });
    });

});

function mountComponent(props: TaskItemProps, muiTheme: MuiTheme): ReactWrapper<TaskItemProps, TaskItemState> {
    const mountOptions = {
        context: {
            muiTheme,
        },
        childContextTypes: {
            muiTheme: PropTypes.object.isRequired
        }
    };

    return mount<TaskItemProps, TaskItemState>(<TaskItem {...props} />, mountOptions);
}
