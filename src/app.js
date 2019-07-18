import React from "react";
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from "react-dom";
import BassForecastApp from "./components/Template";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

ReactDOM.render(
    <Provider store = { store } >
        <BrowserRouter>
        <BassForecastApp/>
        </BrowserRouter>
        
    </Provider>, 
    document.getElementById( "root" ) 
);

