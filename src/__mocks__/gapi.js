let signedInCallback = jest.fn();

const googleAuthInstance = {
    isSignedIn: {
        get: jest.fn(),
        listen: jest.fn(callback => signedInCallback = callback)
    },
    signIn: jest.fn(),
    mockSignIn: status => signedInCallback(status)
};

const taskClient = {
    list: jest.fn(),
    insert: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn()
};

const tasklistsClient = {
    list: jest.fn()
};

const googleApiClient = {
    init: jest.fn().mockResolvedValue(null),
    tasks: {
        tasks: taskClient,
        tasklists: tasklistsClient
    }
};

const googleApiAuth2 = {
    getAuthInstance: jest.fn().mockReturnValue(googleAuthInstance)
};

const googleApiLoad = jest.fn((string, callback) => callback());

function clearMocks() {
    googleAuthInstance.isSignedIn.get.mockClear();
    googleAuthInstance.isSignedIn.listen.mockClear();
    googleAuthInstance.signIn.mockClear();
    
    taskClient.list.mockClear();
    taskClient.insert.mockClear();
    taskClient.patch.mockClear();
    taskClient.delete.mockClear();

    tasklistsClient.list.mockClear();

    googleApiClient.init.mockClear();

    googleApiAuth2.getAuthInstance.mockClear();
}

module.exports = {
    load: googleApiLoad,
    client: googleApiClient,
    auth2: googleApiAuth2,
    clear: clearMocks
};