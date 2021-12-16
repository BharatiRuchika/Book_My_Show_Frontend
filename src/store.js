import {createStore,applyMiddleware} from "redux";
import reducer from "./Reducer/reducer";
import { createLogger } from "redux-logger";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reduxPromiseMiddleware from 'redux-promise-middleware';
const middleware = applyMiddleware(reduxPromiseMiddleware, thunk, logger);
export default createStore(reducer, middleware);