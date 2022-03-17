import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Header from './components/Header';
import MainPage from './Pages/MainPage';
import User from './Pages/User';
import Login from './Pages/Login';
import ProductPage from './Pages/ProductPage';
import Checkout from './Pages/Checkout';
import PriceFooter from './components/PriceFooter.jsx';

export default class OnlineMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            is_checkout_list_empty: true,
            checkout_products_list: [],
            url: ''
        }
        this.handle_change = this.handle_change.bind(this);
        this.add_product = this.add_product.bind(this);
        this.remove_product = this.remove_product.bind(this);
    }

    handle_change(key, value){
        console.log('handle_change')
        this.state[key] = value
        this.setState({[key]: value})
        console.log(this.state[key])
    }

    add_product(product){
        let temporary_list = [...this.state.checkout_products_list]

        if(this.state.is_checkout_list_empty){
            let product_config = {
                code:product.code,
                amount:1,
                product_info:product
            }
            temporary_list.push(product_config)
        } else {
            let product_already_added = temporary_list.filter((item) => item.code === product.code)
            if(product_already_added.length === 0){
                let product_config = {
                    code:product.code,
                    amount:1,
                    product_info:product
                }
                temporary_list.push(product_config)
            } else {
                product_already_added = product_already_added [0]
                product_already_added.amount += 1
                temporary_list = temporary_list.filter((item) => item.code !== product.code)
                temporary_list.push(product_already_added)
            }
        }
        this.state.checkout_products_list = temporary_list;
        this.setState({checkout_products_list:temporary_list});
        this.setState({is_checkout_list_empty:false});
    }

    remove_product(product){
        console.log('')
        console.log('remove product')
        let new_list;
        if(product === 'all'){
            new_list = []
            this.state.checkout_products_list = new_list;
            this.setState({checkout_products_list:new_list});
        } else {
            let temporary_list = [...this.state.checkout_products_list]
            new_list = temporary_list.filter((item) => item.code !== product.code)
            this.state.checkout_products_list = new_list;
            this.setState({checkout_products_list:new_list});
        }

        if(new_list.length === 0){
            this.setState({is_checkout_list_empty:true});
        }
    }

    render() {
        return (
            <div>
                <Router>
                    <Header url={this.state.url} handle_change={this.handle_change}/>
                    <Switch>
                        <Route path="/user">
                            <User handle_change={this.handle_change}/>
                        </Route>
                        <Route path="/login">
                            <Login handle_change={this.handle_change}/>
                        </Route>
                        <Route path="/checkout">
                            <Checkout products={this.state.checkout_products_list} handle_change={this.handle_change} remove_product={this.remove_product}/>
                        </Route>
                        <Route path="/:id" children={<ProductPage add_product={this.add_product} handle_change={this.handle_change}/>} />
                        <Route path="/">
                            <MainPage add_product={this.add_product} handle_change={this.handle_change}/>
                        </Route>
                    </Switch>
                    {(this.state.is_checkout_list_empty === false && this.state.url !== '/login') && (this.state.is_checkout_list_empty === false && this.state.url !== '/checkout') &&
                        <PriceFooter products={this.state.checkout_products_list}/>
                    }
                </Router>
            </div>
        )
    }
}
