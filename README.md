# Reacting Posts

**In development y'all!**

This is an example to show a basic React app using the Flux architecture, and using React classes, as opposed to the magic previsouly found using the `React.createClass` approach. So more regular JS less React magic :).

## Usage

1. `npm install`
2. `gulp`
3. If you need to run a local web server run `./node_modules/.bin/http-server`

## What im trying to illustrate

* The use of a controlling component to hold higher state and functionality, and passing such down to child components as props
* The use of stores to hold application state
* The use of actions for things such as fetching data, and to dispatch events for the stores to listen

### The Basic Cycle
1. The primary API is called for rendering the posts controlling component into our dom, so the initial touchdown sort of speak.
2. In this regular class construct we set the state property to what our store `getFilter` method returns, so to fetch basic component state.
3. Then we call the `componentDidMount` React method and attach a listener to our store for when it changes
5. This listener calls the provided callback in this component which in turn calls Reacts `setState` method which therefore triggers our component to React and re render from our controlling component down to its children
6. We then call and pass our functions and state as props to the `Filter` and `Results` child components to do their own thing.

## Upcoming
* A branch using routing
* A brancg using Redux
	

## Notes
* This is my experience with React, so take with an open mind :)

## Contributors
Paul Stewart