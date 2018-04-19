import * as React from 'react';
import * as renderer  from 'react-test-renderer';

import { App } from '../../src/components/App';

describe('Given an App', () => {
    
    beforeEach(() => {
        this.component = renderer.create(<App />);
        this.tree = this.component.toJSON();
    });

    it('should match snapshot', () => {
        expect(this.tree).toMatchSnapshot();
    });

});