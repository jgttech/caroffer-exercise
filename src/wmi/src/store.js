import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as cars } from "./reducers/carsReducer/reducer";
import { reducer as search } from "./reducers/searchReducer/reducer";

const reducers = combineReducers({
    cars,
    search
});

export const store = process.env.NODE_ENV !== "development"
    ? createStore(reducers, applyMiddleware(thunk))
    : createStore(reducers, applyMiddleware(
        thunk,
        createLogger()
    ));