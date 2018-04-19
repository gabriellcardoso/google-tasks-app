import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './components/App';
import { ThemeProvider } from './utils/ThemeProvider';

ReactDOM.render(
    <ThemeProvider>
        <App />
    </ThemeProvider>,
    document.getElementById('google-tasks')
);