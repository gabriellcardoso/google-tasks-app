import { DataState } from '../../src/states/Data';

describe('Given DataState', () => {

    let dataState: DataState<Number>;

    describe('when constructing', () => {
        beforeEach(() => {
            dataState = new DataState<Number>();
        });
        it('should have a data as an empty array', () => {
            expect(dataState.data).toBeInstanceOf(Array);
        });
        it('should have fetching as false', () => {
            expect(dataState.fetching).toEqual(false);
        });
        it('should have creating as false', () => {
            expect(dataState.creating).toEqual(false);
        });
        it('should have updating as false', () => {
            expect(dataState.updating).toEqual(false);
        });
        it('should have deleting as false', () => {
            expect(dataState.deleting).toEqual(false);
        });
    });

});