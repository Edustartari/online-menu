"use client"
import React, { Component, useState } from 'react';
import { isMobile } from 'react-device-detect';
import facebook_icon from '../../../public/facebook_icon.png';
import google_icon from '../../../public/google_icon.png';
import "../../styles/Login.css";
import Image from "next/image";

const LoginDesktop = (props) => {
    const [isLogged, setIsLogged] = useState(false);
    
    return (
        <div className="login-desktop-main-container">
            {isLogged &&
                <div>Test</div>
            }
            {!isLogged &&
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
                                {/* <img loading="lazy" src={google_icon} alt="" /> */}
                                <Image
                                    // className={styles.logo}
                                    src={google_icon}
                                    alt="Google logo"
                                    width={30}
                                    height={30}
                                    // priority
                                />
                            </div>
                            <div className="login-desktop-button-text">Google</div>
                        </div>
                    </div>
                    <div className="login-desktop-button-enter">Login with email</div>
                </div>
            }
        </div>
    )
}

const LoginMobile = (props) => {

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
                            <Image
                                src={google_icon}
                                alt="Google logo"
                                width={30}
                                height={30}
                            />
                        </div>
                        <div className="login-mobile-button-text">Google</div>
                    </div>
                    <div className="login-mobile-button">
                        <div className="login-mobile-button-icon">
                            <Image
                                src={facebook_icon}
                                alt="Facebook logo"
                                width={30}
                                height={30}
                            />
                        </div>
                        <div className="login-mobile-button-text">Facebook</div>
                    </div>
                </div>
                <div className="login-mobile-button-enter">Login with email</div>
            </div>
        </div>
    )
}

export default function Login(props) {
    if(isMobile){
        return(<LoginMobile {...props}/>)
    } else {
        return(<LoginDesktop {...props}/>)
    }
}
