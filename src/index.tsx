import 'es6-shim';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { reducers } from './reducers';
import thunk from 'redux-thunk';
import { logger } from './logger';

import { ThemeProvider } from './utils/ThemeProvider';
import { Provider as DataProvider } from 'react-redux';
import AppContainer from './containers/App';

const middlewares = applyMiddleware(thunk, logger);
const store = createStore(reducers, middlewares);

ReactDOM.render(
    <ThemeProvider>
        <DataProvider store={store}>
            <AppContainer />
        </DataProvider>
    </ThemeProvider>,
    document.getElementById('google-tasks')
);