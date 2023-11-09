import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import './styles/Login.css';
import facebook_icon from '../assets/facebook_icon.png';
import google_icon from '../assets/google_icon.png';
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


class LoginDesktop extends Component {
    constructor(props){
        super(props)

        this.state = {
            is_logged: false
        }
        
        let pathname = window.location.pathname;
        this.props.handle_change('url', pathname);

        this.response_fb_login = this.response_fb_login.bind(this);
    }

    response_fb_login(response){
        console.log('')
        console.log('response_fb_login')
        console.log(response)
        console.log(response)
        if (response.status !== 'unknown'){
            this.setState({is_logged: true});
        }
    }
    
    render() {
        return (
            <div className="login-desktop-main-container">
                {this.state.is_logged &&
                    <div>Test</div>
                }
                {!this.state.is_logged &&
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
                                    <img loading="lazy" src={google_icon} alt="" />
                                </div>
                                <div className="login-desktop-button-text">Google</div>
                            </div>
                            {/* <FacebookLogin
                                appId="944743883349925"
                                // autoLoad={true}
                                // fields="name,email,picture"
                                // fields="gender,first_name,last_name,age_range,picture,locale,timezone,cover"
                                fields="first_name,last_name,age_range,picture,locale,timezone,cover"
                                scope="public_profile,email,user_friends,user_gender,locale,location,user_location"
                                callback={this.response_fb_login}
                                icon="fa-facebook" 
                            /> */}
                            <FacebookLogin
                                appId="944743883349925"
                                fields="first_name,last_name,age_range,picture,locale,timezone,cover"
                                scope="public_profile,email,user_friends,user_gender,locale,location,user_location"
                                callback={this.response_fb_login}
                                render={renderProps => (
                                    // <button onClick={renderProps.onClick}>This is my custom FB button</button>
                                    <div className="login-desktop-button" onClick={() => renderProps.onClick()}>
                                        <div className="login-desktop-button-icon">
                                            <img loading="lazy" src={facebook_icon} alt="" />
                                        </div>
                                        <div className="login-desktop-button-text">Facebook</div>
                                    </div>
                                )}
                            />
                            {/* <div className="login-desktop-button" onClick={() => {this.response_fb_login()}}>
                                <div className="login-desktop-button-icon">
                                    <img loading="lazy" src={facebook_icon} alt="" />
                                </div>
                                <div className="login-desktop-button-text">Facebook</div>
                            </div> */}
                        </div>
                        <div className="login-desktop-button-enter">Login with email</div>
                    </div>
                }
            </div>
        )
    }
}

class LoginMobile extends Component {
    constructor(props){
        super(props)
        
        let pathname = window.location.pathname;
        this.props.handle_change('url', pathname)
    }
    
    render() {
        return (
            <div className="login-mobile-main-container">
                <div className="login-mobile-box">
                    <div className="login-mobile-image">
                        <span className="material-icons">vpn_key</span>
                    </div>
                    <div className="login-mobile-title">
                        <div className="login-mobile-title-description">Identify yourself</div>
                        <div className="login-mobile-subtitle-description">Use your profile to order from partner stores:</div>
                    </div>
                    <div className="login-mobile-buttons-container">
                        <div className="login-mobile-button">
                            <div className="login-mobile-button-icon">
                                <img loading="lazy" src={google_icon} alt="" />
                            </div>
                            <div className="login-mobile-button-text">Google</div>
                        </div>
                        <div className="login-mobile-button">
                            <div className="login-mobile-button-icon">
                                <img loading="lazy" src={facebook_icon} alt="" />
                            </div>
                            <div className="login-mobile-button-text">Facebook</div>
                        </div>
                    </div>
                    <div className="login-mobile-button-enter">Login with email</div>
                </div>
            </div>
        )
    }
}

export default class Login extends Component {
    render(){
        if(isMobile){
            return(<LoginMobile {...this.props}/>)
        } else {
            return(<LoginDesktop {...this.props}/>)
        }
    }
}
