import React, { Component } from 'react'
import './styles/Login.css';
import facebook_icon from '../assets/facebook_icon.png';
import google_icon from '../assets/google_icon.png';

export default class Login extends Component {
    constructor(props){
        super(props)
        
        let pathname = window.location.pathname;
        this.props.handle_change('url', pathname)
    }
    
    render() {
        return (
            <div className="login-desktop-main-container">
                <div className="login-desktop-box">
                    <div className="login-desktop-image">
                        <span className="material-icons">vpn_key</span>
                    </div>
                    <div className="login-desktop-title">
                        <div className="login-desktop-title-description">Identify yourself</div>
                        <div className="login-desktop-subtitle-description">Use your profile to order from partner stores:</div>
                    </div>
                    <div className="login-desktop-buttons-container">
                        <div className="login-desktop-button">
                            <div className="login-desktop-button-icon">
                                <img src={google_icon} alt="" />
                            </div>
                            <div className="login-desktop-button-text">Google</div>
                        </div>
                        <div className="login-desktop-button">
                            <div className="login-desktop-button-icon">
                                <img src={facebook_icon} alt="" />
                            </div>
                            <div className="login-desktop-button-text">Facebook</div>
                        </div>
                    </div>
                    <div className="login-desktop-button-enter">Login with email</div>
                </div>
            </div>
        )
    }
}
