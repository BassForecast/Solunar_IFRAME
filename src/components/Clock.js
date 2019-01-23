import React from "react";

class ClockComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            overlayHeight : "290px"
        }
    }

    componentDidMount() {

        this.updateOverlayHeight();
        window.addEventListener("resize", this.updateOverlayHeight.bind(this));

        this.canvasContext = this.refs.canvas.getContext("2d");
        this.centerX = Math.floor(this.refs.canvas.width/ 2);
        this.centerY = Math.floor(this.refs.canvas.height/ 2);
        this.radius = Math.floor((this.refs.canvas.width - 40)/ 2);
        this.benchMarks = ["12 AM", "6 AM", "12 PM", "6 PM"];
        this.updateCanvas(false, this.props.isToday);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateOverlayHeight.bind(this));
    }

    componentDidUpdate(prevProps) {
        if( this.props !== prevProps ){
            this.updateCanvas(true, this.props.isToday);
        }
    }

    updateOverlayHeight(){
        this.setState({
            overlayHeight : this.refs.canvas.offsetWidth
        });
    }

    getCurrentTime(){
        const timeZoneName = this.props.currentCityTz; 
        const today = new Date(new Date().toLocaleString("en-US",{timeZone: timeZoneName}));
        let hours = today.getHours();
        let minutes = today.getMinutes();
        const meridian = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        return hours + ':' + minutes + meridian;
    }

    updateCanvas(onUpdate, isToday) {
        this.canvasContext.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
        this.canvasContext.beginPath();

        this.drawOuterCircle();
        this.fillClockRimColor();
        this.setMinorGradient();
        this.setMajorGradient();

        this.benchMarks.forEach((time) =>{
            this.drawClockPointer("#7d818c", time, (onUpdate? 30 : 0));
        });

        this.drawArc(this.props.sunrise, this.props.sunset, "#ffc657");
        this.drawArc(this.props.sunset, this.props.sunrise, "#8094aa");

        this.drawInnerCircle(isToday);

        this.setIconsBasedOnTime(this.props.sunrise, "SunriseClock");
        this.setIconsBasedOnTime(this.props.sunset, "SunsetClock");
        this.setIconsBasedOnTime(this.props.moonrise, "MoonriseClock");
        this.setIconsBasedOnTime(this.props.moonset, "MoonsetClock");
        if(this.props.currentCityTz){
            this.setIconsBasedOnTime(this.getCurrentTime(), "Currenttime");
        }
        this.canvasContext.closePath();
    }

    drawOuterCircle() {
        this.canvasContext.save();
            this.canvasContext.arc(this.centerX, this.centerY, this.radius + 20, 0, Math.PI * 2, false);
            this.canvasContext.clip();

            this.canvasContext.beginPath();
            this.canvasContext.lineWidth = 3;
            this.canvasContext.strokeStyle = "#fff";
            this.canvasContext.shadowColor = "black";
            this.canvasContext.shadowBlur = 15;
            this.canvasContext.shadowOffsetX = 0;
            this.canvasContext.shadowOffsetY = 0;      
            this.canvasContext.arc(this.centerX, this.centerY, this.radius + 2, 0, Math.PI * 2, false);
            this.canvasContext.stroke();
            this.canvasContext.closePath();
        this.canvasContext.restore();
    }

    setMinorGradient(){
        const minorColor = this.canvasContext.createRadialGradient(
            this.centerX, 
            this.centerY, 
            5, 
            this.centerX, 
            this.centerY, 
            this.centerX
        );
        minorColor.addColorStop(1,"#F7D18C");
        minorColor.addColorStop(0,"white");
        this.drawPie(this.props.minorTimes[0][0], this.props.minorTimes[0][1], minorColor); 
        this.drawPie(this.props.minorTimes[1][0], this.props.minorTimes[1][1], minorColor);
    }

    setMajorGradient() {
        const majorColor = this.canvasContext.createRadialGradient(
            this.centerX, 
            this.centerY, 
            5, 
            this.centerX, 
            this.centerY, 
            this.centerX
        );
        majorColor.addColorStop(1,"#5bf1d8");
        majorColor.addColorStop(0,"white");
        this.drawPie(this.props.majorTimes[0][0], this.props.majorTimes[0][1], majorColor); 
        this.drawPie(this.props.majorTimes[1][0], this.props.majorTimes[1][1], majorColor);
    }

    drawPie(startTime, endTime, color){
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.centerX,this.centerY);
        this.canvasContext.arc(
            this.centerX, 
            this.centerY, 
            this.radius, 
            this.timeToRadians(startTime), 
            this.timeToRadians(endTime)
        );
        this.canvasContext.fillStyle = color;
        this.canvasContext.fill();
        this.canvasContext.closePath();
    }

    drawArc(startAngle, endAngle, color){
        this.canvasContext.beginPath();
        this.canvasContext.arc(
            this.centerX, 
            this.centerY, 
            this.radius, 
            this.timeToRadians(startAngle), 
            this.timeToRadians(endAngle)
        );
        this.canvasContext.lineWidth = 10;
        this.canvasContext.strokeStyle = color;
        this.canvasContext.stroke();
        this.canvasContext.closePath();
    }

    fillClockRimColor(){
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.centerX, this.centerY);
        this.canvasContext.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
        this.canvasContext.fillStyle = "#fff";
        this.canvasContext.fill();
        this.canvasContext.closePath();
    }

    drawClockPointer(color, time, xAxisBuffer){
        const lineLength = 45;
        this.canvasContext.beginPath();
        this.canvasContext.font= "lighter 24px sans-serif";
        this.canvasContext.fillStyle = color;
        switch(time) {
            case "12 PM":
                this.canvasContext.moveTo(this.centerX, this.centerY - this.radius);
                this.canvasContext.lineTo(this.centerX, lineLength);
                this.canvasContext.fillText(time, this.centerX - 30 + xAxisBuffer, 70);
                break;
            case "12 AM":
                this.canvasContext.moveTo( this.centerX, this.centerY + this.radius);
                this.canvasContext.lineTo( this.centerX, (this.centerY * 2) - lineLength);
                this.canvasContext.fillText(time, this.centerX - 30 + xAxisBuffer, (this.centerY * 2) - 55);
                break;
            case "6 AM":
                this.canvasContext.moveTo(this.centerX - this.radius, this.centerY);
                this.canvasContext.lineTo(lineLength, this.centerY);
                this.canvasContext.fillText(time, 50 + xAxisBuffer, this.centerY + 7);
                break;
            default:
                this.canvasContext.moveTo( this.centerX + this.radius , this.centerY);
                this.canvasContext.lineTo((this.centerX * 2) - lineLength, this.centerY);
                this.canvasContext.fillText(time, (this.centerX * 2) - 105 + xAxisBuffer, this.centerY + 7);
        }
        this.canvasContext.lineWidth = 2;
        this.canvasContext.strokeStyle = color;
        this.canvasContext.stroke();
        this.canvasContext.closePath();
    }

    timeToRadians(time, isForIcon){
        const timeSplit = time.match(/[a-zA-Z]+|[0-9]+/g);
        if(timeSplit !== null){
            let hour = parseInt(timeSplit[0]),
            minutes = parseInt(timeSplit[1]),
            meridian = timeSplit[2];

            if( hour === 12 ){
                hour = meridian === "pm" ? 12 : 0;
            } else {
                hour = meridian === "pm" ? hour + 12 : hour;
            }               

            let totalMinutes = (hour * 60) + minutes,
                accumulatedValue = totalMinutes/1440,
                degrees = accumulatedValue * 360;
                degrees = isForIcon ? (degrees + 180) % 360 : (degrees + 90) % 360;

            return degrees * (Math.PI/180);
        }
    }

    setIconsBasedOnTime(time,iconFolder) {
        //Slightly lesser than canvas width as we want to have icon over the arc. Not inside or outside the arc. 
        const clockRadius = (this.refs.canvas.width)/2; 
        const iconDimension = iconFolder === "Currenttime" ? 36 : 42;
        const iconPosition = this.timeToRadians(time);
        //https://math.stackexchange.com/questions/475917/how-to-find-position-of-a-point-based-on-known-angle-radius-and-center-of-rotat
        const xCoord = this.centerX + ( clockRadius * Math.cos(iconPosition) );
        const yCoord = this.centerY + ( clockRadius * Math.sin(iconPosition) );

        const iconRotationAngle = this.timeToRadians(time, true);
        //https://math.stackexchange.com/questions/332743/calculating-the-coordinates-of-a-point-on-a-circles-circumference-from-the-radiu
        const xCoOrdOfIcon = -iconDimension/2 + ( -iconDimension/2 * Math.sin(iconRotationAngle) );
        const yCoOrdOfIcon = 0 + ( -iconDimension/2 * ( 1 - Math.cos(iconRotationAngle)) );

        const iconImg = new Image();
        iconImg.src = `/images/${iconFolder}/icon.png`;
        iconImg.srcset = `/images/${iconFolder}/icon.png 1x, /images/${iconFolder}/icon@2x.png 2x, /images/${iconFolder}/icon@3x.png 3x`;

        let that = this;
        iconImg.onload = () => {
            that.canvasContext.save();
            that.canvasContext.translate(xCoOrdOfIcon, yCoOrdOfIcon);
            that.canvasContext.drawImage(
                iconImg, 
                xCoord,
                yCoord, 
                iconDimension, 
                iconDimension
            );
            that.canvasContext.translate(xCoOrdOfIcon, xCoOrdOfIcon);
            that.canvasContext.restore();
        }
    }

    drawInnerCircle(isToday) {
        this.canvasContext.save();
            var innerCircleRadius = this.radius * 0.55;
            this.canvasContext.beginPath(); 
            this.canvasContext.fillStyle = "#ebf4fa";
            this.canvasContext.arc(this.centerX, this.centerY, innerCircleRadius, 0, Math.PI * 2, false);
            this.canvasContext.closePath();
            this.canvasContext.fill();

            //Clip the canvas to the shape of inner circle
            this.canvasContext.beginPath();
            this.canvasContext.arc(this.centerX, this.centerY, innerCircleRadius, 0, Math.PI * 2, false);
            this.canvasContext.clip();

            //Draw an shadowed outline with a radius slightly greater than the inner circle
            this.canvasContext.beginPath();
            this.canvasContext.lineWidth = 2;
            this.canvasContext.shadowColor = "black";
            this.canvasContext.strokeStyle = "black";
            this.canvasContext.shadowBlur = 15;
            this.canvasContext.shadowOffsetX = 0;
            this.canvasContext.shadowOffsetY = 0;
            this.canvasContext.arc(this.centerX, this.centerY, innerCircleRadius + 2.5, 0, Math.PI * 2, false);
            this.canvasContext.stroke();
        this.canvasContext.restore();

        this.canvasContext.textAlign = "center";
        if(isToday){
            if(this.props.bfInfo.rating === "--"){
                this.canvasContext.fillStyle = "#f6697a";
                this.canvasContext.font = `normal ${this.radius * 0.3}px sans-serif`;
                this.canvasContext.fillText( this.props.bfInfo.rating, this.refs.canvas.width/2, this.radius);
                
                this.canvasContext.fillStyle = this.props.bfInfo.colourCode;
                this.canvasContext.font = `normal ${this.radius * 0.09}px sans-serif`;
                this.canvasContext.fillText( this.props.bfInfo.text, this.refs.canvas.width/2 + 12, (this.radius + 50));
            } else {
                this.canvasContext.fillStyle = this.props.bfInfo.colourCode;
                this.canvasContext.font = `normal ${this.radius * 0.3}px sans-serif`;
                this.canvasContext.fillText( this.props.bfInfo.rating, this.refs.canvas.width/2, this.radius);
                
                this.canvasContext.font = `bold ${this.radius * 0.07}px sans-serif`;
                this.canvasContext.fillText( this.props.bfInfo.text, this.refs.canvas.width/2, (this.radius + 50));
            }
                    
            this.canvasContext.fillStyle = "#8094aa";
            this.canvasContext.font = `600 ${this.radius * 0.07}px sans-serif`;
            this.canvasContext.fillText("BassForecast Rating", this.refs.canvas.width/2, (this.radius + 100));
        } else {
            this.canvasContext.fillStyle = "#8094aa";
            this.canvasContext.font = `600 ${this.radius * 0.065}px sans-serif`;
            this.canvasContext.fillText("Download BassForecast", this.refs.canvas.width/2, (this.radius - 60));
            this.canvasContext.fillText("for 10 Days Ratings", this.refs.canvas.width/2, (this.radius - 30));
        }
    }

    render(){
        return (
            <div className="col-11 col-md-6 col-lg-3 clock__col">   
                <div style={{height: this.state.overlayHeight}} className="canvas__overlay">
                    <canvas ref="canvas" width={700} height={700}/>
                    <a
                        style={{display: this.props.isToday ? "none" : "block"}}
                        className="app__hyperlink appstore"
                        href="https://bassforecast.onelink.me/5aRm/BassForecastSolunarPageIOS" 
                        target="_blank"
                    >
                        <img
                            src="/images/AppStore/icon.png" 
                            srcSet="/images/AppStore/icon.png 1x, /images/AppStore/icon@2x.png 2x, /images/AppStore/icon@3x.png 3x"
                        />
                    </a>
                    <a
                        style={{ display: this.props.isToday ? "none" : "block"}}
                        className="app__hyperlink playstore"
                        href="https://bassforecast.onelink.me/5aRm/BassForecastSolunarPageANDROID" 
                        target="_blank"
                    >
                        <img
                            src="/images/Play/icon.png" 
                            srcSet="/images/Play/icon.png 1x, /images/Play/icon@2x.png 2x, /images/Play/icon@3x.png 3x"
                        />
                    </a>
                </div>
            </div>
        );
    }
}; 

export default ClockComponent;