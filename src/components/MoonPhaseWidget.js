import React from "react";

const MoonPhaseWidget = (props) => {

    const getDescription = () => {
        switch ( props.phaseOfMoon ){
            case "newmoon" : 
                return "New Moon";
            case "waxingCrescent" : 
                return "Waxing Crescent";
            case "firstQuarter" : 
                return "First Quarter";
            case "waxingGibbous" : 
                return "Waxing Gibbous";
            case "fullmoon" : 
                return "Full Moon";
            case "waningGibbous" :
                return "Waning Gibbous";
            case "lastQuarter":
                return "Last Quarter"
            default:
                return "Waning Crescent"                       
        }
    }

    const getIconName = () => {
        switch (props.phaseOfMoon){
            case "newmoon" : 
                return "NewMoon";
            case "waxingCrescent" : 
                if (props.percentage > 0 && props.percentage <= 12) {
                    return "WaxingCrescent1";
                } else if (props.percentage > 12 && props.percentage <= 24) {
                    return "WaxingCrescent2";
                } else if (props.percentage > 24 && props.percentage <= 36) {
                    return "WaxingCrescent3";
                } else {
                    return "WaxingCrescent4";
                }
            case "firstQuarter" : 
                return "FirstQuarter";
            case "waxingGibbous" : 
                if (props.percentage > 50 && props.percentage <= 62) {
                    return "WaxingGibbous1"
                } else if (props.percentage > 62 && props.percentage <= 74) {
                    return "WaxingGibbous2"
                } else if (props.percentage > 74 && props.percentage <= 86) {
                    return "WaxingGibbous3"
                } else {
                    return "WaxingGibbous4"
                }
            case "fullmoon" : 
                return "FullMoon";
            case "waningGibbous" :
                if (props.percentage >= 86 && props.percentage < 100) {
                    return "WaningGibbous1"
                } else if (props.percentage >= 74 && props.percentage < 86) {
                    return "WaningGibbous2"
                } else if (props.percentage >= 62 && props.percentage < 74) {
                    return "WaningGibbous3"
                } else {
                    return "WaningGibbous4"
                }
            case "lastQuarter":
                return "LastQuarter";
            default:
                if (props.percentage >= 36 && props.percentage < 50) {
                    return "WaningCrescent1"
                } else if (props.percentage >= 24 && props.percentage < 36) {
                    return "WaningCrescent2"
                } else if (props.percentage >= 12 && props.percentage < 24) {
                    return "WaningCrescent3"
                } else {
                    return "WaningCrescent4"
                }                    
        }
    }

    const iconName = getIconName();

    return(
        <div className="moonphase__container">
            <div className="moonphase__content">
                <div className="heading">MOON PHASE</div>
                <div className="moonphase__rating row">
                    <div className="moonphase__img-container">
                        <img
                            src={`/images/MoonPhases/${iconName}/phase.png`} 
                            srcSet={`/images/MoonPhases/${iconName}/phase.png 1x, /images/MoonPhases/${iconName}/phase@2x.png 2x, /images/MoonPhases/${iconName}/phase@3x.png 3x`}
                        />
                    </div>
                    <div className="moonphase__rating-content">
                        <div className="percentage">{`${props.percentage}%`}</div>
                        <div className="text">{getDescription()}</div>
                    </div>
                </div>
            </div>
            <img 
                src="/images/MoonPhase-BG/moon-phase-bg.png" 
                srcSet="/images/MoonPhase-BG/moon-phase-bg.png 1x, /images/MoonPhase-BG/moon-phase-bg@2x.png 2x, /images/MoonPhase-BG/moon-phase-bg@3x.png 3x"
                className="moonphase__bg"
            />
        </div>
    );
}
export default MoonPhaseWidget;
