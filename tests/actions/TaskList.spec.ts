jest.mock('../../src/utils/ApiClient');

import { ThunkAction } from 'redux-thunk';

import { ActionType } from '../../src/actions/ActionType';
import { TaskListActions } from '../../src/actions/TaskList';
import { TaskList } from '../../src/models/TaskList';
import { AppState } from '../../src/states/App';
import ApiClient from '../../src/utils/ApiClient';


describe('Given a TaskListActions', () => {

    const taskList: TaskList[] = [
        { id: '1', title: 'TODO List' }
    ];

    const dispatch = jest.fn();
    let thunkAction: ThunkAction<void, AppState, any>;
    
    describe('when getting task lists', () => {
        beforeEach(() => {
            jest.spyOn(ApiClient, 'getTaskLists');
            dispatch.mockClear();
            thunkAction = TaskListActions.getTaskLists();
            thunkAction(dispatch, null, null);
        });
        it('should dispatch a RequestTaskLists action', () => {
            expect(dispatch).toHaveBeenCalledWith({ type: ActionType.RequestTaskLists });
        });
        it('should request to get task lists', () => {
            expect(ApiClient.getTaskLists).toHaveBeenCalled();
        });
        it('should dispatch a ReceiveTaskList action with request result', () => {
            expect(dispatch).toHaveBeenCalledWith({
                type: ActionType.ReceiveTaskLists,
                taskLists: taskList
            });
        });
    });

});