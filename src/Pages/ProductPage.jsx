import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import './styles/ProductPage.css';
import cards from '../assets/cards.png';
import paid_market from '../assets/paid_market.png';
import whatsapp_icon from '../assets/whatsapp_icon.png';
import products_list from '../products.json'

class ProductPageDesktop extends Component {
    constructor(props){
        super(props)

        let pathname = window.location.pathname;
        this.props.handle_change('url', pathname)
    }
    
    render() {
        let product_code = window.location.pathname.slice(1);
        let product = products_list.products.filter((element) => element.code === parseInt(product_code))
        product = product[0]

        var product_image;
        if(product.image.length > 0){
            Image = require('../assets/' + product.image + '.jpg');
            product_image = Image.default
        } else {
            Image = require('../assets/default_image.jpg');
            product_image = Image.default
        }

        return (
            <div className="product-desktop-main-container">
                <div className="product-desktop-image">
                    <img src={product_image} alt="" />
                </div>
                <div className="product-desktop-info">
                    <div className="product-desktop-header">
                        <div className="product-desktop-header-text">{product.category}</div>
                        <div className="product-desktop-header-separator"></div>
                        <div className="product-desktop-header-text">COD. {product.code}</div>
                    </div>
                    <div className="product-desktop-title">{product.title}</div>
                    <div className="product-desktop-price">R$ {product.price}</div>
                    <div className="product-desktop-payment">
                        <div className="product-desktop-payment-cards">
                            <img src={cards} alt="" />
                        </div>
                        <div className="product-desktop-payment-market">
                            <div className="product-desktop-payment-market-text">Processed by</div>
                            <img src={paid_market} alt="" />
                        </div>
                    </div>
                    <div className="product-desktop-description">{product.description}</div>
                    <div className="product-desktop-buttons">
                        <div className="product-desktop-add-button" onClick={(event) => {this.props.add_product(product); event.stopPropagation()}}>
                            <div className="product-desktop-add-button-text">Add item</div>
                            <div className="product-desktop-add-button-icon">
                                <span className="material-icons">add</span>
                            </div>
                        </div>
                        <div className="product-desktop-whatsapp-button">
                            <img src={whatsapp_icon} alt="" />
                            <div className="product-desktop-whatsapp-button-text">Order by Whatsapp</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


class ProductPageMobile extends Component {
    constructor(props){
        super(props)

        let pathname = window.location.pathname;
        this.props.handle_change('url', pathname)
    }
    
    render() {
        var lodash = require('lodash');
        var total_units = this.props.products.map((item) =>item.amount);
        total_units = lodash.sum(total_units);

        let product_code = window.location.pathname.slice(1);
        let product = products_list.products.filter((element) => element.code === parseInt(product_code))
        product = product[0]

        var product_image;
        if(product.image.length > 0){
            Image = require('../assets/' + product.image + '.jpg');
            product_image = Image.default
        } else {
            Image = require('../assets/default_image.jpg');
            product_image = Image.default
        }

        return (
            <div className="product-mobile-main-container">
                <div className="product-mobile-image">
                    <img src={product_image} alt="" />
                </div>
                <div className="product-mobile-info">
                    <div className="product-mobile-header">
                        <div className="product-mobile-header-text">{product.category.toUpperCase()}</div>
                        <div className="product-mobile-header-separator"></div>
                        <div className="product-mobile-header-text">COD. {product.code}</div>
                    </div>
                    <div className="product-mobile-title">{product.title}</div>
                    <div className="product-mobile-price">R$ {product.price}</div>
                    <div className="product-mobile-payment">
                        <div className="product-mobile-payment-cards">
                            <img src={cards} alt="" />
                        </div>
                        <div className="product-mobile-payment-market">
                            <div className="product-mobile-payment-whatsapp-button">
                                <div className="product-mobile-payment-whatsapp-text">Order by</div>
                                <img src={whatsapp_icon} alt="" />
                            </div>
                            <div className="product-mobile-payment-market-column">
                                <div className="product-mobile-payment-market-text">Processed by</div>
                                <img src={paid_market} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="product-mobile-description">{product.description}</div>
                    <div className="product-mobile-buttons">
                        <div className="product-mobile-cart-button">
                            <div className="product-mobile-cart-button-icon">
                                <span class="material-icons">shopping_cart</span>
                            </div>
                            <div className="product-mobile-cart-button-number">{total_units}</div>
                        </div>
                        <div className="product-mobile-add-button" onClick={(event) => {this.props.add_product(product); event.stopPropagation()}}>
                            <div className="product-mobile-add-button-price">R$ {product.price}</div>
                            <div className="product-mobile-add-button-text">Add item</div>
                            <div className="product-mobile-add-button-icon">
                                <span className="material-icons">add</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default class ProductPage extends Component {
    render(){
        if(isMobile){
            return(<ProductPageMobile {...this.props}/>)
        } else {
            return(<ProductPageDesktop {...this.props}/>)
        }
    }
}
