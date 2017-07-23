import AppDispatcher from '../dispatcher/AppDispatcher';
import appConstants from '../constants/appConstants';
import objectAssign from 'object-assign';
import EventEmitter from 'events';
import PostActions from '../actions/PostActions';

import lodashIntersection from 'lodash/intersection';
import lodashUnion from 'lodash/union';
import lodashSortBy from 'lodash/sortBy';

import { enumerateDaysBetweenDates } from '../Em';

var CHANGE_EVENT = 'change'; //what event triggers our listening components to REACT!

//lets store
var _store = {
    list: [],
    filtered: [],
    paginated: [],
    categories: [],

    themes: [],

    languages: [],
    languagesSelected: [],

    themes: [],
    themesSelected: [],

    types: [],
    typesSelected: [],

    days: [],
    daysSelected: [],

    whoFor: ['Accessible For All', 'Children', 'Free of Entry', 'Invitation Only'],
    whoForSelected: [],

    showMainEvents: false,

    query:'',
    sortBy: 'newest',

    start: 0,
    end: 16,
    perPage: 16
};

//private methods, here we will filter the data and emit the change back to the components, in this case new posts list
var filterPosts = function(filter) {

    //maybe use a bootup boolean to skip some tasks below as its executed depend upon events from the filter

    _store.filtered = _store.list; //make us a fresh array to filter our posts

    //if we have a query
    if(_store.query != ''){
        _store.filtered = _store.filtered.filter(function (item) {
            if (item.title.toLowerCase().indexOf(_store.query.toLowerCase()) > -1) {
                return item;
            }
        });
    }

    //if we have showMainEvents set to true
    if(_store.showMainEvents){
        //lets filter our set
        _store.filtered = _store.filtered.filter(function (item) {

            if (item.is_main_event) {
                return item;
            }
        });
    }

    //if we have a language selected
    if(_store.languagesSelected.length > 0){
        //lets filter our set
        _store.filtered = _store.filtered.filter(function (item) {

            var matches = lodashIntersection(item.hdw_event_language, _store.languagesSelected);

            if (matches.length > 0) {
                return item;
            }
        });
    }

    //if we have themes selected
    if(_store.themesSelected.length > 0){
        //lets filter our set
        _store.filtered = _store.filtered.filter(function (item) {

            var matches = lodashIntersection(item.hdw_event_theme, _store.themesSelected);

            if (matches.length > 0) {
                return item;
            }
        });
    }

    //if we have types selected
    if(_store.typesSelected.length > 0){
        //lets filter our set
        _store.filtered = _store.filtered.filter(function (item) {

            if (_store.typesSelected.indexOf(item.hdw_event_primary_type) > -1) {
                return item;
            }
        });
    }

    //if we have selected days
    if(_store.daysSelected.length > 0){

        //the date logic from ACF is funky, so this is a workaround at this side and the API point
        _store.filtered = _store.filtered.filter(function (item) {

            //if the days selected find matches in our general days array
            var matches = lodashIntersection(item.general_event_dates, _store.daysSelected);

            if (matches.length > 0) {
                return item;
            }

        });
    }

    //if we have who for selected
    if(_store.whoForSelected.length > 0){
        //lets filter our set
        _store.filtered = _store.filtered.filter(function (item) {

            //lets check what who for option has been selected
            if(_store.whoForSelected.indexOf('Children') > -1){

                //check if children is in pick primary type
                if (item.hdw_event_primary_type.indexOf('Children') > -1) {
                    return item;
                }

            }

            //lets check what who for option has been selected
            if(_store.whoForSelected.indexOf('Free of Entry') > -1){

                //check if free admission has been selected
                if (item.hdw_event_form.indexOf('Free Admission') > -1) {
                    return item;
                }

            }

            //lets check what who for option has been selected
            if(_store.whoForSelected.indexOf('Accessible For All') > -1){

                //check if event is accessible for all
                if (item.hdw_event_accessible == 'Yes') {
                    return item;
                }

            }

            //lets check what who for option has been selected
            if(_store.whoForSelected.indexOf('Invitation Only') > -1){

                //check if invitation only when value is set to no
                if (item.hdw_event_accessible == 'No') {
                    return item;
                }

            }

        });
    }

    //empty our themes as the store criteria has changed
    _store.themes = [];

    //now we have filtered list, lets get us some meta
    _store.list.map(function(item, i){

        _store.days = lodashUnion(_store.days, item.general_event_dates);

        //lets save our languages
        _store.languages = _store.languages.concat(item.hdw_event_language);

        //lets save our themes
        _store.themes = _store.themes.concat(item.hdw_event_theme);

        //lets save our types
        _store.types.push(item.hdw_event_primary_type);

    });

    _store.days.sort(function(x,y) {
        x = x.split('/').reverse().join('');
        y = y.split('/').reverse().join('');
        return x > y ? 1 : x < y ? -1 : 0;
    });

    //now lets make unique and sort
    _store.languages = _store.languages.filter(function (item, pos) {return _store.languages.indexOf(item) == pos});
    _store.languages.sort();


    _store.themes = _store.themes.filter(function (item, pos) {return _store.themes.indexOf(item) == pos});
    _store.themes.sort();

    _store.types = _store.types.filter(function (item, pos) {return _store.types.indexOf(item) == pos});
    _store.types.sort();

    //lets do some sorting!
    if (_store.sortBy === 'newest') {
        _store.filtered = lodashSortBy(_store.filtered, [function(o) { return o.hdw_event_dates[0].starts; }]);
    }

    //let sort alphabetically
    // if (_store.sortBy === 'alphabetically') {
    //     _store.filtered.sort(function(x, y) {
    //         if (x.title.toLowerCase() < y.title.toLowerCase()) return -1;
    //         if (x.title.toLowerCase() > y.title.toLowerCase()) return 1;
    //         return 0;
    //     });
    // }

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

        //ensure we have an object
        if(typeof obj === 'object'){

            //lets loop the properties so could set multiple properies
            for(var i in obj){

               //lets look out for arrays, for example a toggle feature
               if (_store[i].constructor === Array) {

                    //if this element in that array
                    var index = _store[i].indexOf(obj[i]);

                    //if we have no index lets add, else remove
                    if (index == -1) {
                        _store[i].push(obj[i]);
                    } else {
                        _store[i].splice(index, 1);
                    }

               } else {
                   _store[i] = obj[i];
               }

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