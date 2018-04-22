class DataState<T> {
    data: T[];
    isFetching = false;

    constructor() {
        this.data = new Array<T>();
        this.isFetching = false;
    }
}

export { DataState }