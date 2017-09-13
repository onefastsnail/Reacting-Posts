//import 'babel-polyfill'; // some es6 features still not in babel
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'; // only used to connect react container components to redux
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store';

// lets grab our posts feature container
import Posts from './containers/posts';

// an example of another container / feature in this build
// running multiple react apps on the page, not an SPA but we can create many cool wee features
import Dummy from './containers/dummy';

// lets import our sexy style sheets
import '../scss/main.scss';

// create an instance of our store
const store = configureStore();

/*
    lets render our react component to the dom
    provider (from react redux) attaches our app to our store, for top level components
*/
render(
    <Provider store={store}>
        <BrowserRouter>
            <Posts />
        </BrowserRouter>
    </Provider>,
    document.getElementById('reacting-posts')
);

// a second render method to create our second feature
render(
    <Provider store={store}>
        <Dummy />
    </Provider>,
    document.getElementById('reacting-dummy')
);
