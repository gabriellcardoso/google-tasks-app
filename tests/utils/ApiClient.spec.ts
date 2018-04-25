jest.mock('gapi');

const GoogleApi = require('gapi');

import { GoogleApiConfig } from '../../src/config';
import { ApiClient } from '../../src/utils/ApiClient';

describe('Given an ApiClient', () => {

    let random: number;
    let promise: Promise<any>;
    let apiAuth: any;
    let apiClient: ApiClient;

    const successCallback = jest.fn();
    const failureCallback = jest.fn();

    beforeEach(() => {
        apiAuth = GoogleApi.auth2.getAuthInstance();
        GoogleApi.clear();
    });

    describe('with user is signed in', () => {
        beforeEach(() => {
            apiAuth.isSignedIn.get.mockReturnValue(true);
            apiClient = new ApiClient();
            promise = null;
        });
        describe('when constructing', () => {
            it('should load client', () => {
                expect(GoogleApi.load).toBeCalledWith('client', expect.any(Function));
            });
            it('should initialize client', () => {
                expect(GoogleApi.client.init).toHaveBeenCalledWith(GoogleApiConfig);
            });
            it('should get auth instance', () => {
                expect(GoogleApi.auth2.getAuthInstance).toHaveBeenCalled();
            });
            it('should set to listen if user signs in', () => {
                expect(apiAuth.isSignedIn.listen).toHaveBeenCalledWith(expect.any(Function));
            });
            it('should get user sign status', () => {
                expect(apiAuth.isSignedIn.get).toHaveBeenCalled();
            });
            it('should not try to sign in', () => {
                GoogleApi.clear();
                apiClient = new ApiClient();
                expect(apiAuth.signIn).not.toHaveBeenCalled();
            });
        });
        describe('when getting task lists', () => {
            beforeEach(() => {
                GoogleApi.clear();
                promise = apiClient.getTaskLists();
            });
            it('should request to list tasklists to Google Tasks API', () => {
                expect(GoogleApi.client.tasks.tasklists.list).toHaveBeenCalled();
            });
            it('should not try to sign in', () => {
                expect(apiAuth.signIn).not.toHaveBeenCalled();
            });
            it('should return a promise', () => {
                expect(promise).toBeInstanceOf(Promise);
            });
            describe('if request succeed', () => {
                beforeEach(() => {
                    random = Math.random();
                    successCallback.mockClear();
                    GoogleApi.client.tasks.tasklists.list.mockResolvedValue({ result: random });
                    apiClient.getTaskLists().then(successCallback);
                });
                it('should resolve promise with request result', () => {
                    expect(successCallback).toHaveBeenCalledWith(random);
                });
            });
            describe('if request fail', () => {
                beforeEach(() => {
                    random = Math.random();
                    failureCallback.mockClear();
                    GoogleApi.client.tasks.tasklists.list.mockRejectedValue(random);
                    apiClient.getTaskLists().catch(failureCallback);
                });
                it('should resolve promise with request result', () => {
                    expect(failureCallback).toHaveBeenCalledWith(random);
                });
            });
        });
        describe('when getting tasks', () => {
            beforeEach(() => {
                GoogleApi.clear();
                promise = apiClient.getTasks('435');
            });
            it('should request to list tasks to Google Tasks API', () => {
                expect(GoogleApi.client.tasks.tasks.list).toHaveBeenCalledWith({ tasklist: '435' });
            });
            it('should not try to sign in', () => {
                expect(apiAuth.signIn).not.toHaveBeenCalled();
            });
            it('should return a promise', () => {
                expect(promise).toBeInstanceOf(Promise);
            });
            describe('if request succeed', () => {
                beforeEach(() => {
                    random = Math.random();
                    successCallback.mockClear();
                    GoogleApi.client.tasks.tasks.list.mockResolvedValue({ result: random });
                    apiClient.getTasks('435').then(successCallback);
                });
                it('should resolve promise with request result', () => {
                    expect(successCallback).toHaveBeenCalledWith(random);
                });
            });
            describe('if request fail', () => {
                beforeEach(() => {
                    random = Math.random();
                    failureCallback.mockClear();
                    GoogleApi.client.tasks.tasks.list.mockRejectedValue(random);
                    apiClient.getTasks('435').catch(failureCallback);
                });
                it('should resolve promise with request result', () => {
                    expect(failureCallback).toHaveBeenCalledWith(random);
                });
            });
        });
        describe('when creating task', () => {
            beforeEach(() => {
                GoogleApi.clear();
                promise = apiClient.createTask('435', '123', 'New task');
            });
            it('should request to create task to Google Tasks API', () => {
                expect(GoogleApi.client.tasks.tasks.insert).toHaveBeenCalledWith({
                    tasklist: '435',
                    previous: '123',
                    title: 'New task'
                });
            });
            it('should not try to sign in', () => {
                expect(apiAuth.signIn).not.toHaveBeenCalled();
            });
            it('should return a promise', () => {
                expect(promise).toBeInstanceOf(Promise);
            });
            describe('if request succeed', () => {
                beforeEach(() => {
                    random = Math.random();
                    successCallback.mockClear();
                    GoogleApi.client.tasks.tasks.insert.mockResolvedValue({ result: random });
                    apiClient.createTask('435').then(successCallback);
                });
                it('should resolve promise with request result', () => {
                    expect(successCallback).toHaveBeenCalledWith(random);
                });
            });
            describe('if request fail', () => {
                beforeEach(() => {
                    random = Math.random();
                    failureCallback.mockClear();
                    GoogleApi.client.tasks.tasks.insert.mockRejectedValue(random);
                    apiClient.createTask('435').catch(failureCallback);
                });
                it('should resolve promise with request result', () => {
                    expect(failureCallback).toHaveBeenCalledWith(random);
                });
            });
        });
        describe('when updating task', () => {
            beforeEach(() => {
                GoogleApi.clear();
                promise = apiClient.updateTask('435', '123', 'Task 123');
            });
            it('should request to update task to Google Tasks API', () => {
                expect(GoogleApi.client.tasks.tasks.patch).toHaveBeenCalledWith({
                    tasklist: '435',
                    task: '123',
                    title: 'Task 123'
                });
            });
            it('should not try to sign in', () => {
                expect(apiAuth.signIn).not.toHaveBeenCalled();
            });
            it('should return a promise', () => {
                expect(promise).toBeInstanceOf(Promise);
            });
            describe('if request succeed', () => {
                beforeEach(() => {
                    random = Math.random();
                    successCallback.mockClear();
                    GoogleApi.client.tasks.tasks.patch.mockResolvedValue({ result: random });
                    apiClient.updateTask('435', '123', 'Task 123').then(successCallback);
                });
                it('should resolve promise with request result', () => {
                    expect(successCallback).toHaveBeenCalledWith(random);
                });
            });
            describe('if request fail', () => {
                beforeEach(() => {
                    random = Math.random();
                    failureCallback.mockClear();
                    GoogleApi.client.tasks.tasks.patch.mockRejectedValue(random);
                    apiClient.updateTask('435', '123', 'Task 123').catch(failureCallback);
                });
                it('should resolve promise with request result', () => {
                    expect(failureCallback).toHaveBeenCalledWith(random);
                });
            });
        });
        describe('when toggling task', () => {
            beforeEach(() => {
                GoogleApi.clear();
                promise = apiClient.toggleTask('435', '123', 'completed');
            });
            describe('to completed status', () => {
                it('should request to set task status to completed to Google Tasks API', () => {
                    expect(GoogleApi.client.tasks.tasks.patch).toHaveBeenCalledWith({
                        tasklist: '435',
                        task: '123',
                        status: 'completed',
                        completed: expect.any(String)
                    });
                });
            });
            describe('to needs action', () => {
                beforeEach(() => {
                    GoogleApi.clear();
                    promise = apiClient.toggleTask('435', '123', 'needsAction');
                });
                it('should request to set task status to needs action to Google Tasks API ', () => {
                    expect(GoogleApi.client.tasks.tasks.patch).toHaveBeenCalledWith({
                        tasklist: '435',
                        task: '123',
                        status: 'needsAction',
                        completed: null
                    });
                });
            });
            it('should not try to sign in', () => {
                expect(apiAuth.signIn).not.toHaveBeenCalled();
            });
            it('should return a promise', () => {
                expect(promise).toBeInstanceOf(Promise);
            });
            describe('if request succeed', () => {
                beforeEach(() => {
                    random = Math.random();
                    successCallback.mockClear();
                    GoogleApi.client.tasks.tasks.patch.mockResolvedValue({ result: random });
                    apiClient.toggleTask('435', '123', 'completed').then(successCallback);
                });
                it('should resolve promise with request result', () => {
                    expect(successCallback).toHaveBeenCalledWith(random);
                });
            });
            describe('if request fail', () => {
                beforeEach(() => {
                    random = Math.random();
                    failureCallback.mockClear();
                    GoogleApi.client.tasks.tasks.patch.mockRejectedValue(random);
                    apiClient.toggleTask('435', '123', 'completed').catch(failureCallback);
                });
                it('should resolve promise with request result', () => {
                    expect(failureCallback).toHaveBeenCalledWith(random);
                });
            });
        });
        describe('when deleting task', () => {
            beforeEach(() => {
                GoogleApi.clear();
                promise = apiClient.deleteTask('435', '123');
            });
            it('should request to delete task to Google Tasks API', () => {
                expect(GoogleApi.client.tasks.tasks.delete).toHaveBeenCalledWith({
                    tasklist: '435',
                    task: '123'
                });
            });
            it('should not try to sign in', () => {
                expect(apiAuth.signIn).not.toHaveBeenCalled();
            });
            it('should return a promise', () => {
                expect(promise).toBeInstanceOf(Promise);
            });
            describe('if request succeed', () => {
                beforeEach(() => {
                    random = Math.random();
                    successCallback.mockClear();
                    GoogleApi.client.tasks.tasks.delete.mockResolvedValue({ result: random });
                    apiClient.deleteTask('435', '123').then(successCallback);
                });
                it('should resolve promise with request result', () => {
                    expect(successCallback).toHaveBeenCalledWith(random);
                });
            });
            describe('if request fail', () => {
                beforeEach(() => {
                    random = Math.random();
                    failureCallback.mockClear();
                    GoogleApi.client.tasks.tasks.delete.mockRejectedValue(random);
                    apiClient.deleteTask('435', '123').catch(failureCallback);
                });
                it('should resolve promise with request result', () => {
                    expect(failureCallback).toHaveBeenCalledWith(random);
                });
            });
        });
    });

    describe('with user is not signed in', () => {
        beforeEach(() => {
            GoogleApi.clear();
            apiAuth.isSignedIn.get.mockReturnValue(false);
            apiClient = new ApiClient();
        });
        describe('when constructing', () => {
            it('should load client', () => {
                expect(GoogleApi.load).toBeCalledWith('client', expect.any(Function));
            });
            it('should initialize client', () => {
                expect(GoogleApi.client.init).toHaveBeenCalledWith(GoogleApiConfig);
            });
            it('should get auth instance', () => {
                expect(GoogleApi.auth2.getAuthInstance).toHaveBeenCalled();
            });
            it('should set to listen if user signs in', () => {
                expect(apiAuth.isSignedIn.listen).toHaveBeenCalledWith(expect.any(Function));
            });
            it('should get user sign status', () => {
                expect(apiAuth.isSignedIn.get).toHaveBeenCalled();
            });
            it('should try to sign in', () => {
                expect(apiAuth.signIn).toHaveBeenCalled();
            });
        });
        describe('when getting task lists', () => {
            beforeEach(() => {
                apiClient.getTaskLists();
            });
            it('should not request to list task list to Google Tasks API', () => {
                expect(GoogleApi.client.tasks.tasklists.list).not.toHaveBeenCalled();
            });
            it('should try to sign in', () => {
                expect(apiAuth.signIn).toHaveBeenCalled();
            });
        });
        describe('when getting tasks', () => {
            beforeEach(() => {
                apiClient.getTasks('435');
            });
            it('should not request to list tasks to Google Tasks API', () => {
                expect(GoogleApi.client.tasks.tasks.list).not.toHaveBeenCalled();
            });
            it('should try to sign in', () => {
                expect(apiAuth.signIn).toHaveBeenCalled();
            });
        });
        describe('when creating task', () => {
            beforeEach(() => {
                apiClient.createTask('435', '123');
            });
            it('should not request to create task to Google Tasks API', () => {
                expect(GoogleApi.client.tasks.tasks.insert).not.toHaveBeenCalled();
            });
            it('should try to sign in', () => {
                expect(apiAuth.signIn).toHaveBeenCalled();
            });
        });
        describe('when updating task', () => {
            beforeEach(() => {
                apiClient.updateTask('435', '123', 'Task 123');
            });
            it('should not request to update task to Google Tasks API', () => {
                expect(GoogleApi.client.tasks.tasks.patch).not.toHaveBeenCalled();
            });
            it('should try to sign in', () => {
                expect(apiAuth.signIn).toHaveBeenCalled();
            });
        });
        describe('when toggling task', () => {
            beforeEach(() => {
                apiClient.toggleTask('435', '123', 'completed');
            });
            it('should not request to toggle task to Google Tasks API', () => {
                expect(GoogleApi.client.tasks.tasks.patch).not.toHaveBeenCalled();
            });
            it('should try to sign in', () => {
                expect(apiAuth.signIn).toHaveBeenCalled();
            });
        });
        describe('when deleting task', () => {
            beforeEach(() => {
                apiClient.deleteTask('435', '123');
            });
            it('should not request to delete task to Google Tasks API', () => {
                expect(GoogleApi.client.tasks.tasks.delete).not.toHaveBeenCalled();
            });
            it('should try to sign in', () => {
                expect(apiAuth.signIn).toHaveBeenCalled();
            });
        });
        describe('when user sign in after requesting', () => {
            it('should request get task lists previous request', () => {
                apiClient.getTaskLists();
                apiAuth.mockSignIn(true);
                expect(GoogleApi.client.tasks.tasklists.list).toHaveBeenCalled();
            });
            it('should request get tasks previous request', () => {
                apiClient.getTasks('123');
                apiAuth.mockSignIn(true);
                expect(GoogleApi.client.tasks.tasks.list).toHaveBeenCalledWith({ tasklist: '123' });
            });
            it('should request create task previous request', () => {
                apiClient.createTask('123', '435', 'New task title');
                apiAuth.mockSignIn(true);
                expect(GoogleApi.client.tasks.tasks.insert).toHaveBeenCalledWith({
                    tasklist: '123',
                    previous: '435',
                    title: 'New task title'
                });
            });
            it('should request update task previous request', () => {
                apiClient.updateTask('123', '435', 'Title');
                apiAuth.mockSignIn(true);
                expect(GoogleApi.client.tasks.tasks.patch).toHaveBeenCalledWith({
                    tasklist: '123',
                    task: '435',
                    title: 'Title'
                });
            });
            it('should request toggle task previous request', () => {
                apiClient.toggleTask('123', '435', 'needsAction');
                apiAuth.mockSignIn(true);
                expect(GoogleApi.client.tasks.tasks.patch).toHaveBeenCalledWith({
                    tasklist: '123',
                    task: '435',
                    status: 'needsAction',
                    completed: null
                });
            });
            it('should request delete task previous request', () => {
                apiClient.deleteTask('123', '435');
                apiAuth.mockSignIn(true);
                expect(GoogleApi.client.tasks.tasks.delete).toHaveBeenCalledWith({
                    tasklist: '123',
                    task: '435'
                });
            });
        });
    });

});