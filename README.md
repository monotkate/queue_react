# todo_react
React 0.14

## Getting started

Once the repository has been cloned, run `npm install` to install all the dependencies. This project uses express for the server side code and React, Material UI and ES2015 (through Babel) for the front end. This project also uses gulp to automate tasks.

Running `gulp` will print out the common tasks for the project. To get started, `gulp build` will build `*.jsx` files in `src/` and dependencies into `dist/bundle.js`. Additionally, `gulp watch` will rebuild the `.jsx` files when there are changes.

`gulp serve` will start the node express server which is listening on port 8080.

If not in active development, `gulp start` will build the project and start the node server. For active develpment, `gulp watch` and `gulp serve` are suggested as they rebuild the client code on changes to the `*.jsx` and the server code on changes to `server/server.js`.

## Cleaning

Running a `gulp clean:dist` will remove the `dist/` folder. `gulp clean` is an alias for `gulp clean:dist`. The `node_modules` folder can be cleaned up using `gulp clean:modules` and both the build folder and the node modules folder can be cleaned up using `gulp clean:all`.

## Useful links
* [React Docs](https://facebook.github.io/react/docs/getting-started.html)
* [browserify Docs](https://github.com/substack/node-browserify#usage)
* [Babel Options](https://babeljs.io/docs/usage/options/)
