const cities = {
    currentCity : {
        name: "Dallas",
        state: "Texas",
        country: "United States",
        key: "351194",
        timeZoneName: "America/Chicago"
    },
    listOfCities : []
}

export default ( state = cities, action ) => {

    switch( action.type ){

        case "SET_CITIES" : {
            return { ...state, listOfCities : action.cities };
        }

        case "SET_CURRENT_CITY" : {
            return { ...state, currentCity : action.city };
        }

        case "UPDATE_CURRENT_CITY_TZ" : {
            return { ...state, currentCity : {...state.currentCity, timeZoneName : action.timeZoneName } };
        }
        
        default:
        return state;
        
    }      
};