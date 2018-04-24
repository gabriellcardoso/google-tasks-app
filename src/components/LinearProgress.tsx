import MuiLinearProgress from 'material-ui/LinearProgress';
import * as React from 'react';

const style: React.CSSProperties = {
    width: '50%',
    position: 'absolute',
    top: '50%',
    left: '25%',
    marginTop: -2
};

const LinearProgress = () => (
    <MuiLinearProgress style={style} />
);

export { LinearProgress }