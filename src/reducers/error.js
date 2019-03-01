const errorState = {
    isOpen : false,
    errorMessage : "",
    error : "",
    errorType : ""
}

export default ( state = errorState, action ) => {

    switch( action.type ){

        case "SET_ERROR_STATE" : {
            return action.errorObj;
        }

        case "CLOSE_MODAL" : {
            return errorState;
        }
        
        default:
        return state;
        
    }      
};