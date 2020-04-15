import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga'
import rootReducer from "./reducers";
import countriesSaga from "./sagas/country";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
export default createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

// then run the saga
sagaMiddleware.run(countriesSaga);
