# google-tasks-app

This application is a [Material Design] basic version of the [Google Tasks]. You can use it to manage your tasks. You will be capable to add, delete and update your tasks with this application.

## Getting Started

### Prerequisites

To run this application, you need to have [NodeJS] and [NPM] installed in your computer.

### Installing

To install the application, you will have to download the npm packages used in the project.
To do that, open a CLI in your application folder and run the command:

```
$ npm install 
```

### Configuring

After installing the application, you will need to configure your [Google APIs Credentials]. To configure your credentials, please follow the [Google Task First App] guide.

With your Google API key and Client ID in hands, it is time to configure the application with your credentials. You will need to use both in the application. To use your credentials, you will need to overwrite `{YOUR API KEY}` with your Google API key and `{YOUR CLIENT ID}` with your Google Client ID in `GoogleApiConfig` class. You can find it in [src/config.ts] file. 

```typescript
class GoogleApiConfig {
    static apiKey = '{YOUR API KEY}';
    static discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'];
    static clientId = '{YOUR CLIENT ID}.apps.googleusercontent.com';
    static scope = 'https://www.googleapis.com/auth/tasks';
}
```

## Running

To run the application, you will need to first build it. Open the CLI in the project folder and run the command: 

```
$ npm run build 
```

After building it, you should run the command:

```
$ npm start
```

Now, you can access the application through [localhost](http://localhost:8080).

## Testing

To run the tests, open the CLI and run the command:

```
$ npm test
```

## Improvements

- [x] Finish unit tests
- [ ] Fix Typescript paths
- [ ] Improve tests
- [ ] Config in a JSON file
- [ ] Error handling
- [ ] Optimistic UI update
- [ ] Better loading UI
- [ ] Task due date
- [ ] Task details
- [ ] Subtasks
- [ ] Order tasks
- [ ] Rearrange tasks order
- [ ] Clear completed tasks
- [ ] Clear all tasks
- [ ] Create task list
- [ ] Remove task list
- [ ] Rename task list

## Built With

- [Typescript]
- [Webpack]
- [React]
- [Redux]
- [Jest]
- [Google Tasks API]

## Authors

* **Gabriel Cardoso** - [gabriellcardoso]

## License

This project is licensed under the MIT License - see the [LICENSE.md] file for details

[Material Design]: https://material.io/guidelines/material-design/
[Google Tasks]: https://mail.google.com/tasks/canvas

[NodeJS]: https://nodejs.org/en/
[NPM]: https://www.npmjs.com/

[Google APIs Credentials]: https://console.developers.google.com/apis/credentials
[Google Task First App]: https://developers.google.com/google-apps/tasks/firstapp#register

[Typescript]: https://www.typescriptlang.org/
[Webpack]: https://webpack.js.org/
[React]: https://reactjs.org/
[Redux]: https://redux.js.org/
[Jest]: https://facebook.github.io/jest/
[Google Tasks API]: https://developers.google.com/google-apps/tasks/

[gabriellcardoso]: https://github.com/gabriellcardoso
[src/config.ts]: src/config.ts
[LICENSE.md]: LICENSE.md