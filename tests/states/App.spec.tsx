import { AppState } from '../../src/states/App';
import { DataState } from '../../src/states/Data';

describe('Given AppState', () => {

    describe('when constructing', () => {
        beforeEach(() => {
            this.appState = new AppState();
        });
        it('should have task lists as a DataState', () => {
            expect(this.appState.taskLists).toBeInstanceOf(DataState);
        });
        it('should have tasks as a DataState', () => {
            expect(this.appState.tasks).toBeInstanceOf(DataState);
        });
    });

});