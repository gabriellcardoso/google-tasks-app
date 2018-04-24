import { shallow, ShallowWrapper } from 'enzyme';
import { CircularProgress as MuiCircularProgress, CircularProgressProps } from 'material-ui';
import * as React from 'react';

import { CircularProgress } from '../../src/components/CircularProgress';

describe('Given a CircularProgress component', () => {

    const style: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -20,
        marginLeft: -20
    };

    let component: ShallowWrapper<CircularProgressProps>;

    describe('when rendering', () => {
        beforeEach(() => {
            component = shallow<CircularProgressProps>(<CircularProgress />);
        });
        it('should have a material circular progress', () => {
            expect(component.find(MuiCircularProgress).exists()).toEqual(true);
        });
        it('should have a material circular progress with correct style', () => {
            expect(component.props().style).toEqual(style);
        });
    });

});