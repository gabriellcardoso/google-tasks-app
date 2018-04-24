class TaskActions {

    static getTasks = jest.fn().mockReturnValue({ type: 'TaskActions.getTasks' });
    static createTask = jest.fn().mockReturnValue({ type: 'TaskActions.createTask' });

}

export { TaskActions }