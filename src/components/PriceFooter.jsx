import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import './styles/PriceFooter.css'
import {
    Link
} from "react-router-dom";

class PriceFooterDesktop extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render() {
        var lodash = require('lodash');
        var prices_list = this.props.products.map((item) => item.product_info.price * item.amount);
        var total = lodash.sum(prices_list);
        return (
            <div className="price-footer-desktop-container">
                <Link to="/checkout">
                    <div className="price-footer-desktop-button">
                        <div className="price-footer-desktop-button-text">Total: R$ {total}</div>
                        <div className="price-footer-desktop-button-arrow">
                            <span className="material-icons">arrow_forward_ios</span>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

class PriceFooterMobile extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render() {
        var lodash = require('lodash');
        var prices_list = this.props.products.map((item) => item.product_info.price * item.amount);
        var total = lodash.sum(prices_list);

        var total_units = this.props.products.map((item) =>item.amount);
        total_units = lodash.sum(total_units);


        return (
            <div className="price-footer-mobile-container">
                <Link to="/checkout">
                    <div className="price-footer-mobile-button">
                        <div className="price-footer-mobile-button-icon">
                            <span className="material-icons">shopping_cart</span>
                        </div>
                        <div className="price-footer-mobile-button-info">
                            <div className="price-footer-mobile-button-text">{total_units} itens = R$ {total}</div>
                            <div className="price-footer-mobile-button-arrow">
                                <span className="material-icons">arrow_forward_ios</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default class PriceFooter extends Component {
    render(){
        if(isMobile){
            return(<PriceFooterMobile {...this.props}/>)
        } else {
            return(<PriceFooterDesktop {...this.props}/>)
        }
    }
}