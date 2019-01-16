import axios from "axios";
import { setErrorState } from "./error";
import {
  BF_SOLUNAR_API,
  BFR_API,
  BFR_API_KEY,
  BFR_REQUEST_KEY
} from "../constants/BassForecastInfo";

export const setCurrentCityForecast = info => ({
  type: "SET_CITY_FORECAST",
  info
});

export const setCurrentCityBFR = info => ({
  type: "SET_CITY_BFR",
  info
});

export const fetchSelectedCityForecast = ({
  lat,
  lng,
  tz,
  day,
  month,
  year
}) => {
  return dispatch => {
    return axios({
      method: "get",
      params: { lat, lng, tz, day, month, year },
      url: BF_SOLUNAR_API
    })
      .then(res => {
        dispatch(setCurrentCityForecast(res.data.output));
      })
      .catch(e => {
        console.log("Fetching selected city forecast failed with an error", e);
        dispatch(
          setErrorState({
            isOpen: true,
            errorMessage:
              "Fetching selected city forecast failed with an error",
            error: e.message,
            errorType: "Blocker"
          })
        );
      });
  }
}

export const fetchBFR = (postalCode, locationKey, stationCode) => {
  return dispatch => {
    return axios({
      method: "get",
      params: {
        postalCode: postalCode ? parseInt(postalCode) : null,
        locationKey: parseInt(locationKey),
        stationCode: stationCode
      },
      headers: {
        "x-api-key": BFR_API_KEY,
        "Content-Type": "application/json",
        "x-request-key": BFR_REQUEST_KEY
      },
      url: BFR_API
    })
    .then(res => {
      dispatch(setCurrentCityBFR(res.data.bfrDetails[0]));
    })
    .catch(e => {
      console.log("Fetching BassForecast Rating has failed with an error", e);
      dispatch(
        setErrorState({
          isOpen: true,
          errorMessage:
            "Fetching BassForecast Rating has failed with an error",
          error: e.message,
          errorType: "BFR"
        })
      );
    });
  }
}
