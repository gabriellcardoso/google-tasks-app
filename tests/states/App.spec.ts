import { AppState } from '../../src/states/App';
import { DataState } from '../../src/states/Data';

describe('Given AppState', () => {

    let appState: AppState;

    describe('when constructing', () => {
        beforeEach(() => {
            appState = new AppState();
        });
        it('should have task lists as a DataState', () => {
            expect(appState.taskLists).toBeInstanceOf(DataState);
        });
        it('should have tasks as a DataState', () => {
            expect(appState.tasks).toBeInstanceOf(DataState);
        });
    });

});