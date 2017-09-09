import {combineReducers} from 'redux';
import posts from './posts.js';

// this helps split our reducing functions into separate functions, each managing independent parts/branches of the state.
// use a nice name as we use this reference in our mapStateToProps calls
const rootReducer = combineReducers({
	posts
});

export default rootReducer;
