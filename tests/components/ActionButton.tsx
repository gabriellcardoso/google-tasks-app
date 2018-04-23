import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { getMuiTheme } from 'material-ui/styles';
import { shallow } from 'enzyme';

import { ActionButton } from '../../src/components/ActionButton';

describe('Given an ActionButton component', () => {

    const muiTheme = getMuiTheme();
    const callback = jest.fn();

    const component = shallow(
        <ActionButton onClick={callback} />,
        { context: muiTheme }
    );

    it('should have a floating action button', () => {
        const nodes = component.find('FloatingActionButton');
        expect(nodes).toHaveLength(1);
    });

    describe('when floating action button clicked', () => {
        it('should call onClick callback', () => {
            component.find('FloatingActionButton').simulate('click');
            expect(callback).toHaveBeenCalled();
        });
    });

});