class TaskActions {

    static getTasks = jest.fn().mockReturnValue({ type: 'TaskActions.getTasks' });
    static createTask = jest.fn().mockReturnValue({ type: 'TaskActions.createTask' });
    static updateTask = jest.fn().mockReturnValue({ type: 'TaskActions.updateTask' });
    static toggleTask = jest.fn().mockReturnValue({ type: 'TaskActions.toggleTask' });
    static deleteTask = jest.fn().mockReturnValue({ type: 'TaskActions.deleteTask' });

}

export { TaskActions }