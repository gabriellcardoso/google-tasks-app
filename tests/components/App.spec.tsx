import { mount, ReactWrapper } from 'enzyme';
import { getMuiTheme, MuiTheme } from 'material-ui/styles';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { createMockStore, mockStore } from 'redux-test-utils';

import { ActionButton } from '../../src/components/ActionButton';
import { App, AppProps, AppState } from '../../src/components/App';
import { AppBar } from '../../src/components/AppBar';
import { LinearProgress } from '../../src/components/LinearProgress';
import { Menu } from '../../src/components/Menu';
import { TaskListViewContainer } from '../../src/containers/TaskListView';
import { TaskList } from '../../src/models/TaskList';
import { AppState as ApplicationState } from '../../src/states/App';

jest.mock('../../src/utils/ApiClient.ts');

describe('Given an App component', () => {

    const muiTheme = getMuiTheme();
    const store = createMockStore(new ApplicationState());

    const taskLists: TaskList[] = [
        { id: '2', title: 'TaskList 2' },
        { id: '1', title: 'TaskList 1' }
    ];

    const onStart = jest.fn();
    const onAddTask = jest.fn();
    const onSelectList = jest.fn();

    let props: AppProps;
    let component: ReactWrapper<AppProps, AppState>;

    beforeEach(() => {
        onStart.mockClear();
        onAddTask.mockClear();
        onSelectList.mockClear();

        props = {
            loading: false,
            taskLists,
            lastTaskId: '5',
            onStart,
            onAddTask,
            onSelectList
        };

        component = mountApp(props, muiTheme, store);
    });

    describe('when mounting and is loading', () => {
        beforeEach(() => {
            props.loading = true;
            component = mountApp(props, muiTheme, store);
        });
        it('should have a section.app', () => {
            expect(component.find('section').hasClass('app')).toEqual(true);
        });
        it('should have a linear progress', () => {
            expect(component.find(LinearProgress).exists()).toEqual(true);
        });
    });

    describe('when mounting', () => {
        it('should set open menu state as false', () => {
            expect(component.state().openMenu).toEqual(false);
        });
        it('should set last task id as null', () => {
            expect(component.state().taskListId).toBeNull();
        });
        it('should call on start callback', () => {
            expect(onStart).toHaveBeenCalled();
        });
    });

    describe('when receiving props', () => {
        beforeEach(() => {
            component.setProps(props);
        });
        it('should update task list id with first task list', () => {
            expect(component.state().taskListId).toEqual('2');
        });
        it('should have a app bar', () => {
            expect(component.find(AppBar).exists()).toEqual(true);
        });
        it('should have a menu', () => {
            expect(component.find(Menu).exists()).toEqual(true);
        });
        it('should have a menu with task lists', () => {
            expect(component.find(Menu).exists()).toEqual(true);
        });
        it('shoud have menu closed', () => {
            expect(component.find(Menu).props().open).toEqual(false);
        });
        it('should have a task list view container', () => {
            expect(component.find(TaskListViewContainer).exists()).toEqual(true);
        });
        it('should have an action button', () => {
            expect(component.find(ActionButton).exists()).toEqual(true);
        });
    });

    describe('when clicking on app bar menu button', () => {
        beforeEach(() => {
            component.setState({ openMenu: false });
            component.find(AppBar).props().onMenuClick();
        })
        it('should toggle open menu state', () => {
            expect(component.state().openMenu).toEqual(true);
        });
    });

    describe('when closing menu', () => {
        beforeEach(() => {
            component.setState({ openMenu: true });
            component.find(Menu).props().onCloseMenu();
        })
        it('should toggle open menu state', () => {
            expect(component.state().openMenu).toEqual(false);
        });
    });

    describe('when selecting a list on menu', () => {
        beforeEach(() => {
            component.setState({ taskListId: '2' });
            component.find(Menu).props().onSelectList('1');
        });
        it('should set task list id state', () => {
            expect(component.state().taskListId).toEqual('1');
        });
    });

    describe('when clicking on action button', () => {
        beforeEach(() => {
            component.setState({ taskListId: '2' });
            component.setProps({ lastTaskId: '5' });
            component.find(ActionButton).props().onClick();
        });
        it('should call on add task callback to selected task list and with last task id', () => {
            expect(onAddTask).toHaveBeenCalledWith('2', '5');
        });
    });

});

function mountApp(props: AppProps, muiTheme: MuiTheme, store: mockStore<any>): ReactWrapper<AppProps, AppState> {
    const mountOptions = {
        context: {
            muiTheme,
            store
        },
        childContextTypes: {
            muiTheme: PropTypes.object.isRequired,
            store: PropTypes.object.isRequired,
        }
    };

    return mount<AppProps, AppState>(<App {...props} />, mountOptions);
}