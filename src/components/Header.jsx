import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import MobileDrawer from './MobileDrawer'
import './styles/Header.css';
import {
    Link
} from "react-router-dom";

class HeaderDesktop extends Component {
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
                        <div className="header-desktop-home-title">Edu's Coffee</div>
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
                            <div className="header-desktop-login-button-text">Keep buying</div>
                        </div>
                    </Link>
                    <Link to="/" onClick={() => this.props.handle_change('url', pathname)}>
                        <div className="header-desktop-home-title">Edu's Coffee</div>
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

class HeaderMobile extends Component {
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
                <div className="header-mobile-login-container">
                    <div className="header-mobile-login-button">
                        <div className="header-mobile-login-button-icon">
                            <Link to="/" onClick={() => this.props.handle_change('url', pathname)}>
                                <span className="material-icons">clear</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.url === '/') {
            return (
                <div className="header-mobile-home-container" id="header-mobile-home-container">
                    <MobileDrawer/>
                    <Link to="/login" onClick={() => this.props.handle_change('url', pathname)}>
                        <div className="header-mobile-home-profile">
                            <div className="header-mobile-home-profile-login">LOGIN</div>
                            <div className="header-mobile-home-profile-icon">
                                <span className="material-icons">person_outline</span>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        } else if (this.props.url === '/checkout') {
            return (
                <div className="header-mobile-home-container" id="header-mobile-home-container">
                    <div className="header-mobile-home-search">
                        <div className="header-mobile-home-search-icon">
                            <span className="material-icons">search</span>
                        </div>
                        <div className="header-mobile-home-search-input"></div>
                    </div>
                    <Link to="/" onClick={() => this.props.handle_change('url', pathname)}>
                        <div className="header-mobile-home-title">Edu's Coffee</div>
                    </Link>
                    <Link to="/login" onClick={() => this.props.handle_change('url', pathname)}>
                        <div className="header-mobile-home-profile">
                            <div className="header-mobile-home-profile-login">LOGIN</div>
                            <div className="header-mobile-home-profile-icon">
                                <span className="material-icons">person_outline</span>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="header-mobile-general-container" id="header-mobile-home-container">
                    <Link to="/" onClick={() => this.props.handle_change('url', pathname)}>
                        <div className="header-mobile-general-button">
                            <div className="header-mobile-general-button-icon">
                                <span className="material-icons">arrow_back_ios</span>
                            </div>
                            <div className="header-mobile-general-button-text">Back</div>
                        </div>
                    </Link>
                    <Link to="/login" onClick={() => this.props.handle_change('url', pathname)}>
                        <div className="header-mobile-home-profile">
                            <div className="header-mobile-home-profile-general">LOGIN</div>
                            <div className="header-mobile-home-profile-general-icon">
                                <span className="material-icons">person_outline</span>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        }
    }
}

export default class Header extends Component {
    render(){
        if(isMobile){
            return(<HeaderMobile {...this.props}/>)
        } else {
            return(<HeaderDesktop {...this.props}/>)
        }
    }
}
