import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import './styles/Checkout.css';
import {
    Link
} from "react-router-dom";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import cards from '../assets/cards.png';

const steps = [
    'Select master blaster campaign settings',
    'Create an ad group',
    'Create an ad',
];

class ProductCardDesktop extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
        this.change_amount = this.change_amount.bind(this);
    }

    change_amount(operation, amount=null){
        if (operation === 'change'){
            if (amount <= 0){
                for(let item of this.props.products){
                    if(item.code === this.props.data.product_info.code){
                        item.amount = 1;
                        break;
                    }
                }
                this.props.handle_change('checkout_products_list', this.props.products) ;
                return;
            }
            for(let item of this.props.products){
                if(item.code === this.props.data.product_info.code){
                    item.amount = parseInt(amount);
                    break;
                }
            }
            this.props.handle_change('checkout_products_list', this.props.products) ;
            return;
        }

        if(operation === 'add'){
            for(let item of this.props.products){
                if(item.code === this.props.data.product_info.code){
                    item.amount += 1;
                    this.props.handle_change('checkout_products_list', this.props.products);
                    break;
                }
            }
        } else {
            for(let item of this.props.products){
                if(item.code === this.props.data.product_info.code){
                    item.amount -= 1
                    if(item.amount === 0){
                        this.props.remove_product(this.props.data)
                    } else {
                        this.props.handle_change('checkout_products_list', this.props.products)
                    }
                    break;
                }
            }
        }
    }

    render(){

        // console.log('ProductCard')
        // console.log(this.props)

        var product_image;
        if(this.props.data.product_info.image.length > 0){
            Image = require('../assets/' + this.props.data.product_info.image + '.jpg');
            product_image = Image.default
        } else {
            Image = require('../assets/default_image.jpg');
            product_image = Image.default
        }

        return(
            <div key={this.props.data.code} className="checkout-desktop-table-card">
                <div className="checkout-desktop-table-card-product">
                    <div className="checkout-desktop-table-card-product-image">
                        <img src={product_image} alt="" />
                    </div>
                    <div className="checkout-desktop-table-card-product-title">{this.props.data.product_info.title}</div>
                </div>
                <div className="checkout-desktop-table-card-product-unity-price">R$ {this.props.data.product_info.price}</div>
                <div className="checkout-desktop-table-card-quantity">
                    <div className="checkout-desktop-table-card-quantity-minus" onClick={() => this.change_amount('remove')}>
                        <span className="material-icons">remove</span>
                    </div>
                    <div className="checkout-desktop-table-card-quantity-description">
                        <TextField
                            id="outlined-required"
                            value={this.props.data.amount}
                            onChange={(event) => this.change_amount('change', event.target.value)}
                        />
                    </div>
                    <div className="checkout-desktop-table-card-quantity-plus" onClick={() => this.change_amount('add')}>
                        <span className="material-icons">add</span>
                    </div>
                </div>
                <div className="checkout-desktop-table-card-total-price">R$ {this.props.data.product_info.price * this.props.data.amount}</div>
                <div className="checkout-desktop-table-card-delete-button" onClick={() => this.props.remove_product(this.props.data.product_info)}>
                    <span className="material-icons">clear</span>
                </div>
            </div>
        )
    }
}

class CheckoutDesktop extends Component {
    constructor(props){
        super(props)
        this.state = {
            total_units: 0,
            active_step: 0,
            notes: '',
            radio_deliver: 'retrieve',
            payment_type: 'online_payment',
        }

        let pathname = window.location.pathname;
        this.props.handle_change('url', pathname)
    }

