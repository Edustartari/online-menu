import React, { Component, useState } from 'react';
import { isMobile } from 'react-device-detect';
// import MobileDrawer from './MobileDrawer'
import '../../styles/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from 'next/link';

const HeaderDesktop = () => {

  const pathname = window.location.pathname;

  if (pathname === '/login') {
    return (
      <div className="header-desktop-login-container">
        <Link href="/">
          <div className="header-desktop-login-button">
            <div className="header-desktop-login-button-icon">
              <SearchIcon />
            </div>
            <div className="header-desktop-login-button-text">Keep Buying</div>
          </div>
        </Link>
      </div>
    )
  } else if (pathname === '/') {
    return (
      <div className="header-desktop-home-container" id="header-desktop-home-container">
        <div className="header-desktop-home-search">
          <div className="header-desktop-home-search-icon">
            <SearchIcon />
          </div>
          <div className="header-desktop-home-search-input"></div>
        </div>
        <Link href="/">
          <div className="header-desktop-home-title">Edu's Coffee</div>
        </Link>
        <Link href="/login">
          <div className="header-desktop-home-profile">
            <div className="header-desktop-home-profile-login">LOGIN OR CREATE ACCOUNT</div>
            <div className="header-desktop-home-profile-icon">
              <PersonIcon />
            </div>
          </div>
        </Link>
      </div>
    )
  } else {
    return (
      <div className="header-desktop-home-container" id="header-desktop-home-container">
        <Link href="/">
          <div className="header-desktop-login-button">
            <div className="header-desktop-login-button-icon">
              <ArrowBackIosIcon />
            </div>
            <div className="header-desktop-login-button-text">Keep buying</div>
          </div>
        </Link>
        <Link href="/">
          <div className="header-desktop-home-title">Edu's Coffee</div>
        </Link>
        <Link href="/login">
          <div className="header-desktop-home-profile">
            <div className="header-desktop-home-profile-login">LOGIN OR CREATE ACCOUNT</div>
            <div className="header-desktop-home-profile-icon">
              <PersonIcon />
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

const HeaderMobile = () => {

  const pathname = window.location.pathname;

  if (pathname === '/login') {
    return (
      <div className="header-mobile-login-container">
        <div className="header-mobile-login-button">
          <div className="header-mobile-login-button-icon">
            <Link href="/">
              <span className="material-icons">clear</span>
            </Link>
          </div>
        </div>
      </div>
    )
  } else if (pathname === '/') {
    return (
      <div className="header-mobile-home-container" id="header-mobile-home-container">
        {/* <MobileDrawer/> */}
        <Link href="/login">
          <div className="header-mobile-home-profile">
            <div className="header-mobile-home-profile-login">LOGIN</div>
            <div className="header-mobile-home-profile-icon">
              <span className="material-icons">person_outline</span>
            </div>
          </div>
        </Link>
      </div>
    )
  } else if (pathname === '/checkout') {
    return (
      <div className="header-mobile-home-container" id="header-mobile-home-container">
        <div className="header-mobile-home-search">
          <div className="header-mobile-home-search-icon">
            <span className="material-icons">search</span>
          </div>
          <div className="header-mobile-home-search-input"></div>
        </div>
        <Link href="/">
          <div className="header-mobile-home-title">Edu's Coffee</div>
        </Link>
        <Link href="/login">
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
        <Link href="/">
          <div className="header-mobile-general-button">
            <div className="header-mobile-general-button-icon">
              <span className="material-icons">arrow_back_ios</span>
            </div>
            <div className="header-mobile-general-button-text">Back</div>
          </div>
        </Link>
        <Link href="/login">
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

export default function Header(props) {
  if (isMobile) {
    return (<HeaderMobile {...props} />)
  } else {
    return (<HeaderDesktop {...props} />)
  }
}
