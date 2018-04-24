import { DataState } from '../../src/states/Data';

describe('Given DataState', () => {

    describe('when constructing', () => {
        beforeEach(() => {
            this.dataState = new DataState<Number>();
        });
        it('should have a data as an empty array', () => {
            expect(this.dataState.data).toBeInstanceOf(Array);
        });
        it('should have fetching as false', () => {
            expect(this.dataState.fetching).toEqual(false);
        });
        it('should have creating as false', () => {
            expect(this.dataState.creating).toEqual(false);
        });
        it('should have updating as false', () => {
            expect(this.dataState.updating).toEqual(false);
        });
        it('should have deleting as false', () => {
            expect(this.dataState.deleting).toEqual(false);
        });
    });

});