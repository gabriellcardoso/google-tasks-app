import { combineReducers } from 'redux';
import { TaskListReducer } from './TaskList';
import { TaskReducer } from './Task';

const reducers = combineReducers({
    taskLists: TaskListReducer.reduce,
    selected: TaskReducer.reduce 
});

export { reducers }