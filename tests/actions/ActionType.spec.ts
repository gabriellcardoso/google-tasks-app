import { ActionType } from '../../src/actions/ActionType';

describe('Given an ActionType', () => {

    it('should have RequestTaskLists', () => {
        expect(ActionType.RequestTaskLists).toEqual('RequestTaskLists');
    });
    it('should have ReceiveTaskLists', () => {
        expect(ActionType.ReceiveTaskLists).toEqual('ReceiveTaskLists');
    });

    it('should have RequestTasks', () => {
        expect(ActionType.RequestTasks).toEqual('RequestTasks');
    });
    it('should have ReceiveTasks', () => {
        expect(ActionType.ReceiveTasks).toEqual('ReceiveTasks');
    });

    it('should have RequestCreateTask', () => {
        expect(ActionType.RequestCreateTask).toEqual('RequestCreateTask');
    });
    it('should have ReceiveCreateTask', () => {
        expect(ActionType.ReceiveCreateTask).toEqual('ReceiveCreateTask');
    });

    it('should have RequestCreateTask', () => {
        expect(ActionType.RequestCreateTask).toEqual('RequestCreateTask');
    });
    it('should have ReceiveCreateTask', () => {
        expect(ActionType.ReceiveCreateTask).toEqual('ReceiveCreateTask');
    });

    it('should have RequestDeleteTask', () => {
        expect(ActionType.RequestDeleteTask).toEqual('RequestDeleteTask');
    });
    it('should have ReceiveDeleteTask', () => {
        expect(ActionType.ReceiveDeleteTask).toEqual('ReceiveDeleteTask');
    });

    it('should have RequestUpdateTask', () => {
        expect(ActionType.RequestUpdateTask).toEqual('RequestUpdateTask');
    });
    it('should have ReceiveUpdateTask', () => {
        expect(ActionType.ReceiveUpdateTask).toEqual('ReceiveUpdateTask');
    });

    it('should have RequestToggleTask', () => {
        expect(ActionType.RequestToggleTask).toEqual('RequestToggleTask');
    });
    it('should have ReceiveToggleTask', () => {
        expect(ActionType.ReceiveToggleTask).toEqual('ReceiveToggleTask');
    });

});