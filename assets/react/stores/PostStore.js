var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var PostActions = require('../actions/PostActions');

var CHANGE_EVENT = 'change'; //what event triggers our listening components to REACT!

//lets store
var _store = {
    list: [],
    filtered: [],
    paginated: [],

    query:'',
    sortBy: 'newest',

    start: 0,
    end: 6,
    perPage: 6,

    infiniteScroll: false
};

//private methods, here we will filter the data and emit the change back to the components, in this case new posts list
var filterPosts = function(filter) {

    _store.filtered = _store.list; //make us a fresh array to filter our posts

    //if we have a query
    if(_store.query != ''){
        _store.filtered = _store.filtered.filter(function (el) {
            if (el.post_title.toLowerCase().indexOf(_store.query.toLowerCase()) > -1) {
                return el;
            }
        });
    }

    //lets do some sorting!
    if (_store.sortBy === 'newest') {
        _store.filtered.sort(function(x, y) {
            return new Date(y.post_date) - new Date(x.post_date);
        });
    }

    //let sort alphabetically
    if (_store.sortBy === 'alphabetically') {
        _store.filtered.sort(function(x, y) {
            if (x.post_title.toLowerCase() < y.post_title.toLowerCase()) return -1;
            if (x.post_title.toLowerCase() > y.post_title.toLowerCase()) return 1;
            return 0;
        });
    }

    //now lets paginate
    _store.paginated = _store.filtered.slice(_store.start, _store.end);

    PostStore.emit(CHANGE_EVENT); //emit change to the listeners to get components to update thier own states and REACT!

    return true;
};

//the object we will return, a super object merging with the EventEmitter object, so we can use methods such as addChangeListener
var PostStore = objectAssign({}, EventEmitter.prototype, {

    //add a change event listener to the store, so when it changes, call the callback
    addChangeListener: function(cb) {
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    },

    //set posts to local store vars
    setPosts: function(data) {
        _store.list = data;
        _store.filtered = _store.list;

        filterPosts();
    },

    //get posts
    getPosts: function() {

        //if the list is empty lets get it from the api, store it, and use this from now on
        if(_store.list.length == 0){
            PostActions.getPosts();
        }

        return _store.filtered;
    },
    setFilter: function(obj){
        if(typeof obj === 'object'){
            for(var i in obj){
               _store[i] = obj[i];
            }
        }

        filterPosts();

        return _store;
    },
    getFilter: function(){
        PostStore.getPosts();
        return _store;
    }
});

//here we register our listeners to the dispatcher, so when we get an event, capture its payload, and do something with it
AppDispatcher.register(function(payload) {
    var action = payload.action;

    //based upon the action type lets do different things
    switch (action.actionType) {
        case appConstants.POSTS_FILTER_POSTS:
            PostStore.setFilter(action.data);
            break;
        case appConstants.POSTS_SET_POSTS:
            PostStore.setPosts(action.data);
            break;
        default:
            return true;
    }
});

module.exports = PostStore;