import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import citiesReducer from "../reducers/cities";
import bassForecastReducer from "../reducers/bassForecastInfo";
import moonPhaseReducer from "../reducers/moonPhase";
import errorReducer from "../reducers/error";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default() => {

    const store = createStore( 
        combineReducers({
            citiesInfo : citiesReducer,
            bfInfo : bassForecastReducer,
            moonPhase : moonPhaseReducer,
            errorModal : errorReducer
        }),
        composeEnhancers( applyMiddleware( thunk ))
    );
    
    return store;
};