import * as React from 'react';
import MuiAppBar from 'material-ui/AppBar';

interface AppBarProps {
    onMenuClick: () => void;
}

const AppBar = (props: AppBarProps) => (
    <MuiAppBar 
        className="app-bar"
        title="Tasks App"
        showMenuIconButton={true}
        onLeftIconButtonClick={props.onMenuClick}
    />
);

export { AppBar }