import * as React from 'react';

import MuiCircularProgress from 'material-ui/CircularProgress';

const style: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
};

const CircularProgress = () => (
    <MuiCircularProgress style={style} />
);

export { CircularProgress }