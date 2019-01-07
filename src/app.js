import React from "react";
import ReactDOM from "react-dom";
import BassForecastApp from "./components/Template";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

ReactDOM.render(
    <Provider store = { store } >
        <BassForecastApp/>
    </Provider>, 
    document.getElementById( "root" ) 
);

