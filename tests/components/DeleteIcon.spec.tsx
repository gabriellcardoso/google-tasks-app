import ActionDelete from 'material-ui/svg-icons/action/delete';

import { DeleteIcon } from '../../src/components/DeleteIcon';

describe('Given DeleteIcon component', () => {

    it('should be equal to ActionDelete icon', () => {
        expect(DeleteIcon).toEqual(ActionDelete);
    });

});