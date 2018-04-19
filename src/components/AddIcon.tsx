import * as React from 'react';

import ContentAdd from 'material-ui/svg-icons/content/add';

interface AddIconProps {
    color?: string;
}

const AddIcon = (props: AddIconProps) => (
    <ContentAdd color={props.color}/>
);

export { AddIcon }