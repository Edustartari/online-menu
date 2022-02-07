import React, { Component } from 'react';
import './styles/Header.css';
import {
    Link
} from "react-router-dom";

export default class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            url_path: "/"
        }
    }
    render() {
        let pathname = window.location.pathname;
        console.log('')
        console.log('Header')
        console.log(this.props.url)

        if(this.props.url === '/login'){
            return(
                <div className="header-desktop-login-container">
                    <Link to="/" onClick={() => this.props.handle_change('url', pathname)}>
                        <div className="header-desktop-login-button">
                            <div className="header-desktop-login-button-icon">
                                <span className="material-icons">arrow_back_ios</span>
                            </div>
                            <div className="header-desktop-login-button-text">Keep Buying</div>
                        </div>
                    </Link>
                </div>
            )
        } else if (this.props.url === '/') {
            return (
                <div className="header-desktop-home-container" id="header-desktop-home-container">
                    <div className="header-desktop-home-search">
                        <div className="header-desktop-home-search-icon">
                            <span className="material-icons">search</span>
                        </div>
                        <div className="header-desktop-home-search-input"></div>
                    </div>
                    <Link to="/" onClick={() => this.props.handle_change('url', pathname)}>
                        <div className="header-desktop-home-title">Café Edu</div>
                    </Link>
                    <Link to="/login" onClick={() => this.props.handle_change('url', pathname)}>
                        <div className="header-desktop-home-profile">
                            <div className="header-desktop-home-profile-login">LOGIN OR CREATE ACCOUNT</div>
                            <div className="header-desktop-home-profile-icon">
                                <span className="material-icons">person_outline</span>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="header-desktop-home-container" id="header-desktop-home-container">
                    <Link to="/" onClick={() => this.props.handle_change('url', pathname)}>
                        <div className="header-desktop-login-button">
                            <div className="header-desktop-login-button-icon">
                                <span className="material-icons">arrow_back_ios</span>
                            </div>
                            <div className="header-desktop-login-button-text">Continuar Comprando</div>
                        </div>
                    </Link>
                    <Link to="/" onClick={() => this.props.handle_change('url', pathname)}>
                        <div className="header-desktop-home-title">Café Edu</div>
                    </Link>
                    <Link to="/login" onClick={() => this.props.handle_change('url', pathname)}>
                        <div className="header-desktop-home-profile">
                            <div className="header-desktop-home-profile-login">LOGIN OR CREATE ACCOUNT</div>
                            <div className="header-desktop-home-profile-icon">
                                <span className="material-icons">person_outline</span>
                            </div>
                        </div>
                    </Link>
                </div>
            )

        }
    }
}
