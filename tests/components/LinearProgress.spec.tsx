import { ShallowWrapper, shallow } from 'enzyme';
import MuiLinearProgress from 'material-ui/LinearProgress';
import * as React from 'react';
import { LinearProgress } from '../../src/components/LinearProgress';

describe('Given a LinearProgress component', () => {

    const style: React.CSSProperties = {
        width: '50%',
        position: 'absolute',
        top: '50%',
        left: '25%',
        marginTop: -2
    };

    let component: ShallowWrapper;

    beforeEach(() => {
        component = shallow(<LinearProgress />);
    });

    describe('when rendering', () => {
        it('should have a material linear progress', () => {
            expect(component.find(MuiLinearProgress).exists()).toEqual(true);
        });
        it('should have linar progress style', () => {
            expect(component.find(MuiLinearProgress).props().style).toEqual(style);
        });
    });

});