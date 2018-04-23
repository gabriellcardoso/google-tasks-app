enum ActionType {
    
    RequestTaskLists = 'RequestTaskLists',
    ReceiveTaskLists = 'ReceiveTaskLists',

    RequestTasks = 'RequestTasks',
    ReceiveTasks = 'ReceiveTasks',

    RequestCreateTask = 'RequestCreateTask',
    ReceiveCreateTask = 'ReceiveCreateTask',

    RequestDeleteTask = 'RequestDeleteTask',
    ReceiveDeleteTask = 'ReceiveDeleteTask',

    RequestUpdateTask = 'RequestUpdateTask',
    ReceiveUpdateTask = 'ReceiveUpdateTask',

    RequestToggleTask = 'RequestToggleTask',
    ReceiveToggleTask = 'ReceiveToggleTask'

}

export { ActionType }