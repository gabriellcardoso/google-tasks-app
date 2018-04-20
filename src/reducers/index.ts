import { combineReducers } from 'redux';
import { TaskReducer } from './TaskReducer';

const reducers = combineReducers({
    selected: TaskReducer.reduce 
});

export { reducers }