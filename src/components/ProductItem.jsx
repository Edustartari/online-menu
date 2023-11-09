import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import './styles/ProductItem.css';
import {
    Link
} from "react-router-dom";

class ProductItemDesktop extends Component {
    constructor(props){
        super(props)
        this.state = {
            hover: false
        }
    }
    render() {
        const product = this.props.product;
        
        var product_image;
        if(product.image.length > 0){
            Image = require('./../assets/' + product.image + '.jpg');
            product_image = Image.default
        } else {
            Image = require('./../assets/default_image.jpg');
            product_image = Image.default
        }

        return (
            <React.Fragment>
                {this.props.display_mode === 'grid' &&
                    <div className="product-item-desktop-grid-container">
                        <Link to={"/" + product.code}>
                            <div className="product-item-desktop-grid" onMouseOver={() => this.setState({hover: true})} onMouseLeave={() => this.setState({hover: false})}>
                                <div className="product-item-desktop-grid-img">
                                    <div className="product-item-desktop-grid-opacity"></div>
                                    {Image !== null &&
                                        <img loading="lazy" src={Image.default} alt="" />
                                    }
                                </div>
                                <div className="product-item-desktop-grid-content">
                                    <div className="product-item-desktop-grid-title">
                                        {product.is_highlight &&
                                            <div className="product-item-desktop-grid-title-favorite">
                                                <span className="material-icons">star</span>
                                            </div>
                                        }
                                        <div className="product-item-desktop-grid-title-text">{product.title}</div>
                                    </div>
                                    <div className="product-item-desktop-grid-info">
                                        <div className="product-item-desktop-grid-info-type">{product.category}</div>
                                        <div className="product-item-desktop-grid-info-code">COD: {product.code}</div>
                                    </div>
                                    <div className="product-item-desktop-grid-price">R$ {product.price}</div>
                                    <div className="product-item-desktop-grid-description">
                                        {product.description}
                                    </div>
                                    <div 
                                        onClick={(event) => {this.props.add_product(product); event.preventDefault()}} 
                                        className="product-item-desktop-grid-button" 
                                        style={this.state.hover ? {display: 'flex'} : {display: 'none'}}
                                    >
                                        <span className="material-icons">add</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                }
                {this.props.display_mode === 'list' &&
                    <div className="product-item-desktop-list-container">
                        <Link to={"/" + product.code}>
                            <div className="product-item-desktop-list" onMouseOver={() => this.setState({hover: true})} onMouseLeave={() => this.setState({hover: false})}>
                                <div className="product-item-desktop-list-img">
                                    <div className="product-item-desktop-list-opacity"></div>
                                    {Image !== null &&
                                        <img loading="lazy" src={Image.default} alt="" />
                                    }
                                </div>
                                <div className="product-item-desktop-list-content">
                                    <div className="product-item-desktop-list-title">
                                        {product.is_highlight &&
                                            <div className="product-item-desktop-list-title-favorite">
                                                <span className="material-icons">star</span>
                                            </div>
                                        }
                                        <div className="product-item-desktop-list-title-text">{product.title}</div>
                                    </div>
                                    <div className="product-item-desktop-list-info">
                                        <div className="product-item-desktop-list-info-type">{product.category}</div>
                                    </div>
                                    <div className="product-item-desktop-list-price">R$ {product.price}</div>
                                    <div className="product-item-desktop-list-info-code">COD: {product.code}</div>
                                    <div className="product-item-desktop-list-description">
                                        {product.description}
                                    </div>
                                    <div 
                                        onClick={(event) => {this.props.add_product(product); event.preventDefault()}} 
                                        className="product-item-desktop-list-button" 
                                        style={this.state.hover ? {display: 'flex'} : {display: 'none'}}
                                    >
                                        <span className="material-icons">add</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                }
            </React.Fragment>
        )
    }
}

class ProductItemMobile extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render() {
        const product = this.props.product;
        
        var product_image;
        if(product.image.length > 0){
            Image = require('./../assets/' + product.image + '.jpg');
            product_image = Image.default
        } else {
            Image = require('./../assets/default_image.jpg');
            product_image = Image.default
        }

        return (
            <React.Fragment>
                {this.props.display_mode === 'grid' &&
                    <div className="product-item-mobile-grid-container">
                        <Link to={"/" + product.code}>
                            <div className="product-item-mobile-grid">
                                <div className="product-item-mobile-grid-img">
                                    {Image !== null &&
                                        <img loading="lazy" src={Image.default} alt="" />
                                    }
                                </div>
                                <div className="product-item-mobile-grid-content">
                                    <div className="product-item-mobile-grid-title">
                                        {product.is_highlight &&
                                            <div className="product-item-mobile-grid-title-favorite">
                                                <span className="material-icons">star</span>
                                            </div>
                                        }
                                        <div className="product-item-mobile-grid-title-text">{product.title}</div>
                                    </div>
                                    <div className="product-item-mobile-grid-info">
                                        <div className="product-item-mobile-grid-info-type">{product.category}</div>
                                        <div className="product-item-mobile-grid-info-code">COD: {product.code}</div>
                                    </div>
                                    <div className="product-item-mobile-grid-price">R$ {product.price}</div>
                                    <div className="product-item-mobile-grid-description">
                                        {product.description}
                                    </div>
                                    <div 
                                        onClick={(event) => {this.props.add_product(product); event.preventDefault()}} 
                                        className="product-item-mobile-grid-button" 
                                    >
                                        <span className="material-icons">add</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                }
                {this.props.display_mode === 'list' &&
                    <div className="product-item-mobile-list-container">
                        <Link to={"/" + product.code}>
                            <div className="product-item-mobile-list">
                                <div className="product-item-mobile-list-img">
                                    {Image !== null &&
                                        <img loading="lazy" src={Image.default} alt="" />
                                    }
                                    <div 
                                        onClick={(event) => {this.props.add_product(product); event.preventDefault()}} 
                                        className="product-item-mobile-list-button" 
                                    >
                                        <span className="material-icons">add</span>
                                    </div>
                                </div>
                                <div className="product-item-mobile-list-content">
                                    <div className="product-item-mobile-list-title">
                                        {product.is_highlight &&
                                            <div className="product-item-mobile-list-title-favorite">
                                                <span className="material-icons">star</span>
                                            </div>
                                        }
                                        <div className="product-item-mobile-list-title-text">{product.title}</div>
                                    </div>
                                    <div className="product-item-mobile-list-info">
                                        <div className="product-item-mobile-list-info-type">{product.category}</div>
                                    </div>
                                    <div className="product-item-mobile-list-price">R$ {product.price}</div>
                                    <div className="product-item-mobile-list-info-code">COD: {product.code}</div>
                                    <div className="product-item-mobile-list-description">
                                        {product.description}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default class ProductItem extends Component {
    render(){
        if(isMobile){
            return(<ProductItemMobile {...this.props}/>)
        } else {
            return(<ProductItemDesktop {...this.props}/>)
        }
    }
}