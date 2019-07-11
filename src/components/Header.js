import React from "react";
import LogoImage from "../../public/images/logo.jpg";

class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mobileMenuOpen : false
        };
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    }

    toggleMobileMenu() {
        this.setState({
            mobileMenuOpen : !this.state.mobileMenuOpen
        });
    }

    render(){
        return( 
            <div className="header">
                <div className="header__container">
                    <div className="logo__container">
                        <span></span>
                        <a href="https://www.bassforecast.com/">
                            <img src={LogoImage}/>
                        </a>
                    </div>
        
                    <div className="nav__container">
                        <ul className="nav">
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.bassforecast.com">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.bassforecast.com#about">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.bassforecast.com#howitworks">How it works</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.bassforecast.com#features">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.bassforecast.com#testimonials">Testimonials</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.bassforecast.com/faqs/">faqs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.bassforecast.com#contact">contact</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active solunar" href="#">solunar</a>
                            </li>
                        </ul>
                    </div>
        
                    <div className="mobilenav__container">
                        <span className="mobilenav__menubar-toggle" onClick={this.toggleMobileMenu}>
                        </span>
                    </div>
                </div>
                <div className="mobilenav__menu-container">
                    <ul className={`mobilenav__menu${this.state.mobileMenuOpen ? " open" : ""}`}>
                        <li className="mobilenav__item">
                            <a className="" href="https://www.bassforecast.com">Home</a>
                        </li>
                        <li className="mobilenav__item">
                            <a className="" href="https://www.bassforecast.com#about">About</a>
                        </li>
                        <li className="mobilenav__item">
                            <a className="" href="https://www.bassforecast.com#howitworks">How it works</a>
                        </li>
                        <li className="mobilenav__item">
                            <a className="" href="https://www.bassforecast.com#features">Features</a>
                        </li>
                        <li className="mobilenav__item">
                            <a className="" href="https://www.bassforecast.com#testimonials">Testimonials</a>
                        </li>
                        <li className="mobilenav__item">
                            <a className="" href="https://www.bassforecast.com/faqs/">faqs</a>
                        </li>
                        <li className="mobilenav__item">
                            <a className="" href="https://www.bassforecast.com#contact">contact</a>
                        </li>
                        <li className="mobilenav__item">
                            <a className="active solunar" href="#">solunar</a>
                        </li>
                    </ul>
                </div> 
            </div> 
        );
    }
}

export default Header;
