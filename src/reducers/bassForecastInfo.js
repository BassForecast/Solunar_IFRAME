const bfInfo = {
    currentForecast: {
        majorTimes : [
            ["4:00pm","6:00pm"],
            ["4:00am","6:00am"]
        ],
        minorTimes : [
            ["12:00am","1:00am"],
            ["12:00pm","1:00pm"] 
        ],
        moonrise: "10:00am",
        moonset: "8:00pm",
        sunrise: "6:00am",
        sunset: "6:00pm",
        isDefault: true
    },
    currentBFR: {
        rating : "--",
        text : "loading...",
        colourCode : "#8094aa"
    }
};


export default ( state = bfInfo, action ) => {

    switch( action.type ){

        case "SET_CITY_BFR" : {
            return { ...state, 
                    currentBFR: {
                        rating : action.info.bfr,
                        text : action.info.bfrText,
                        colourCode : action.info.bfrColourCode
                    }};
        }

        case "SET_CITY_FORECAST" : {
            return { ...state, 
                    currentForecast: {
                        sunrise : action.info.sunrise,
                        sunset : action.info.sunset,
                        moonrise : action.info.moonrise,
                        moonset : action.info.moonset,
                        majorTimes : [action.info.major1period.replace(/ /g,'').split("-"), action.info.major2period.replace(/ /g,'').split("-")],
                        minorTimes : [action.info.minor1period.replace(/ /g,'').split("-"), action.info.minor2period.replace(/ /g,'').split("-")],
                        isDefault : false
                    }};
        }
        
        default:
        return state;
        
    }      
};