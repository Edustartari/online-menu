import React, { Component } from 'react'
import './styles/PriceFooter.css'
import {
    Link
} from "react-router-dom";

export default class PriceFooter extends Component {
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