    render() {
        console.log('')
        console.log('Checkout')
        console.log(this.props)

        var lodash = require('lodash');
        var total_units = this.props.products.map((item) =>item.amount);
        total_units = lodash.sum(total_units);
        var final_value = this.props.products.map((item) => item.amount * item.product_info.price);
        final_value = lodash.sum(final_value);
        
        if(total_units === 0){
            return(
                <div className="checkout-desktop-background">
                    <div className="checkout-desktop-header">
                        <div className="checkout-desktop-header-title">CART</div>
                    </div>
                    <div className="checkout-desktop-empty-cart">
                        <div className="checkout-desktop-empty-cart-image">
                            <span className="material-icons">shopping_cart</span>
                        </div>
                        <div className="checkout-desktop-empty-cart-text">Your cart is empty</div>
                        <Link to="/">
                            <div className="checkout-desktop-empty-cart-button">Back</div>
                        </Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="checkout-desktop-background">
                    <div className="checkout-desktop-header">
                        <div className="checkout-desktop-header-title">
                            {this.state.active_step === 0 && <React.Fragment>CART</React.Fragment>}
                            {this.state.active_step === 1 && <React.Fragment>ANY NOTE?</React.Fragment>}
                            {this.state.active_step === 2 && <React.Fragment>WHAT DO YOU PREFER?</React.Fragment>}
                            {this.state.active_step === 3 && <React.Fragment>PAYMENT TYPE</React.Fragment>}
                            {this.state.active_step === 4 && <React.Fragment>SUMMARY AND IDENTIFICATION</React.Fragment>}
                        </div>
                        <div className="checkout-desktop-header-stepper">
                            <Stepper activeStep={this.state.active_step} alternativeLabel>
                                <Step style={{width: '50px'}}>
                                    <StepLabel disabled></StepLabel>
                                </Step>
                                <Step style={{width: '50px'}}>
                                    <StepLabel disabled></StepLabel>
                                </Step>
                                <Step style={{width: '50px'}}>
                                    <StepLabel disabled></StepLabel>
                                </Step>
                                <Step style={{width: '50px'}}>
                                    <StepLabel disabled></StepLabel>
                                </Step>
                                <Step style={{width: '50px'}}>
                                    <StepLabel disabled></StepLabel>
                                </Step>
                            </Stepper>
                        </div>
                    </div>
                    {this.state.active_step === 0 &&
                        <div className="checkout-desktop-table">
                            <div className="checkout-desktop-table-header">
                                <div className="checkout-desktop-table-header-title">Your {total_units === 1 ? total_units + ' item' : total_units + ' itens'}</div>
                                <div className="checkout-desktop-table-header-title">Unit value</div>
                                <div className="checkout-desktop-table-header-title">Qtd.</div>
                                <div className="checkout-desktop-table-header-title">Final value</div>
                            </div>
                            <div className="checkout-desktop-table-cards-list">
                                {this.props.products.map((product) => <ProductCardDesktop data={product} {...this.props}/>)}
                            </div>
                            <div className="checkout-desktop-table-footer">
                                <div className="checkout-desktop-table-footer-button" onClick={() => this.props.remove_product('all')}>
                                    <div className="checkout-desktop-table-footer-button-icon">
                                        <span className="material-icons">delete</span>
                                    </div>
                                    <div className="checkout-desktop-table-footer-button-text">Empty Cart</div>
                                </div>
                                <div className="checkout-desktop-table-footer-info">Final value R$ {final_value}</div>
                            </div>
                            <div className="checkout-desktop-buttons-container">
                                <div onClick={() => this.setState({active_step: 1})} className="checkout-desktop-button-foward">
                                    <div className="checkout-desktop-button-foward-text">FOWARD</div>
                                    <div className="checkout-desktop-button-foward-icon">
                                        <span className="material-icons">arrow_forward_ios</span>
                                    </div>
                                </div>
                                <Link to="/">
                                    <div className="checkout-desktop-button-back">Keep buying</div>
                                </Link>
                            </div>
                        </div>
                    }
                    {this.state.active_step === 1 &&
                        <div className="checkout-desktop-step-two">
                            <div className="checkout-desktop-step-two-textfield">
                                <TextField
                                    id="outlined-required"
                                    multiline
                                    maxRows={8}
                                    value={this.state.notes}
                                    onChange={(event) => this.setState({notes: event.target.value})}
                                />
                            </div>
                            <div onClick={() => this.setState({active_step: 2})} className="checkout-desktop-button-foward">
                                <div className="checkout-desktop-button-foward-text">FOWARD</div>
                                <div className="checkout-desktop-button-foward-icon">
                                    <span className="material-icons">arrow_forward_ios</span>
                                </div>
                            </div>
                            <div onClick={() => this.setState({active_step: 0})} className="checkout-desktop-button-back">Back</div>
                        </div>
                    }
                    {this.state.active_step === 2 &&
                        <div className="checkout-desktop-step-three">
                            <div className="checkout-desktop-step-three-header">
                                <div className="checkout-desktop-step-three-header-price">R$ 71,53</div>
                                <div className="checkout-desktop-step-three-header-title">Edu's Coffee</div>
                            </div>
                            <div className="checkout-desktop-step-three-options">
                                <div className="checkout-desktop-step-three-option-box" onClick={() => this.setState({radio_deliver: 'deliver'})}>
                                    <div className="checkout-desktop-step-three-option-box-radio">
                                        <Radio checked={this.state.radio_deliver === 'deliver' ? true : false}/>
                                        <div className="checkout-desktop-step-three-option-box-radio-text" style={this.state.radio_deliver === 'deliver' ? {color:'red'} : {}}>Deliver</div>
                                    </div>
                                    <div className="checkout-desktop-step-three-option-box-info">
                                        <div className="checkout-desktop-step-three-option-box-info-text">
                                            São Paulo and region. From 19:00 to 20:00 for confirmed orders until 14:00. 
                                            After this time we will deliver the next business day from 19:00 to 20:00.
                                        </div>
                                        <div className="checkout-desktop-step-three-option-box-info-details">
                                            Deliver (10%) R$ 0,00
                                        </div>
                                    </div>
                                </div>
                                <div className="checkout-desktop-step-three-option-box" onClick={() => this.setState({radio_deliver: 'retrieve'})}>
                                    <div className="checkout-desktop-step-three-option-box-radio">
                                        <Radio checked={this.state.radio_deliver === 'retrieve' ? true : false}/>
                                        <div className="checkout-desktop-step-three-option-box-radio-text" style={this.state.radio_deliver === 'retrieve' ? {color:'red'} : {}}>Retirada</div>
                                    </div>
                                    <div className="checkout-desktop-step-three-option-box-info">
                                        <div className="checkout-desktop-step-three-option-box-info-text">
                                            Rodovia José Carlos Daux, 4150, Saco Grande, Florianópolis - SC, 88032-005, Brasil
                                        </div>
                                        <div className="checkout-desktop-step-three-option-box-info-details">
                                            Deadline: 1 hour after order confirmation.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="checkout-desktop-step-three-buttons">
                                <div onClick={() => this.setState({active_step: 3})} className="checkout-desktop-button-foward">
                                    <div className="checkout-desktop-button-foward-text">FOWARD</div>
                                    <div className="checkout-desktop-button-foward-icon">
                                        <span className="material-icons">arrow_forward_ios</span>
                                    </div>
                                </div>
                                <div onClick={() => this.setState({active_step: 1})} className="checkout-desktop-button-back">Back</div>
                            </div>
                        </div>
                    }
                    {this.state.active_step === 3 &&
                        <div className="checkout-desktop-step-four">
                            <div className="checkout-desktop-step-four-header">
                                <div className="checkout-desktop-step-four-header-price">R$ 71,53</div>
                                <div className="checkout-desktop-step-four-header-title">Edu's Coffee</div>
                            </div>
                            <div className="checkout-desktop-step-four-options">
                                <div className="checkout-desktop-step-four-option-box-left" onClick={() => this.setState({payment_type: 'online_payment'})}>
                                    <div className="checkout-desktop-step-four-option-box-left-title">Online Payment</div>
                                    <div className="checkout-desktop-step-four-option-box-left-button">
                                        <Radio checked={this.state.payment_type === 'online_payment' ? true : false}/>
                                        <div className="checkout-desktop-step-four-option-box-left-button-text" style={this.state.payment_type === 'online_payment' ? {color: 'red'} : {}}>Online Payment</div>
                                    </div>
                                    <div className="checkout-desktop-step-four-option-box-left-image">
                                        <img src={cards} alt="" />
                                    </div>
                                </div>
                                <div className="checkout-desktop-step-four-option-box-right">
                                    <div className="checkout-desktop-step-four-option-box-right-title">Deliver/retrieve payment</div>
                                    <div className="checkout-desktop-step-four-option-box-right-button" onClick={() => this.setState({payment_type: 'money'})}>
                                        <Radio checked={this.state.payment_type === 'money' ? true : false}/>
                                        <div className="checkout-desktop-step-four-option-box-right-button-text" style={this.state.payment_type === 'money' ? {color: 'red'} : {}}>Money</div>
                                    </div>
                                    <div className="checkout-desktop-step-four-option-box-right-button" onClick={() => this.setState({payment_type: 'credit_card'})}>
                                        <Radio checked={this.state.payment_type === 'credit_card' ? true : false}/>
                                        <div className="checkout-desktop-step-four-option-box-right-button-text" style={this.state.payment_type === 'credit_card' ? {color: 'red'} : {}}>Debit card</div>
                                    </div>
                                    <div className="checkout-desktop-step-four-option-box-right-button" onClick={() => this.setState({payment_type: 'debit_card'})}>
                                        <Radio checked={this.state.payment_type === 'debit_card' ? true : false}/>
                                        <div className="checkout-desktop-step-four-option-box-right-button-text" style={this.state.payment_type === 'debit_card' ? {color: 'red'} : {}}>Credit card</div>
                                    </div>
                                </div>
                            </div>
                            <div className="checkout-desktop-step-four-buttons">
                                <div onClick={() => this.setState({active_step: 4})} className="checkout-desktop-button-foward">
                                    <div className="checkout-desktop-button-foward-text">FOWARD</div>
                                    <div className="checkout-desktop-button-foward-icon">
                                        <span className="material-icons">arrow_forward_ios</span>
                                    </div>
                                </div>
                                <div onClick={() => this.setState({active_step: 2})} className="checkout-desktop-button-back">Back</div>
                            </div>
                        </div>
                    }
                    {this.state.active_step === 4 &&
                        <div className="checkout-desktop-step-five">
                            <div className="checkout-desktop-step-five-header">
                                <div className="checkout-desktop-step-five-header-price">R$ 71,53</div>
                                <div className="checkout-desktop-step-five-header-title">Edu's Coffee</div>
                            </div>
                            <div className="checkout-desktop-step-five-itens-summary">
                                <div className="checkout-desktop-step-five-itens-container">
                                    <div className="checkout-desktop-step-five-itens-title">Your {total_units} itens:</div>
                                    <div className="checkout-desktop-step-five-itens-details">
                                        {this.props.products.map((product, index) => {
                                            let photo;
                                            if(product.product_info.image.length > 0){
                                                Image = require('../assets/' + product.product_info.image + '.jpg');
                                                photo = Image.default
                                            } else {
                                                Image = require('../assets/default_image.jpg');
                                                photo = Image.default
                                            }
                                            return (
                                                <div key={index} className="checkout-desktop-step-five-item-card">
                                                    <div className="checkout-desktop-step-five-item-photo">
                                                        <div className="checkout-desktop-step-five-item-amount">{product.amount}</div>
                                                        <img src={photo} alt="" />
                                                    </div>
                                                    <div className="checkout-desktop-step-five-item-text">{product.product_info.title}</div>
                                                    <div className="checkout-desktop-step-five-item-price">R$ {product.product_info.price * product.amount}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="checkout-desktop-step-five-itens-final-value">Final value: R$ {final_value}</div>
                                </div>
                                <div className="checkout-desktop-step-five-summary-container">
                                    <div className="checkout-desktop-step-five-summary-box">
                                        <div className="checkout-desktop-step-five-summary-box-title">
                                            <div className="checkout-desktop-step-five-summary-box-title-icon">
                                                <span className="material-icons">attach_money</span>
                                            </div>
                                            <div className="checkout-desktop-step-five-summary-box-title-text">Payment method</div>
                                        </div>
                                        <div className="checkout-desktop-step-five-summary-box-description">
                                            {this.state.payment_type === 'online_payment' && 'Online Payment'}
                                            {this.state.payment_type === 'money' && 'Money'}
                                            {this.state.payment_type === 'credit_card' && 'Credit Card'}
                                            {this.state.payment_type === 'debit_card' && 'Debit Card'}
                                        </div>
                                    </div>
                                    <div className="checkout-desktop-step-five-summary-box">
                                        <div className="checkout-desktop-step-five-summary-box-title">
                                            <div className="checkout-desktop-step-five-summary-box-title-icon">
                                                <span className="material-icons">location_on</span>
                                            </div>
                                            <div className="checkout-desktop-step-five-summary-box-title-text">Deliver method</div>
                                        </div>
                                        <div className="checkout-desktop-step-five-summary-box-description">{this.state.radio_deliver}</div>
                                    </div>
                                    <div className="checkout-desktop-step-five-summary-box">
                                        <div className="checkout-desktop-step-five-summary-box-title">
                                            <div className="checkout-desktop-step-five-summary-box-title-icon">
                                                <span className="material-icons">person_outline</span>
                                            </div>
                                            <div className="checkout-desktop-step-five-summary-box-title-text">Your info</div>
                                        </div>
                                        <div className="checkout-desktop-step-five-summary-box-description">Celular/WhatsApp: +12345678910</div>
                                    </div>
                                    {this.state.notes &&
                                        <div className="checkout-desktop-step-five-summary-box">
                                            <div className="checkout-desktop-step-five-summary-box-title">
                                                <div className="checkout-desktop-step-five-summary-box-title-icon">
                                                    <span className="material-icons">comment</span>
                                                </div>
                                                <div className="checkout-desktop-step-five-summary-box-title-text">Observations</div>
                                            </div>
                                            <div className="checkout-desktop-step-five-summary-box-description">{this.state.notes}</div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="checkout-desktop-step-five-buttons">
                                <div className="checkout-desktop-button-foward">
                                    <div className="checkout-desktop-button-foward-text">FOWARD</div>
                                    <div className="checkout-desktop-button-foward-icon">
                                        <span className="material-icons">arrow_forward_ios</span>
                                    </div>
                                </div>
                                <div onClick={() => this.setState({active_step: 3})} className="checkout-desktop-button-back">Back</div>
                            </div>
                        </div>
                    }
                </div>
            )
        }
    }
}

class ProductCardMobile extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
        this.change_amount = this.change_amount.bind(this);
    }

    change_amount(operation, amount=null){
        if (operation === 'change'){
            if (amount <= 0){
                for(let item of this.props.products){
                    if(item.code === this.props.data.product_info.code){
                        item.amount = 1;
                        break;
                    }
                }
                this.props.handle_change('checkout_products_list', this.props.products) ;
                return;
            }
            for(let item of this.props.products){
                if(item.code === this.props.data.product_info.code){
                    item.amount = parseInt(amount);
                    break;
                }
            }
            this.props.handle_change('checkout_products_list', this.props.products) ;
            return;
        }

        if(operation === 'add'){
            for(let item of this.props.products){
                if(item.code === this.props.data.product_info.code){
                    item.amount += 1;
                    this.props.handle_change('checkout_products_list', this.props.products);
                    break;
                }
            }
        } else {
            for(let item of this.props.products){
                if(item.code === this.props.data.product_info.code){
                    item.amount -= 1
                    if(item.amount === 0){
                        this.props.remove_product(this.props.data)
                    } else {
                        this.props.handle_change('checkout_products_list', this.props.products)
                    }
                    break;
                }
            }
        }
    }

    render(){

        var product_image;
        if(this.props.data.product_info.image.length > 0){
            Image = require('../assets/' + this.props.data.product_info.image + '.jpg');
            product_image = Image.default
        } else {
            Image = require('../assets/default_image.jpg');
            product_image = Image.default
        }

        return(
            <div key={this.props.data.code} className="checkout-mobile-table-card">
                <div className="checkout-mobile-table-card-product">
                    <div className="checkout-mobile-table-card-product-image">
                        <img src={product_image} alt="" />
                        <div className="checkout-mobile-table-card-product-image-total">{this.props.data.amount}</div>
                    </div>
                    <div className="checkout-mobile-table-card-product-title">{this.props.data.product_info.title}</div>
                </div>
                <div className="checkout-mobile-table-card-total-price">R$ {this.props.data.product_info.price * this.props.data.amount}</div>
            </div>
        )
    }
}

class CheckoutMobile extends Component {
    constructor(props){
        super(props)
        this.state = {
            total_units: 0,
            active_step: 0,
            notes: '',
            radio_deliver: 'retrieve',
            payment_type: 'online_payment',
        }

        let pathname = window.location.pathname;
        this.props.handle_change('url', pathname)
    }

    render() {
        console.log('')
        console.log('Checkout')
        console.log(this.props)

        var lodash = require('lodash');
        var total_units = this.props.products.map((item) =>item.amount);
        total_units = lodash.sum(total_units);
        var final_value = this.props.products.map((item) => item.amount * item.product_info.price);
        final_value = lodash.sum(final_value);
        
        if(total_units === 0){
            return(
                <div className="checkout-mobile-background">
                    <div className="checkout-mobile-header">
                        <div className="checkout-mobile-header-title">CART</div>
                    </div>
                    <div className="checkout-mobile-empty-cart">
                        <div className="checkout-mobile-empty-cart-image">
                            <span className="material-icons">shopping_cart</span>
                        </div>
                        <div className="checkout-mobile-empty-cart-text">Your cart is empty</div>
                        <Link to="/">
                            <div className="checkout-mobile-empty-cart-button">Back</div>
                        </Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="checkout-mobile-background">

                    <div className="checkout-mobile-header">
                        {this.state.active_step === 0 &&
                            <Link to="/">
                                <span className="material-icons">clear</span>
                                <div className="checkout-mobile-header-icon-text">
                                    {this.state.active_step === 0 && <React.Fragment>Cart</React.Fragment>}
                                </div>
                            </Link>
                        }
                        {this.state.active_step !== 0 &&
                            <div className="checkout-mobile-header-left" onClick={() => this.setState({active_step: this.state.active_step - 1})}>
                                <span className="material-icons">arrow_back</span>
                                <div className="checkout-mobile-header-icon-text">
                                    {this.state.active_step === 1 && <React.Fragment>Any note?</React.Fragment>}
                                    {this.state.active_step === 2 && <React.Fragment>What do you prefer?</React.Fragment>}
                                    {this.state.active_step === 3 && <React.Fragment>Payment type</React.Fragment>}
                                    {this.state.active_step === 4 && <React.Fragment>Identification</React.Fragment>}
                                </div>
                            </div>
                        }
                        <div className="checkout-mobile-header-title">R$ {final_value}</div>
                    </div>
                    
                    {this.state.active_step === 0 &&
                        <div className="checkout-mobile-table">
                            <div className="checkout-mobile-table-header">
                                <div className="checkout-mobile-table-header-title">{total_units === 1 ? total_units + ' item' : total_units + ' itens'}</div>
                                <div className="checkout-mobile-table-header-title">
                                    <div className="checkout-mobile-table-footer-button" onClick={() => this.props.remove_product('all')}>
                                        <span className="material-icons">delete</span>
                                    </div>
                                </div>
                            </div>
                            <div className="checkout-mobile-table-cards-list">
                                {this.props.products.map((product) => <ProductCardMobile data={product} {...this.props}/>)}
                            </div>
                        </div>
                    }
                    {this.state.active_step === 1 &&
                        <div className="checkout-mobile-step-two">
                            <div className="checkout-mobile-step-two-textfield">
                                <TextField
                                    id="outlined-required"
                                    multiline
                                    maxRows={28}
                                    value={this.state.notes}
                                    onChange={(event) => this.setState({notes: event.target.value})}
                                />
                            </div>
                        </div>
                    }
                    {this.state.active_step === 2 &&
                        <div className="checkout-mobile-step-three">
                            <div className="checkout-mobile-step-three-options">
                                <div className="checkout-mobile-step-three-option-box" onClick={() => this.setState({radio_deliver: 'deliver'})}>
                                    <div className="checkout-mobile-step-three-option-box-radio">
                                        <Radio checked={this.state.radio_deliver === 'deliver' ? true : false}/>
                                        <div className="checkout-mobile-step-three-option-box-radio-text" style={this.state.radio_deliver === 'deliver' ? {color:'red'} : {}}>Deliver</div>
                                    </div>
                                    <div className="checkout-mobile-step-three-option-box-info">
                                        <div className="checkout-mobile-step-three-option-box-info-text">
                                            São Paulo and region. From 19:00 to 20:00 for confirmed orders until 14:00. 
                                            After this time we will deliver the next business day from 19:00 to 20:00.
                                        </div>
                                        <div className="checkout-mobile-step-three-option-box-info-details">
                                            Deliver (10%) R$ 0,00
                                        </div>
                                    </div>
                                </div>
                                <div className="checkout-mobile-step-three-option-box" onClick={() => this.setState({radio_deliver: 'retrieve'})}>
                                    <div className="checkout-mobile-step-three-option-box-radio">
                                        <Radio checked={this.state.radio_deliver === 'retrieve' ? true : false}/>
                                        <div className="checkout-mobile-step-three-option-box-radio-text" style={this.state.radio_deliver === 'retrieve' ? {color:'red'} : {}}>Retirada</div>
                                    </div>
                                    <div className="checkout-mobile-step-three-option-box-info">
                                        <div className="checkout-mobile-step-three-option-box-info-text">
                                            Rodovia José Carlos Daux, 4150, Saco Grande, Florianópolis - SC, 88032-005, Brasil
                                        </div>
                                        <div className="checkout-mobile-step-three-option-box-info-details">
                                            Deadline: 1 hour after order confirmation.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {this.state.active_step === 3 &&
                        <div className="checkout-mobile-step-four">
                            <div className="checkout-mobile-step-four-options">
                                <div className="checkout-mobile-step-four-option-box-left" onClick={() => this.setState({payment_type: 'online_payment'})}>
                                    <div className="checkout-mobile-step-four-option-box-left-title">Online Payment</div>
                                    <div className="checkout-mobile-step-four-option-box-left-button">
                                        <Radio checked={this.state.payment_type === 'online_payment' ? true : false}/>
                                        <div className="checkout-mobile-step-four-option-box-left-button-text" style={this.state.payment_type === 'online_payment' ? {color: 'red'} : {}}>Online Payment</div>
                                    </div>
                                    <div className="checkout-mobile-step-four-option-box-left-image">
                                        <img src={cards} alt="" />
                                    </div>
                                </div>
                                <div className="checkout-mobile-step-four-option-box-right">
                                    <div className="checkout-mobile-step-four-option-box-right-title">Deliver/retrieve payment</div>
                                    <div className="checkout-mobile-step-four-option-box-right-button" onClick={() => this.setState({payment_type: 'money'})}>
                                        <Radio checked={this.state.payment_type === 'money' ? true : false}/>
                                        <div className="checkout-mobile-step-four-option-box-right-button-text" style={this.state.payment_type === 'money' ? {color: 'red'} : {}}>Money</div>
                                    </div>
                                    <div className="checkout-mobile-step-four-option-box-right-button" onClick={() => this.setState({payment_type: 'credit_card'})}>
                                        <Radio checked={this.state.payment_type === 'credit_card' ? true : false}/>
                                        <div className="checkout-mobile-step-four-option-box-right-button-text" style={this.state.payment_type === 'credit_card' ? {color: 'red'} : {}}>Debit card</div>
                                    </div>
                                    <div className="checkout-mobile-step-four-option-box-right-button" onClick={() => this.setState({payment_type: 'debit_card'})}>
                                        <Radio checked={this.state.payment_type === 'debit_card' ? true : false}/>
                                        <div className="checkout-mobile-step-four-option-box-right-button-text" style={this.state.payment_type === 'debit_card' ? {color: 'red'} : {}}>Credit card</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {this.state.active_step === 4 &&
                        <div className="checkout-mobile-step-five">
                            <div className="checkout-mobile-step-five-header">
                                <div className="checkout-mobile-step-five-header-price">R$ 71,53</div>
                                <div className="checkout-mobile-step-five-header-title">Edu's Coffee</div>
                            </div>
                            <div className="checkout-mobile-step-five-itens-summary">
                                <div className="checkout-mobile-step-five-itens-container">
                                    <div className="checkout-mobile-step-five-itens-title">Your {total_units} itens:</div>
                                    <div className="checkout-mobile-step-five-itens-details">
                                        {this.props.products.map((product, index) => {
                                            let photo;
                                            if(product.product_info.image.length > 0){
                                                Image = require('../assets/' + product.product_info.image + '.jpg');
                                                photo = Image.default
                                            } else {
                                                Image = require('../assets/default_image.jpg');
                                                photo = Image.default
                                            }
                                            return (
                                                <div key={index} className="checkout-mobile-step-five-item-card">
                                                    <div className="checkout-mobile-step-five-item-photo">
                                                        <div className="checkout-mobile-step-five-item-amount">{product.amount}</div>
                                                        <img src={photo} alt="" />
                                                    </div>
                                                    <div className="checkout-mobile-step-five-item-text">{product.product_info.title}</div>
                                                    <div className="checkout-mobile-step-five-item-price">R$ {product.product_info.price * product.amount}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="checkout-mobile-step-five-itens-final-value">Final value: R$ {final_value}</div>
                                </div>
                                <div className="checkout-mobile-step-five-summary-container">
                                    <div className="checkout-mobile-step-five-summary-box">
                                        <div className="checkout-mobile-step-five-summary-box-title">
                                            <div className="checkout-mobile-step-five-summary-box-title-icon">
                                                <span className="material-icons">attach_money</span>
                                            </div>
                                            <div className="checkout-mobile-step-five-summary-box-title-text">Payment method</div>
                                        </div>
                                        <div className="checkout-mobile-step-five-summary-box-description">
                                            {this.state.payment_type === 'online_payment' && 'Online Payment'}
                                            {this.state.payment_type === 'money' && 'Money'}
                                            {this.state.payment_type === 'credit_card' && 'Credit Card'}
                                            {this.state.payment_type === 'debit_card' && 'Debit Card'}
                                        </div>
                                    </div>
                                    <div className="checkout-mobile-step-five-summary-box">
                                        <div className="checkout-mobile-step-five-summary-box-title">
                                            <div className="checkout-mobile-step-five-summary-box-title-icon">
                                                <span className="material-icons">location_on</span>
                                            </div>
                                            <div className="checkout-mobile-step-five-summary-box-title-text">Deliver method</div>
                                        </div>
                                        <div className="checkout-mobile-step-five-summary-box-description">{this.state.radio_deliver}</div>
                                    </div>
                                    <div className="checkout-mobile-step-five-summary-box">
                                        <div className="checkout-mobile-step-five-summary-box-title">
                                            <div className="checkout-mobile-step-five-summary-box-title-icon">
                                                <span className="material-icons">person_outline</span>
                                            </div>
                                            <div className="checkout-mobile-step-five-summary-box-title-text">Your info</div>
                                        </div>
                                        <div className="checkout-mobile-step-five-summary-box-description">Celular/WhatsApp: +12345678910</div>
                                    </div>
                                    {this.state.notes &&
                                        <div className="checkout-mobile-step-five-summary-box">
                                            <div className="checkout-mobile-step-five-summary-box-title">
                                                <div className="checkout-mobile-step-five-summary-box-title-icon">
                                                    <span className="material-icons">comment</span>
                                                </div>
                                                <div className="checkout-mobile-step-five-summary-box-title-text">Observations</div>
                                            </div>
                                            <div className="checkout-mobile-step-five-summary-box-description">{this.state.notes}</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    <div className="checkout-mobile-buttons-container">
                        <div onClick={() => this.setState({active_step: this.state.active_step + 1})} className="checkout-mobile-button-foward">
                            <div className="checkout-mobile-button-foward-text">{this.state.active_step + 1} of 5</div>
                            <div className="checkout-mobile-button-foward-icon">
                                <span className="material-icons">arrow_forward_ios</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default class Checkout extends Component {
    render(){
        if(isMobile){
            return(<CheckoutMobile {...this.props}/>)
        } else {
            return(<CheckoutDesktop {...this.props}/>)
        }
    }
}