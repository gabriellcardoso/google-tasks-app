class DataState<T> {
    data: T[] = new Array<T>();
    isFetching = false;
    isCreating = false;
    isUpdating = false;
}

export { DataState }