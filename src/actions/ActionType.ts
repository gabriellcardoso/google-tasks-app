enum ActionType {
    RequestTaskLists = 'RequestTaskLists',
    ReceiveTaskLists = 'ReceiveTaskLists',
    RequestTasks = 'RequestTasks',
    ReceiveTasks = 'ReceiveTasks',
    RequestCreateTask = 'RequestCreateTask',
    CreateTask = 'ReceiveCreateTask',
    RequestUpdateTask = 'RequestUpdateTask',
    UpdateTask = 'ReceiveUpdateTask',
    RequestDeleteTask = 'RequestDeleteTask',
    ReceiveDeleteTask = 'ReceiveDeleteTask',
    ToggleTask = 'ToggleTask'
}

export { ActionType }