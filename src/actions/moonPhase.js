
export const setMoonPhase = ( info ) => ({
    type : "SET_MOONPHASE",
    info    
});

export const setCurrentMoonPhase = (selectedDate) => {
    return(dispatch) => {
        let c = 0, 
        e = 0,
        julianDate = 0;
        let day = selectedDate.getDate(),
        month = selectedDate.getMonth() + 1,
        year = selectedDate.getFullYear();

        if (month < 3) {
            year--;
            month += 12;
        }

        ++month;

        c = 365.25 * year;
        e = 30.6 * month;
        julianDate = c + e + day - 694038.49;
        julianDate /= 29.5305882;
        julianDate = julianDate % 1;

        const percentage = julianDate * 100;
        
        const percentPerDay = 100/29.5305882;
        let moonphasePercentage = 0.0;
        let phaseOfMoon = "newmoon";

        if( percentage >= 0 && (percentage - percentPerDay) <= 0 ){
            moonphasePercentage = 0.0;
            phaseOfMoon = "newmoon";
        } else if (percentage > 0 && percentage < 25){
            moonphasePercentage = percentage * 2;
            phaseOfMoon = "waxingCrescent";
        } else if (percentage >= 25 && (percentage - percentPerDay) <= 25){
            moonphasePercentage = percentage * 2;
            phaseOfMoon = "firstQuarter";
        } else if (percentage > 25 && percentage < 50){
            moonphasePercentage = percentage * 2;
            phaseOfMoon = "waxingGibbous";
        } else if (percentage >= 50 && (percentage - percentPerDay) <= 50){
            moonphasePercentage = 100.0;
            phaseOfMoon = "fullmoon";
        } else if(percentage > 50 && percentage < 75){
            moonphasePercentage = 100 - ((percentage * 2) - 100.0);
            phaseOfMoon = "waningGibbous";
        } else if(percentage >= 75 && (percentage - percentPerDay) <= 75) {
            moonphasePercentage = 100 - ((percentage * 2) - 100.0);
            phaseOfMoon = "lastQuarter";
        } else {
            moonphasePercentage = 100 - ((percentage * 2) - 100.0);
            phaseOfMoon = "waningCrescent";
        }

        dispatch(setMoonPhase({
            percentage : Math.round(moonphasePercentage),
            phaseOfMoon
        }));

    }
}