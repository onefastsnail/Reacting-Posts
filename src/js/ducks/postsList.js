import axios from 'axios';

/*
    Our types
*/
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';

export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';

export const SHOW_MORE_POSTS = 'SHOW_MORE_POSTS';
export const SEARCH_POSTS = 'SEARCH_POSTS';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const FILTER_POSTS_BY_PROPERTY = 'FILTER_POSTS_BY_PROPERTY';

/*
    Our action creators
*/
export function searchPosts(query) {
    return { type: SEARCH_POSTS, query };
}

export const showMorePosts = () => ({
    type: SHOW_MORE_POSTS
});

export const clearFilter = () => ({
    type: CLEAR_FILTER
});

export const filterByProperty = (data) => ({
    type: FILTER_POSTS_BY_PROPERTY,
    payload: data,
});

export const requestPost = () => ({
    type: FETCH_POST_REQUEST
});

export const receivePost = (json) => ({
    type: FETCH_POST_SUCCESS,
    post: json,
});

export const requestPosts = () => ({
    type: FETCH_POSTS_REQUEST
});

export const receivePosts = (json) => ({
    type: FETCH_POSTS_SUCCESS,
    posts: json,
});

export function fetchPosts() {

    return function (dispatch) {

        // dispatch an action creator to say we have began to fetch pens
        dispatch(requestPosts());

        // lets now send async call to get some data
        axios.get('https://gist.githubusercontent.com/onefastsnail/3b69a4844622879dcedd68858644db7b/raw/82a9e8b8ab10509dc60056b683068654e13045a9/pens.json', {
            params: {}
        })
            .then(function (response) {
                //once we have some data lets dispatch another redux event for our reducers to update state
                setTimeout(() => {
                    dispatch(receivePosts(response.data));
                }, 1000);
            })
            .catch(function (error) {
                //console.log(error);
            });

    };
}

/*
    Our initial state of our store
*/
export const initialState = {
    posts: [],

    users: [],
    usersSelected: [],

    types: [],
    typesSelected: [],

    query: '',
    sortBy: 'newest',

    end: 16,
    perPage: 16,

    loading: true
};

/*
    Our reducer
*/
export default function reducer(state = initialState, action) {

    switch (action.type) {

        case FETCH_POSTS_REQUEST: {
            const y = Object.assign({}, state);
            y.loading = true;
            return y;
        }

        case FETCH_POSTS_SUCCESS: {
            const y = Object.assign({}, state);

            // now lets assign some properties to our fresh new to be state object
            y.posts = action.posts;

            // todo: evalaute this location
            // lets now populate our filter dropdown values
            y.users = y.posts.reduce((users, item) => {

                // lets save our types
                if (users.indexOf(item.user) == -1) {
                    users.push(item.user);
                }

                return users;

            }, []).sort();

            // lets now populate our filter dropdown values
            y.types = y.posts.reduce((types, item) => {

                // lets save our types
                if (types.indexOf(item.type) == -1) {
                    types.push(item.type);
                }

                return types;

            }, []).sort();

            y.loading = false;

            return y;
        }

        case SHOW_MORE_POSTS: {

            const y = Object.assign({}, state);
            y.end += y.perPage; //increment our per ending value

            return y; //and return
        }

        case FILTER_POSTS_BY_PROPERTY: {

            const y = Object.assign({}, state);

            // lets create a copy to mutate
            let x = [...y[action.payload.key]];

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

        case SEARCH_POSTS: {

            const y = Object.assign({}, state);

            y.query = action.query;

            return y;
        }

        case CLEAR_FILTER: {

            const y = Object.assign({}, state);

            y.query = '';
            y.typesSelected = [];
            y.usersSelected = [];
            y.end = y.perPage;

            return y;
        }

        case FETCH_POST_SUCCESS: {

            const y = Object.assign({}, state);

            y.post = action.post;

            return y;

        }

        default:
            return state;
    }
}

/*
    Lets make some selectors to return state only, as in the future we could use memoize to make faster etc
*/
export const filterPosts = state => {

    // create a new copy of posts to mutate
    let posts = [...state.posts];

    if (state.query != '') {
        posts = posts.filter(item => {
            if (item.title.toLowerCase().indexOf(state.query.toLowerCase()) > -1) {
                return item;
            }
        });
    }

    if (state.usersSelected.length > 0) {
        posts = posts.filter(item => {
            if (state.usersSelected.indexOf(item.user) > -1) {
                return item;
            }
        });
    }

    if (state.typesSelected.length > 0) {
        posts = posts.filter(item => {
            if (state.typesSelected.indexOf(item.type) > -1) {
                return item;
            }
        });
    }

    return posts;

};
