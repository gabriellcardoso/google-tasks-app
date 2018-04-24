import { shallow, ShallowWrapper } from 'enzyme';
import { IconButton } from 'material-ui';
import * as React from 'react';

import { DeleteButton, DeleteButtonProps } from '../../src/components/DeleteButton';
import { DeleteIcon } from '../../src/components/DeleteIcon';

describe('Given a DeleteButton component', () => {

    const onClick = jest.fn();

    let component: ShallowWrapper<DeleteButtonProps>;

    beforeEach(() => {
        onClick.mockClear();
        component = shallow<DeleteButtonProps>(<DeleteButton onClick={onClick}/>);
    });

    describe('when rendering', () => {
        it('should have a icon button', () => {
            expect(component.find(IconButton).exists()).toEqual(true);
        });
        it('should have a delete icon', () => {
            expect(component.find(DeleteIcon).exists()).toEqual(true);
        });
    });

    describe('when clicking on icon button', () => {
        it('should call onClick callback', () => {
            component.find(IconButton).simulate('click');
            expect(onClick).toHaveBeenCalled();
        });
    });

});