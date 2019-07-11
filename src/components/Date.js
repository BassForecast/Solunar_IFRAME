import React from "react";
const Date = (props) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return(
        <div className={`date ${props.active ? "active" : ""}`} index={props.index} onClick={props.onClick}>
            <div className={`date__day ${props.date.getDate() === 1 ? "month" : ""}`}>{
                props.date && (props.date.getDate() === 1 ? months[props.date.getMonth()] : days[props.date.getDay()])
            }</div>
            <div className="date__date">{props.date && props.date.getDate()}</div>
        </div> 
    );
}
export default Date;
