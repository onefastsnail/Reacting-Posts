import {combineReducers} from 'redux';

// using our ducks approach lets import our reducer from that feature
import postsList from './ducks/postsList';

// now lets combine our reducers to a single entity
const rootReducer = combineReducers({
	postsList
});

export default rootReducer;
