jest.mock('../../src/utils/ApiClient');

import ApiClient from '../../src/utils/ApiClient';
import { TaskListAction, TaskListActions } from '../../src/actions/TaskList';
import { ActionType } from '../../src/actions/ActionType';

describe('Given a TaskListActions factory', () => {

    describe('when getting task lists', () => {
        beforeEach(() => {
            jest.spyOn(ApiClient, 'getTasksLists');
            this.dispatch = jest.fn();
            this.action = TaskListActions.getTaskLists();
            this.action(this.dispatch);
        });
        test('should dispatch a RequestTaskLists action', () => {
            expect(this.dispatch).toHaveBeenCalledWith({ type: ActionType.RequestTaskLists });
        });
        test('should request to get task lists', () => {
            expect(ApiClient.getTasksLists).toHaveBeenCalled();
        });
        test('should dispatch a ReceiveTaskList action with request result', () => {
            expect(this.dispatch).toHaveBeenCalledWith({
                type: ActionType.ReceiveTaskLists,
                taskLists: [{ id: '1', title: 'TODO List' }]
            });
        });
    });

});