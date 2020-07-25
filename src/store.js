import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createRootReducer from './reducer';

import { routerMiddleware } from "react-router-redux";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const routerMidware = routerMiddleware(history);

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(routerMidware);
    } else {
        // Enable additional logging in non-production environments.
        return applyMiddleware(routerMidware, createLogger())
    }
};

export const store = createStore(
    createRootReducer(history), composeWithDevTools(getMiddleware()));
