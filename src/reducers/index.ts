import { combineReducers } from 'redux';
import { TaskListReducer } from './TaskListReducer';
import { TaskReducer } from './TaskReducer';

const reducers = combineReducers({
    taskLists: TaskListReducer.reduce,
    selected: TaskReducer.reduce 
});

export { reducers }