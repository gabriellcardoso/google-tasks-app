import * as React from 'react';
import { getMuiTheme } from 'material-ui/styles';
import { shallow } from 'enzyme';

import { ActionButton } from '../../src/components/ActionButton';
import { FloatingActionButton } from 'material-ui';
import { AddIcon } from '../../src/components/AddIcon';

describe('Given an ActionButton component', () => {

    const muiTheme = getMuiTheme();
    const callback = jest.fn();

    const component = shallow(
        <ActionButton onClick={callback} />,
        { context: muiTheme }
    );

    beforeEach(() => {
        this.floatingActionButton = component.find(FloatingActionButton);
    });

    it('should have a floating action button', () => {
        expect(this.floatingActionButton).toHaveLength(1);
    });

    it('should have "action-button" as floating action button', () => {
        expect(this.floatingActionButton.hasClass('action-button')).toEqual(true);
    });

    it('should have an add icon', () => {
        expect(component.find(AddIcon)).toHaveLength(1);
    });

    describe('when floating action button clicked', () => {
        it('should call onClick callback', () => {
            component.find('FloatingActionButton').simulate('click');
            expect(callback).toHaveBeenCalled();
        });
    });

});