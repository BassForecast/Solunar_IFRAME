import React from "react";

const FeedingTimeWidget = (props) => {

    const majorTime1StartTime = props.majorTimes[0][0].match(/[a-zA-Z]+|[0-9]+/g);
    const majorTime1EndTime = props.majorTimes[0][1].match(/[a-zA-Z]+|[0-9]+/g);

    const majorTime2StartTime = props.majorTimes[1][0].match(/[a-zA-Z]+|[0-9]+/g);
    const majorTime2EndTime = props.majorTimes[1][1].match(/[a-zA-Z]+|[0-9]+/g);

    const minorTime1StartTime = props.minorTimes[0][0].match(/[a-zA-Z]+|[0-9]+/g);
    const minorTime1EndTime = props.minorTimes[0][1].match(/[a-zA-Z]+|[0-9]+/g);

    const minorTime2StartTime = props.minorTimes[1][0].match(/[a-zA-Z]+|[0-9]+/g);
    const minorTime2EndTime = props.minorTimes[1][1].match(/[a-zA-Z]+|[0-9]+/g);

    return(
        <div className="widget__container">
                <div className="widget__heading major">
                    BassForecast Major Feeding Time
                </div>
                <div className="widget__ruler major"/>
                <div className="row widget__time-row justify-content-between">
                    <div className="widget__time-box">
                        <div className="widget__time">
                            <div className="time">{`${majorTime1StartTime[0]}:${majorTime1StartTime[1]}`}</div>
                            <div className="text">{majorTime1StartTime[2]}</div>
                        </div>

                        <div className="widget__time ruler"/>

                        <div className="widget__time">
                            <div className="time">{`${majorTime1EndTime[0]}:${majorTime1EndTime[1]}`}</div>
                            <div className="text">{majorTime1EndTime[2]}</div>
                        </div>
                    </div>
                    <div className="widget__time-box">
                        <div className="widget__time">
                            <div className="time">{`${majorTime2StartTime[0]}:${majorTime2StartTime[1]}`}</div>
                            <div className="text">{majorTime2StartTime[2]}</div>
                        </div>

                        <div className="widget__time ruler"/>

                        <div className="widget__time">
                            <div className="time">{`${majorTime2EndTime[0]}:${majorTime2EndTime[1]}`}</div>
                            <div className="text">{majorTime2EndTime[2]}</div>
                        </div>
                    </div>
                </div>
                
                <div className="widget__divider"/>

                <div className="widget__heading minor">
                    BassForecast Minor Feeding Time
                </div>
                <div className="widget__ruler minor"/>
                <div className="row widget__time-row justify-content-between">
                <div className="widget__time-box">
                    <div className="widget__time">
                            <div className="time">{`${minorTime1StartTime[0]}:${minorTime1StartTime[1]}`}</div>
                            <div className="text">{minorTime1StartTime[2]}</div>
                        </div>

                        <div className="widget__time ruler"/>

                        <div className="widget__time">
                            <div className="time">{`${minorTime1EndTime[0]}:${minorTime1EndTime[1]}`}</div>
                            <div className="text">{minorTime1EndTime[2]}</div>
                        </div>
                    </div>
                    <div className="widget__time-box">
                        <div className="widget__time">
                            <div className="time">{`${minorTime2StartTime[0]}:${minorTime2StartTime[1]}`}</div>
                            <div className="text">{minorTime2StartTime[2]}</div>
                        </div>

                        <div className="widget__time ruler"/>

                        <div className="widget__time">
                            <div className="time">{`${minorTime2EndTime[0]}:${minorTime2EndTime[1]}`}</div>
                            <div className="text">{minorTime2EndTime[2]}</div>
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default FeedingTimeWidget;
