import { combineReducers } from 'redux';
import EditorReducer  from './EditorReducer';

export default combineReducers({
	editor : EditorReducer
});