let idCount = 0;

class Task {

    id: number;
    text: string;
    dueDate: Date = null;
    completed: boolean = false;
    details: string = '';

    constructor() {
        this.id = idCount++;
        this.text = '';
        this.dueDate = null;
        this.completed = false;
        this.details = '';
    }

}

export { Task }