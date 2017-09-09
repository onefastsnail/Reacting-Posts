//import 'babel-polyfill'; // some es6 features still not in babel
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'; // only used to connect react container components to redux
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/index';
import { fetchPosts } from './actions/posts';
import App from './components/Posts/Home';

// lets import our sexy style sheets
import '../scss/main.scss';

/*
     lets create a redux store that holds our complete app state in 1 store only, a single source of truth
     create an instance of our store
*/
const store = configureStore();

/*
    on intial page load, lets dispatch an action. this is the only way to trigger a state change.
    our store's reducing functions will be called to return a new copy of changed state
*/
store.dispatch(fetchPosts());

/*
    lets render our react component to the dom
    provider (from react redux) attaches our app to our store, for top level components
    provider attaches our redux store to react components within
*/
render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('reacting-posts')
);
