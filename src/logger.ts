import { ActionType } from './actions/ActionType';

const logger = (store: any) => (next: any) => (action: any) => {
    console.group(ActionType[action.type]);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState())
    console.groupEnd();
    return result;
};

export { logger };