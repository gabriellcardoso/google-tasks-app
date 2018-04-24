import { TaskList } from '../../models/TaskList';
import { DataState } from '../../states/Data';

class TaskListReducer {
    static reduce = jest.fn().mockReturnValue(new DataState<TaskList>());
}

export { TaskListReducer }