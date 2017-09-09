import axios from 'axios';
import * as types from './types';

/*
    an action creater, it creates an action payload that can be dispatched
    dispatching actions are the only way to get data into the store, as reducers create new state from those payloads
*/
export function searchPosts(query) {
    // in es6 properties being passed without assignment will be assigned to by thier var name in this content, kind of like compact in php
    return { type: types.SEARCH_POSTS, query };
}

export const showMorePosts = () => ({
    type: types.SHOW_MORE_POSTS
});

export const clearFilter = () => ({
    type: types.CLEAR_FILTER
});

export const requestPosts = () => ({
    type: types.FETCH_POSTS_REQUEST
});

export const filterByType = (data) => ({
    type: types.FILTER_POSTS_BY_TYPE,
    payload: data,
});

export const receivePosts = (json) => ({
    type: types.FETCH_POSTS_SUCCESS,
    posts: json,
});

export const requestPost = () => ({
    type: types.FETCH_POST_REQUEST
});


export const receivePost = (json) => ({
    type: types.FETCH_POST_SUCCESS,
    post: json,
});

export function fetchPosts() {

    // as action creators should return functions, we use Thunks middleware to allow our dispatch method to be fed to our invoked functions
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function (dispatch) {

        // dispatch an action creator to say we have began to fetch pens
        dispatch(requestPosts());

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        // lets now send async call to get some data
        axios.get('assets/api/pens.json', {
            params: {}
        })
        .then(function (response) {
            //once we have some data lets dispatch another redux event for our reducers to update state
            dispatch(receivePosts(response.data));
        })
        .catch(function (error) {
            //console.log(error);
        });

    };
}
