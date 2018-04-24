import * as React from 'react';
import { shallow } from 'enzyme';

import { ActionButton } from '../../src/components/ActionButton';
import { FloatingActionButton } from 'material-ui';
import { AddIcon } from '../../src/components/AddIcon';

describe('Given an ActionButton component', () => {

    const callback = jest.fn();
    const component = shallow(<ActionButton onClick={callback} />);

    describe('when rendering', () => {
        it('should have a floating action button', () => {
            expect(component.find(FloatingActionButton).exists()).toEqual(true);
        });
        it('should have "action-button" as floating action button', () => {
            expect(component.find(FloatingActionButton).hasClass('action-button')).toEqual(true);
        });
        it('should have an add icon', () => {
            expect(component.find(AddIcon).exists()).toEqual(true);
        });
    });

    describe('when floating action button clicked', () => {
        it('should call onClick callback', () => {
            component.find('FloatingActionButton').simulate('click');
            expect(callback).toHaveBeenCalled();
        });
    });

});