import 'es6-shim';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider as DataProvider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { ThemeProvider } from './components/ThemeProvider';
import { AppContainer } from './containers/App';
import { logger } from './logger';
import { reducers } from './reducers';

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