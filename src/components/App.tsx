import * as React from 'react';

import { AppBar } from './AppBar';
import { Menu } from './Menu';
import { TaskListView } from './TaskListView';
import { ActionButton } from './ActionButton';
import { TaskList } from '../models/TaskList';
import { Task } from '../models/Task';

interface AppProps { }

interface AppState { }

class App extends React.Component<AppProps, AppState> {

    render(): React.ReactElement<any> | false {
        const taskList = new TaskList('TODO', [
            new Task(),
            new Task(),
            new Task(),
            new Task()
        ]);

        return (
            <section className="app">
                <AppBar/>
                <Menu open={false} />
                <TaskListView list={taskList} />
                <ActionButton />
            </section>
        );
    }

}


export { App }