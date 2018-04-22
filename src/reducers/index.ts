import { combineReducers } from 'redux';
import { TaskListReducer } from './TaskList';
import { TaskReducer } from './Task';

const reducers = combineReducers({
    taskLists: TaskListReducer.reduce,
    tasks: TaskReducer.reduce 
});

export { reducers }