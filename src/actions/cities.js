import axios from "axios";
import { fetchSelectedCityForecast, fetchBFR } from "./bassForecastInfo";
import { setErrorState } from "./error";
import { 
    AW_API_KEY, 
    AW_LOCATIONS_AUTOCOMPLETE_API,
    AW_LOCATIONS_POSTAL_CODE_API,
    AW_LOCATIONS_LOCATION_KEY_API
} from "../constants/AccuWeather";

export const setCities = ( cities = [] ) => ({
    type : "SET_CITIES",
    cities    
});

export const setCurrentCity = ( city ) => ({
    type : "SET_CURRENT_CITY",
    city    
});

export const updateTimeZoneOfCurrentCity = ( timeZoneName ) => ({
    type : "UPDATE_CURRENT_CITY_TZ",
    timeZoneName
});


export const fetchLocationsByInput = (input) => {
    return(dispatch) => {
        return axios({
            method: "get",
            params: {
                q : input,
                apiKey : AW_API_KEY,
                details : true
            },
            url: AW_LOCATIONS_AUTOCOMPLETE_API
        })
        .then(( res ) => {
            dispatch( setCities( res.data.map((city) => {
                return {
                    key : city.Key,
                    name : city.LocalizedName,
                    state : city.AdministrativeArea.LocalizedName,
                    country : city.Country.LocalizedName
                };
            })));
        })
        .catch(( e ) => {
            console.log( "Fetching locations has failed with an error ", e );
            dispatch(setErrorState({
                isOpen : true,
                errorMessage : "Fetching locations has failed with an error",
                error : e.message,
                errorType : "Blocker"
            }));
        });
    }
};

export const fetchLocationsByPostalCode = (postalCode) => {
    return(dispatch) => {
        return axios({
            method:"get",
            params: {
                q : postalCode,
                apiKey : AW_API_KEY,
                details : true
            },
            url: AW_LOCATIONS_POSTAL_CODE_API
        })
        .then(( res ) => {
            dispatch(setCities( res.data.map((city) => {
                return {
                    key : city.Key,
                    name : city.LocalizedName,
                    state : city.AdministrativeArea.LocalizedName,
                    country : city.Country.LocalizedName
                };
            })));
        })
        .catch(( e ) => {
            console.log( "Fetching locations has failed with an error ", e );
            dispatch(setErrorState({
                isOpen : true,
                errorMessage : "Fetching locations has failed with an error",
                error : e.message,
                errorType : "Blocker"
            }));
        });
    }
};

export const fetchSelectedCityInfo = (locationKey, selectedDate) => {
    return(dispatch) => {
        return axios({
            method:"get",
            params: {
                apiKey : AW_API_KEY,
                details : true
            },
            url:`${AW_LOCATIONS_LOCATION_KEY_API}${locationKey}.json`
        })
        .then(( res ) => {
            const today = new Date();

            dispatch(fetchSelectedCityForecast({
                lat: res.data.GeoPosition.Latitude,
                lng: res.data.GeoPosition.Longitude,
                tz: res.data.TimeZone.GmtOffset,
                day : selectedDate.getDate(),
                month : selectedDate.getMonth() + 1,
                year : selectedDate.getFullYear()
            }))
            .then(() => {
                if( today.getDate() === selectedDate.getDate() ){
                    dispatch(getStationCode(res.data.PrimaryPostalCode, locationKey, res.data.Country.ID));
                }
            })

            dispatch(updateTimeZoneOfCurrentCity(res.data.TimeZone.Name));
            //reset search bar dropdown
            dispatch( setCities([]));
        })
        .catch(( e ) => {
            console.log( "Fetching coordinates of a selected city failed with an error", e );
            dispatch(setErrorState({
                isOpen : true,
                errorMessage : "Fetching coordinates of a selected city failed with an error",
                error : e.message,
                errorType : "Blocker"
            }));
        });
    }
};

export const getStationCode = (postalCode, locationKey, countryID) => {
    return(dispatch, getState) => {
        //Only fetch BFR if we have a valid City Forecaset info
        if(!getState().bfInfo.currentForecast.isDefault){
            return axios({
                params: {
                    q : postalCode,
                    apiKey : AW_API_KEY,
                    details : true
                },
                url: AW_LOCATIONS_POSTAL_CODE_API
            })
            .then(( res ) => {
                const result = res.data.find((item) => {
                    return item.Country.ID === countryID;
                });
                dispatch(fetchBFR(postalCode, locationKey, result.Details.StationCode));
            })
            .catch(( e ) => {
                //pass null for station code in case when it's not available
                dispatch(fetchBFR(postalCode, locationKey, null));
            });
        }
    }
}
