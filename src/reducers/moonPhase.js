const moonphase = {
    percentage : 0.0,
    phaseOfMoon : "newmoon"
}

export default ( state = moonphase, action ) => {

    switch( action.type ){

        case "SET_MOONPHASE" : {
            return action.info;
        }
        
        default:
        return state;
        
    }      
};