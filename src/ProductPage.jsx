import React, { Component } from 'react'
import './styles/ProductPage.css';
import cards from './assets/cards.png';
import paid_market from './assets/paid_market.png';
import whatsapp_icon from './assets/whatsapp_icon.png';
import products_list from './products.json'

export default class ProductPage extends Component {
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
            Image = require('./assets/' + product.image + '.jpg');
            product_image = Image.default
        } else {
            Image = require('./assets/default_image.jpg');
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
