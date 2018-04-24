import { Task } from '../../models/Task';
import { DataState } from '../../states/Data';

class TaskReducer {
    static reduce = jest.fn().mockReturnValue(new DataState<Task>());
}

export { TaskReducer }