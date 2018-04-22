const GoogleApi = require('gapi');

import { GoogleApiConfig } from "../config";

class ApiClient {

    private auth: any;
    private isAuthorized: boolean = false;
    private requests: Array<() => Promise<any>> = [];

    constructor() {
        GoogleApi.load('client', () => this.initializeClient());
    }

    private initializeClient() {
        GoogleApi.client
            .init(GoogleApiConfig)
            .then(() => this.setAuth());
    }

    private setAuth() {
        this.auth = GoogleApi.auth2.getAuthInstance();
        this.auth.isSignedIn.listen((status: boolean) => this.updateAuthStatus(status));

        const status = this.auth.isSignedIn.get();

        if (status) {
            this.updateAuthStatus(status);
        }
        else {
            this.auth.signIn();
        }
    }

    private updateAuthStatus(status: boolean) {
        this.isAuthorized = status;
        this.tryToSendRequest();
    }

    private sendRequest(request: () => Promise<any>) {
        return new Promise((resolve, reject) => {
            this.requests.push(
                () => request()
                    .then((response: any) => resolve(response.result))
                    .catch((response: any) => reject(response))
            );

            this.tryToSendRequest();
        });
    }

    private tryToSendRequest(): void {
        if (this.isAuthorized && this.requests.length) {
            this.requests.forEach(request => request());
            this.requests = [];
        }
        else if (this.auth) {
            this.auth.signIn();
        }
    }

    getTasksLists(): Promise<any> {
        return this.sendRequest(
            () => GoogleApi.client.tasks.tasklists.list()
        );
    }

    getTasks(taskListId: string): Promise<any> {
        return this.sendRequest(
            () => GoogleApi.client.tasks.tasks.list({
                tasklist: taskListId
            })
        );
    }

    createTask(taskListId: string, previousTaskId?: string, title?: string): Promise<any> {
        return this.sendRequest(
            () => GoogleApi.client.tasks.tasks.insert({
                tasklist: taskListId,
                previous: previousTaskId,
                title
            })
        );
    }

    deleteTask(taskListId: string, taskId: string): Promise<any> {
        return this.sendRequest(
            () => GoogleApi.client.tasks.tasks.delete({
                tasklist: taskListId,
                task: taskId
            })
        );
    }

    updateTask(taskListId: string, taskId: string, title: string) {
        return this.sendRequest(
            () => GoogleApi.client.tasks.tasks.patch({
                tasklist: taskListId,
                task: taskId,
                title
            })
        );
    }

    toggleTask(taskListId: string, taskId: string, status: string) {
        const completed = status === 'completed' ?
            new Date().toISOString() :
            null;

        return this.sendRequest(
            () => GoogleApi.client.tasks.tasks.patch({
                tasklist: taskListId,
                task: taskId,
                status: status,
                completed: completed,
            })
        );
    }

}

export default new ApiClient();