# A React Redux Filter with Routing

Work in progress. Mostly a prototype / base for wee projects ie. converting/adding components of a project to React :).

Packed with React, Redux, React Router v4, and bundled with love using Webpack.

I have also created another branch that adds [Redux Form](https://github.com/erikras/redux-form) on this [branch](https://github.com/onefastsnail/Reacting-Posts/tree/redux-form) if your interested (again WIP).

## Usage

1. Install your node modules `npm install`
2. If you need a local HTTP server `npm run start` which also boots up Webpack in watch mode
3. Else to watch the files and to begining developing run `npm run dev`
4. Visit [http://127.0.0.1:8080](http://127.0.0.1:8080)
5. To create a production bundle run `npm run build`

## About the App

### How it works

* I will get to this soon :P.

### Folder Structure

Im experimenting with a folder structure just now that i feel would scale. The idea currently is `components/` would simply be dumb React components, where their data and functionaility would be passed to them via props. So easy to pass around projects.

`ducks/` This is an interesting one. A [proposal](https://github.com/erikras/ducks-modular-redux) for bundling reducers, action types and actions, and in this case i have done so into one file, so we can quickly work these features of the project without having to navigate files. I know this file could get large, but in this case, splitting functionality etc into small ducks would fix this.

Container components are components that are aware of things such as Redux. `containers/` would be the controlling components of that feature, that connects to the state management and routing. So we import our ducks and what not here, and pass those down as props to the dumb presentational components.


## Notes
* Using Webpack for speedy development
* Contains a webserver if you need one
* Using a sample JSON from a Codepen integration i was working on previously.
* Running [Redux Logger](https://github.com/evgenyrodionov/redux-logger) middleware so we can keep an eye on our state.

## Contributors
Paul Stewart
