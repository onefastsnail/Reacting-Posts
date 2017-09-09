import * as types from '../actions/types';

// initial state of our store
const initialState = {
    posts: [],

    users: [],
    usersSelected: [],

    query: '',
    sortBy: 'newest',

    end: 8,
    perPage: 8
};

/*
* nice now in es6 func args defaults are used when an argument is either omitted or undefined, therefore we could set default state.
* as reducers are actually called once when the store is created and then again after upon defined dispatches
* we always return a new version of state, never modify it!
* spread operator
* reducers must be synchronous. they return the new state.
*/
const postsReducer = (state = initialState, action) => {

    let y;

    switch (action.type) {

        case types.FETCH_POSTS_SUCCESS:

            // create a clone, but only shallow, nested objects require further work
            y = Object.assign({}, state);

            // now lets assign some properties to our fresh new to be state object
            y.posts = action.posts;

            // if we dont have users then must be first fetch, so lets populate that array
            if (y.users.length == 0) {
                let postUsers = [];

                // lets now populate our filter dropdown values
                y.posts.map(function (item, i) {

                    // lets save our types
                    postUsers.push(item.user);

                });

                // filter out our duplicates, cheap i know!!
                y.users = postUsers.filter(function (item, pos) { return postUsers.indexOf(item) == pos; });

                // then sort
                y.users.sort();
            }

            return y;

        case types.SHOW_MORE_POSTS:
            y = Object.assign({}, state);
            y.end += y.perPage; //increment our per ending value

            return y; //and return

        case types.FILTER_POSTS_BY_TYPE: {
            y = Object.assign({}, state);

            // lets create a copy of the array as above does a shallow clone
            // and arrays are passed by reference also
            let x = y[action.payload.key].slice();

            // find our match
            let match = x.indexOf(action.payload.value);

            // if we have a match, remove from array
            if (match > -1) {
                x.splice(match, 1);
            }
            else {
                x.push(action.payload.value); //increment our per ending value
            }

            // finally appostd to main object
            y[action.payload.key] = x;

            return y; //and return
        }

        case types.SEARCH_POSTS:
            y = Object.assign({}, state);

            y.query = action.query;

            return y;

        case types.CLEAR_FILTER:
            y = Object.assign({}, state);

            y.query = '';
            y.typesSelected = [];
            y.usersSelected = [];
            y.end = y.perPage;

            return y;

        case types.FETCH_POST_SUCCESS:
            y = Object.assign({}, state);

            y.post = action.post;

            return y;

        default:
            return state;
    }
};

export default postsReducer;
