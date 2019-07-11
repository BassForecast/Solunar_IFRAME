import React from "react";

const SolarLunarWidget = (props) => {

    const sunRise = (props.sunrise && props.sunrise.match(/[a-zA-Z]+|[0-9]+/g)) || ["--","--","--"];
    const sunSet = (props.sunset && props.sunset.match(/[a-zA-Z]+|[0-9]+/g)) || ["--","--","--"];

    const moonRise = (props.moonrise && props.moonrise.match(/[a-zA-Z]+|[0-9]+/g)) || ["--","--","--"];
    const moonSet = (props.moonset && props.moonset.match(/[a-zA-Z]+|[0-9]+/g)) || ["--","--","--"];

    return( 
        <div className="row justify-content-center solarlunar__container">
            <div className="sun col">
                <div className="sunrise">
                    <img 
                        src="/images/Sunrise/sunrise.png" 
                        srcSet="/images/Sunrise/sunrise.png 1x, /images/Sunrise/sunrise@2x.png 2x, /images/Sunrise/sunrise@3x.png 3x"
                    />
                    <span>Sunrise</span>
                </div>
                <div className="time">{`${sunRise[0].length === 1 ? `0${sunRise[0]}` : sunRise[0]}:${sunRise[1]} ${sunRise[2]}`}</div>
                <div className="sunset">
                    <img
                        src="/images/Sunset/sunset.png" 
                        srcSet="/images/Sunset/sunset.png 1x, /images/Sunset/sunset@2x.png 2x, /images/Sunset/sunset@3x.png 3x"
                    />
                    <span>Sunset</span>
                </div>
                <div className="time last">{`${sunSet[0].length === 1 ? `0${sunSet[0]}` : sunSet[0]}:${sunSet[1]} ${sunSet[2]}`}</div>    
            </div>
    
            <div className="moon col">
                <div className="moonrise">
                    <img
                        src="/images/Moonrise/moonrise.png" 
                        srcSet="/images/Moonrise/moonrise.png 1x, /images/Moonrise/moonrise@2x.png 2x, /images/Moonrise/moonrise@3x.png 3x"
                    />
                    <span>Moonrise</span>
                </div>
                <div className="time">{`${moonRise[0].length === 1 ? `0${moonRise[0]}` : moonRise[0]}:${moonRise[1]} ${moonRise[2]}`}</div>
                <div className="moonset">
                    <img
                        src="/images/Moonset/moonset.png" 
                        srcSet="/images/Moonset/moonset.png 1x, /images/Moonset/moonset@2x.png 2x, /images/Moonset/moonset@3x.png 3x"
                    />
                    <span>Moonset</span>
                </div>
                <div className="time last">{`${moonSet[0].length === 1 ? `0${moonSet[0]}` : moonSet[0]}:${moonSet[1]} ${moonSet[2]}`}</div>
            </div>
        </div> 
    );
};
export default SolarLunarWidget;
