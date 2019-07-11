import React from 'react';
import Clock from './Clock';
import FeedingTimeWidget from './FeedingTimeWidget';
import MoonPhaseWidget from './MoonPhaseWidget';
import Header from './Header';
import DateComponent from './Date';
import SearchBar from './SearchBar';
import SolarLunarWidget from './SolarLunarWidget';
import { connect } from "react-redux";
import { fetchSelectedCityInfo } from '../actions/cities';
import { setCurrentMoonPhase } from '../actions/moonPhase';
import ErrorModal from './ErrorModal';
import { closeModal } from '../actions/error';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        activeIndex : 0,
        activeDates : [],
        selectedDate : new Date(),
        today : new Date()
    }

    this.onDateSelect = this.onDateSelect.bind(this);
    this.closeErrorModal = this.closeErrorModal.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    const today = new Date();
    let dateSet = [];
    
    for ( let i = 0; i<10; i++ ){
      let nextDay = new Date();
      nextDay.setDate(today.getDate()+i);
      dateSet = [...dateSet, nextDay];
    }

    this.setState({
      activeDates : dateSet
    });

    this.props.dispatch(fetchSelectedCityInfo(this.props.currentCity.key, this.state.selectedDate));
    this.props.dispatch(setCurrentMoonPhase(this.state.selectedDate));
  }

  onDateSelect(activeIndex){
    this.setState({
      activeIndex,
      selectedDate : this.state.activeDates[activeIndex]
    },() => {
      this.props.dispatch(fetchSelectedCityInfo(this.props.currentCity.key, this.state.selectedDate));
      this.props.dispatch(setCurrentMoonPhase(this.state.selectedDate));
    });
  }

  closeErrorModal(){
    this.props.dispatch(closeModal());
  }

  render() {
    return (
      <div className="App">
        <ErrorModal 
          errorModal={this.props.errorModal}
          onClick={this.closeErrorModal}
        />
        <div className="app__container" id="bg-container">
            <SearchBar selectedDate={this.state.selectedDate}/>

            <div className="date__strip-container mx-auto">
              <div className="date__strip">
                {this.state.activeDates.map((date, index) => {
                  if(index < 5){
                    return (
                      <DateComponent 
                        date={date}
                        onClick={() => { this.onDateSelect(index) }}
                        active={this.state.activeIndex === index}
                        index = {index}
                        key={index}
                      />
                    );
                  }
                })}
              </div>
              <div className="date__strip">
                {this.state.activeDates.map((date, index) => {
                  if(index > 4){
                    return (
                      <DateComponent 
                        date={date}
                        onClick={() => { this.onDateSelect(index) }}
                        active={this.state.activeIndex === index}
                        index = {index}
                        key={index}
                      />
                    );
                  }
                })}
              </div>
            </div>
            
            <div className="row justify-content-center display__ad-row">
              <div id="displayAdHorizontal">
                <a href="https://bassforecast.onelink.me/5aRm/Wired2FishIFrame"
                  target="_blank" >
                  <img
                    style={{
                      maxWidth: "100%",
                      height: "auto"
                    }}
                    src="images/HorizontalBanner/h_0282_Bassforecast_MobileAd3_728x90.jpg">
                  </img>
                </a>
                
              </div>
            </div>
            
            <div className="container solarlunar__row">
              <SolarLunarWidget 
                sunrise={this.props.bfInfo.currentForecast.sunrise}
                sunset={this.props.bfInfo.currentForecast.sunset}
                moonrise={this.props.bfInfo.currentForecast.moonrise}
                moonset={this.props.bfInfo.currentForecast.moonset}
              />
            </div>

            {this.props.bfInfo.currentForecast.sunrise && 
              <div>
                <div className="row justify-content-center clock__row" style={{zIndex: 1}}>
                  <Clock
                    sunrise={this.props.bfInfo.currentForecast.sunrise}
                    sunset={this.props.bfInfo.currentForecast.sunset}
                    moonrise={this.props.bfInfo.currentForecast.moonrise}
                    moonset={this.props.bfInfo.currentForecast.moonset}
                    majorTimes={this.props.bfInfo.currentForecast.majorTimes}
                    minorTimes={this.props.bfInfo.currentForecast.minorTimes}
                    isToday={this.state.selectedDate.getDate() === this.state.today.getDate()}
                    bfInfo={this.props.bfInfo.currentBFR}
                    currentCityTz={this.props.currentCity.timeZoneName}
                  />
                </div>
                <div className="row clock__row widget">
                  <div className="widget">
                    <FeedingTimeWidget
                      majorTimes={this.props.bfInfo.currentForecast.majorTimes}
                      minorTimes={this.props.bfInfo.currentForecast.minorTimes}
                    />
                    <MoonPhaseWidget
                      percentage={this.props.moonPhase.percentage}
                      phaseOfMoon={this.props.moonPhase.phaseOfMoon}
                    />
                  </div>
                </div>
              </div>
            }
            
            <div className="row justify-content-end display__ad-row vertical">
              <div id="displayAdVertical">
              </div>
            </div>
        </div>
      </div>
    );
  }
  
}


const mapStateToProps = ( store ) => {
  return {
      bfInfo : store.bfInfo,
      currentCity : store.citiesInfo.currentCity,
      moonPhase : store.moonPhase,
      errorModal : store.errorModal
  }
}

export default connect(mapStateToProps)( App );