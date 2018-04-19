import * as React from 'react';

import { AppBar } from './AppBar';
import { Menu } from './Menu';
import { ListView } from './ListView';
import { ActionButton } from './ActionButton';

const App = () => (
    <section className="app">
        <AppBar/>
        <Menu open={false} />
        <ListView />
        <ActionButton />
    </section>
);

export { App }