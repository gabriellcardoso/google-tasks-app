const GoogleApi = require('gapi');

import { GoogleApiConfig } from "../config";

class ApiClient {

    private auth: any;
    private isAuthorized: boolean;
    private request: () => Promise<any>;

    constructor() {
        this.isAuthorized = false;
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
            this.request = () => request()
                .then((response: any) => resolve(response.result))
                .catch((response: any) => reject(response));

            this.tryToSendRequest();
        });
    }

    private tryToSendRequest(): void {
        if (this.isAuthorized && this.request) {
            this.request();
            this.request = null;
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

    updateTask(taskListId: string, taskId: string, title: string) {
        return this.sendRequest(
            () => GoogleApi.client.tasks.tasks.patch({
                tasklist: taskListId,
                task: taskId,
                title
            })
        );
    }

}

export default new ApiClient();