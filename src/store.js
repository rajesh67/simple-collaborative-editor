import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from "redux-saga";

import rootReducer from './reducers';

const initialState = {};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const middleware = [thunk];

const store = createStore(
	rootReducer, 
	initialState,
	compose(
		applyMiddleware(...middleware),
		// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);


// run the saga
// sagaMiddleware.run(editorSagas);


export default store;