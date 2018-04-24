class DataState<T> {
    data: T[] = new Array<T>();
    fetching = false;
    creating = false;
    updating = false;
    deleting = false;
}

export { DataState }