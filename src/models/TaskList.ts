interface TaskList {
    /** ETag of the resource. */
    etag?: string;
    /** Task list identifier. */
    id?: string;
    /** Type of the resource. This is always "tasks#taskList". */
    kind?: string;
    /** URL pointing to this task list. Used to retrieve, update, or delete this task list. */
    selfLink?: string;
    /** Title of the task list. */
    title?: string;
    /** Last modification time of the task list (as a RFC 3339 timestamp). */
    updated?: string;
}

export { TaskList }