import 'es6-shim';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ThemeProvider } from './utils/ThemeProvider';
import { createStore, applyMiddleware } from 'redux';
import { Provider as DataProvider } from 'react-redux';
import { reducers } from './reducers';
import { logger } from './logger';

import AppContainer from './containers/App';

const store = createStore(reducers, applyMiddleware(logger));

ReactDOM.render(
    <ThemeProvider>
        <DataProvider store={store}>
            <AppContainer />
        </DataProvider>
    </ThemeProvider>,
    document.getElementById('google-tasks')
);