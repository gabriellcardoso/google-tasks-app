enum ActionType {
    
    RequestTaskLists = 'RequestTaskLists',
    ReceiveTaskLists = 'ReceiveTaskLists',

    RequestTasks = 'RequestTasks',
    ReceiveTasks = 'ReceiveTasks',

    RequestCreateTask = 'RequestCreateTask',
    ReceiveCreateTask = 'ReceiveCreateTask',

    RequestUpdateTask = 'RequestUpdateTask',
    ReceiveUpdateTask = 'ReceiveUpdateTask',

    RequestDeleteTask = 'RequestDeleteTask',
    ReceiveDeleteTask = 'ReceiveDeleteTask',

    RequestToggleTask = 'RequestToggleTask',
    ReceiveToggleTask = 'ReceiveToggleTask'

}

export { ActionType }