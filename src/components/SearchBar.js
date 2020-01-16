import React from "react";
import {    
    fetchLocationsByInput, 
    fetchSelectedCityInfo,
    fetchLocationsByPostalCode, 
    setCities, 
    setCurrentCity 
} from "../actions/cities";
import { setCurrentCityBFR } from '../actions/bassForecastInfo';
import { connect } from "react-redux";

class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            cityInput : `${this.props.currentCity.name} - ${this.props.currentCity.state}, ${this.props.currentCity.country}`,
            activeItemIndex : -1   
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onCitySelect = this.onCitySelect.bind(this);
        this.showDatalist = this.showDatalist.bind(this);
        this.hideDatalist = this.hideDatalist.bind(this);
    }

    onInputChange(e){
        e.preventDefault();
        if(e.target.value.length > 0){
            if(e.target.value.length === 5 && /^\d+$/.test(e.target.value)){
                //Zipcode Search
                this.props.dispatch(fetchLocationsByPostalCode(e.target.value));
            } else {
                this.props.dispatch(fetchLocationsByInput(e.target.value));
            }
            this.showDatalist();
        } else {
            this.hideDatalist();
            this.props.dispatch(setCities([]));
        }

        this.setState({
            cityInput : e.target.value
        });
    }

    onCitySelect(city){
        this.props.dispatch(setCurrentCity(city));
        this.props.dispatch(setCurrentCityBFR({
            bfr: "--",
            bfrText: "loading...",
            bfrColourCode: "#8094aa"
        }));
        this.props.dispatch(fetchSelectedCityInfo(city.key, this.props.selectedDate));
        this.setState({
            cityInput : `${city.name} - ${city.state}, ${city.country}`
        });
    }

    disableDropDownOnOutsideClick(e, scope){
        if( e.srcElement.id !== "citiesBySearch" && e.srcElement.id !== "citySearchInput" & document.getElementById("citiesBySearch").style.visibility !== "hidden" ){
            scope.hideDatalist();
        } else if( document.getElementById("citiesBySearch").style.visibility === "visible" ){
            scope.showDatalist();
        }
    }

    showDatalist() {
        this.setState({
            activeItemIndex : 0
        });
        if(document.getElementById("citiesBySearch")){
            document.getElementById("citiesBySearch").style.visibility = "visible";
        }
    }

    hideDatalist() {
        this.setState({
            activeItemIndex : -1
        });
        if(document.getElementById("citiesBySearch")){
            document.getElementById("citiesBySearch").style.visibility = "hidden";
        }
    }

    onKeyPressed(evt){
        if (evt.keyCode == 38){
            //Keyboard Up button
            if(this.state.activeItemIndex > -1){
                this.setState({
                    activeItemIndex : this.state.activeItemIndex - 1
                });
            }
        } else if (evt.keyCode == 40){
            //Keyboard Down button
            if((this.state.activeItemIndex >= -1) && (this.state.activeItemIndex < (this.props.cities.length - 1))){
                this.setState({
                    activeItemIndex : this.state.activeItemIndex + 1
                });
            }
        } else if(evt.keyCode == 13){
            //Keyboard Enter button
            evt.preventDefault();
            this.onCitySelect(this.props.cities.find((city, index) => {
                return index === this.state.activeItemIndex;
            }));
        }
    }

    onInputSelect(){
        const inputField = document.getElementById("citySearchInput");
        inputField.focus();
        inputField.select();
    }

    render() {

        document.addEventListener("click", (e) => { this.disableDropDownOnOutsideClick(e, this) });

        return (
            <div className="searchbar row justify-content-center">
                <div className="col-11 col-md-6 col-lg-3 searchbar__col">
                    <form className="searchbar__form">
                        <input 
                            type="text" 
                            className="form-control searchbar__input" 
                            placeholder="Search by City or Zipcode"
                            onChange={this.onInputChange}
                            value={this.state.cityInput}
                            id="citySearchInput"
                            onKeyDown={this.onKeyPressed.bind(this)}
                            tabIndex="0"
                            autoComplete="off"
                            onClick={this.onInputSelect}
                        ></input>
                        <img 
                            src="/images/Search-icon/search-icon.png" 
                            srcSet="/images/Search-icon/search-icon.png 1x, /images/Search-icon/search-icon@2x.png 2x, /images/Search-icon/search-icon@3x.png 3x"  
                        />
                    </form>
                    <div className="searchbar__dropdown-container">
                        <ul 
                            id="citiesBySearch" 
                            className="searchbar__dropdown"
                        >
                            {this.props.cities.map((city, index) => {
                                const optionName = `${city.name} - ${city.state},${city.country}`
                                return(
                                    <li 
                                        value={city.key} 
                                        className={`searchbar__dropdown-option${(index === this.props.cities.length - 1) ? " last" : ""}${this.state.activeItemIndex === index ? " active" : ""}`} 
                                        onClick={(e) => {this.onCitySelect(city)}}
                                        key={city.key}
                                    >
                                        {optionName}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div> 
        );
    }
}

const mapStateToProps = ( store ) => {
    return {
        cities : store.citiesInfo.listOfCities,
        currentCity : store.citiesInfo.currentCity,
        bfInfo : store.bfInfo
    }
}

export default connect(mapStateToProps)( SearchBar );
