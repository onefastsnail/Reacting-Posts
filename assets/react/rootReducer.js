import {combineReducers} from 'redux';

// using our ducks approach lets import our reducer from that feature
import {reducer as posts} from './ducks/posts';

// now lets combine our reducers to a single entity
const rootReducer = combineReducers({
	posts
});

export default rootReducer;
