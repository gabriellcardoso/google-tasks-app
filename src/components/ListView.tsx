import * as React from 'react';

import {
    Paper,
    Subheader,
    Divider,
} from 'material-ui';

import { TaskItem } from './TaskItem';

const ListView = () => (
    <section className="list-view">
        <Paper className="container">
            <Subheader>TODO List</Subheader>
            <Divider />
            <TaskItem index={1}/>
            <TaskItem index={2}/>
            <TaskItem index={3}/>
            <TaskItem index={4}/>
        </Paper>
    </section>
);

export { ListView }