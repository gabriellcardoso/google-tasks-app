import { shallow } from 'enzyme';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as React from 'react';

import { AddIcon } from '../../src/components/AddIcon';

describe('Given a AddIcon component', () => {

    it('should be equal to ContentAdd component', () => {
        expect(AddIcon).toEqual(ContentAdd);
    });
    
});