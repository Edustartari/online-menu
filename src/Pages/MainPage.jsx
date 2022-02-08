import React, { Component } from 'react';
import './styles/MainPage.css';
import ProductItem from '../components/ProductItem.jsx';
import products_list from '../products.json';
import _ from 'underscore';

export default class MainPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            category: 'all',
            sort_by: 'category',
            display_mode: 'grid', // grid, list
            original_products_list: products_list.products,
            filtered_products_list: products_list.products
        }

        let pathname = window.location.pathname;
        this.props.handle_change('url', pathname);

        this.menu_select = this.menu_select.bind(this);
        this.sort_list = this.sort_list.bind(this);
    }

    sort_list(list, value){
        let sortedObjs;
        if(value === 'category'){
            sortedObjs = _.sortBy(list, 'category');
        } else if(value === 'lowest_price'){
            sortedObjs = _.sortBy(list, 'price');
        } else if(value === 'highest_price'){
            sortedObjs = _.sortBy(list, 'price').reverse();
        } else if(value === 'a_z'){
            sortedObjs = _.sortBy(list, 'title');
        } else if(value === 'z_a'){
            sortedObjs = _.sortBy(list, 'title').reverse();
        }
        this.setState({filtered_products_list: sortedObjs})
    }

    menu_select(option, value){
        this.setState({[option]: value})
        if(option === 'category'){
            let temporary_list = [...this.state.original_products_list]
            let new_list;
            if(value === 'all'){
                new_list = temporary_list
            } else if(value === 'highlights') {
                new_list = temporary_list.filter((item) => item.is_highlight)
            } else {
                new_list = temporary_list.filter((item) => item.category === value)                
            }
            this.sort_list(new_list, this.state.sort_by)
        }

        if(option === 'sort_by'){
            this.sort_list(this.state.filtered_products_list, value)
        }
    }

    render() {
        return (
            <div className="main-page-desktop-container">
                <div className="main-page-desktop-aside-menu">
                    <div className="main-page-desktop-aside-menu-box">
                        <div className="main-page-desktop-aside-menu-box-title">Categories</div>
                        <div className="main-page-desktop-aside-menu-box-option-list">
                            <div className="main-page-desktop-aside-menu-box-option" onClick={() => this.menu_select('category','all')}>
                                <div className="main-page-desktop-aside-menu-box-option-icon" style={this.state.category === 'all' ? {display: 'flex'} : {visibility: 'hidden'}}>
                                    <span className="material-icons" style={this.state.category === 'all' ? {color: 'red', fontWeight: 'bold'} : {}}>done</span>
                                </div>
                                <div className="main-page-desktop-aside-menu-box-option-text" style={this.state.category === 'all' ? {fontWeight: 'bold'} : {}}>All</div>
                            </div>
                            <div className="main-page-desktop-aside-menu-box-option" onClick={() => this.menu_select('category','highlights')}>
                                <div className="main-page-desktop-aside-menu-box-option-icon" style={this.state.category === 'highlights' ? {display: 'flex'} : {visibility: 'hidden'}}>
                                    <span className="material-icons" style={this.state.category === 'highlights' ? {color: 'red', fontWeight: 'bold'} : {}}>done</span>
                                </div>
                                <div className="main-page-desktop-aside-menu-box-option-text" style={this.state.category === 'highlights' ? {fontWeight: 'bold'} : {}}>Highlights</div>
                            </div>
                            <div className="main-page-desktop-aside-menu-box-option" onClick={() => this.menu_select('category','Drinks')}>
                                <div className="main-page-desktop-aside-menu-box-option-icon" style={this.state.category === 'Drinks' ? {display: 'flex'} : {visibility: 'hidden'}}>
                                    <span className="material-icons" style={this.state.category === 'Drinks' ? {color: 'red', fontWeight: 'bold'} : {}}>done</span>
                                </div>
                                <div className="main-page-desktop-aside-menu-box-option-text" style={this.state.category === 'Drinks' ? {fontWeight: 'bold'} : {}}>Drinks</div>
                            </div>
                            <div className="main-page-desktop-aside-menu-box-option" onClick={() => this.menu_select('category','Coffee')}>
                                <div className="main-page-desktop-aside-menu-box-option-icon" style={this.state.category === 'Coffee' ? {display: 'flex'} : {visibility: 'hidden'}}>
                                    <span className="material-icons" style={this.state.category === 'Coffee' ? {color: 'red', fontWeight: 'bold'} : {}}>done</span>
                                </div>
                                <div className="main-page-desktop-aside-menu-box-option-text" style={this.state.category === 'Coffee' ? {fontWeight: 'bold'} : {}}>Cafés</div>
                            </div>
                            <div className="main-page-desktop-aside-menu-box-option" onClick={() => this.menu_select('category','Snacks')}>
                                <div className="main-page-desktop-aside-menu-box-option-icon" style={this.state.category === 'Snacks' ? {display: 'flex'} : {visibility: 'hidden'}}>
                                    <span className="material-icons" style={this.state.category === 'Snacks' ? {color: 'red', fontWeight: 'bold'} : {}}>done</span>
                                </div>
                                <div className="main-page-desktop-aside-menu-box-option-text" style={this.state.category === 'Snacks' ? {fontWeight: 'bold'} : {}}>Snacks</div>
                            </div>
                            <div className="main-page-desktop-aside-menu-box-option" onClick={() => this.menu_select('category','Dessert')}>
                                <div className="main-page-desktop-aside-menu-box-option-icon" style={this.state.category === 'Dessert' ? {display: 'flex'} : {visibility: 'hidden'}}>
                                    <span className="material-icons" style={this.state.category === 'Dessert' ? {color: 'red', fontWeight: 'bold'} : {}}>done</span>
                                </div>
                                <div className="main-page-desktop-aside-menu-box-option-text" style={this.state.category === 'Dessert' ? {fontWeight: 'bold'} : {}}>Desserts</div>
                            </div>
                        </div>
                    </div>
                    <div className="main-page-desktop-aside-menu-box">
                        <div className="main-page-desktop-aside-menu-box-title">Sort by</div>
                        <div className="main-page-desktop-aside-menu-box-option-list">
                            <div className="main-page-desktop-aside-menu-box-option" onClick={() => this.menu_select('sort_by','category')}>
                                <div className="main-page-desktop-aside-menu-box-option-icon" style={this.state.sort_by === 'category' ? {display: 'flex'} : {visibility: 'hidden'}}>
                                    <span className="material-icons" style={this.state.sort_by === 'category' ? {color: 'red', fontWeight: 'bold'} : {}}>done</span>
                                </div>
                                <div className="main-page-desktop-aside-menu-box-option-text" style={this.state.sort_by === 'category' ? {fontWeight: 'bold'} : {}}>Categories</div>
                            </div>
                            <div className="main-page-desktop-aside-menu-box-option" onClick={() => this.menu_select('sort_by','lowest_price')}>
                                <div className="main-page-desktop-aside-menu-box-option-icon" style={this.state.sort_by === 'lowest_price' ? {display: 'flex'} : {visibility: 'hidden'}}>
                                    <span className="material-icons" style={this.state.sort_by === 'lowest_price' ? {color: 'red', fontWeight: 'bold'} : {}}>done</span>
                                </div>
                                <div className="main-page-desktop-aside-menu-box-option-text" style={this.state.sort_by === 'lowest_price' ? {fontWeight: 'bold'} : {}}>Lowest price</div>
                            </div>
                            <div className="main-page-desktop-aside-menu-box-option" onClick={() => this.menu_select('sort_by','highest_price')}>
                                <div className="main-page-desktop-aside-menu-box-option-icon" style={this.state.sort_by === 'highest_price' ? {display: 'flex'} : {visibility: 'hidden'}}>
                                    <span className="material-icons" style={this.state.sort_by === 'highest_price' ? {color: 'red', fontWeight: 'bold'} : {}}>done</span>
                                </div>
                                <div className="main-page-desktop-aside-menu-box-option-text" style={this.state.sort_by === 'highest_price' ? {fontWeight: 'bold'} : {}}>Highest price</div>
                            </div>
                            <div className="main-page-desktop-aside-menu-box-option" onClick={() => this.menu_select('sort_by','a_z')}>
                                <div className="main-page-desktop-aside-menu-box-option-icon" style={this.state.sort_by === 'a_z' ? {display: 'flex'} : {visibility: 'hidden'}}>
                                    <span className="material-icons" style={this.state.sort_by === 'a_z' ? {color: 'red', fontWeight: 'bold'} : {}}>done</span>
                                </div>
                                <div className="main-page-desktop-aside-menu-box-option-text" style={this.state.sort_by === 'a_z' ? {fontWeight: 'bold'} : {}}>A-Z</div>
                            </div>
                            <div className="main-page-desktop-aside-menu-box-option" onClick={() => this.menu_select('sort_by','z_a')}>
                                <div className="main-page-desktop-aside-menu-box-option-icon" style={this.state.sort_by === 'z_a' ? {display: 'flex'} : {visibility: 'hidden'}}>
                                    <span className="material-icons" style={this.state.sort_by === 'z_a' ? {color: 'red', fontWeight: 'bold'} : {}}>done</span>
                                </div>
                                <div className="main-page-desktop-aside-menu-box-option-text" style={this.state.sort_by === 'z_a' ? {fontWeight: 'bold'} : {}}>Z-A</div>
                            </div>
                        </div>
                    </div>
                    <div className="main-page-desktop-aside-menu-box">
                        <div className="main-page-desktop-aside-menu-box-title">Display mode</div>
                        <div className="main-page-desktop-aside-menu-box-option-list">
                            <div className="main-page-desktop-aside-menu-box-option" onClick={() => this.menu_select('display_mode','grid')}>
                                <div className="main-page-desktop-aside-menu-box-option-icon">
                                    <span className="material-icons" style={this.state.display_mode === 'grid' ? {fontWeight: 'bold'} : {}}>grid_view</span>
                                </div>
                                <div className="main-page-desktop-aside-menu-box-option-text" style={this.state.display_mode === 'grid' ? {fontWeight: 'bold'} : {}}>Instaview</div>
                            </div>
                            <div className="main-page-desktop-aside-menu-box-option" onClick={() => this.menu_select('display_mode','list')}>
                                <div className="main-page-desktop-aside-menu-box-option-icon">
                                    <span className="material-icons" style={this.state.display_mode === 'list' ? {fontWeight: 'bold'} : {}}>list</span>
                                </div>
                                <div className="main-page-desktop-aside-menu-box-option-text" style={this.state.display_mode === 'list' ? {fontWeight: 'bold'} : {}}>List</div>
                            </div>
                        </div>
                    </div>
                    <div className="main-page-desktop-aside-menu-contact">
                        <div className="main-page-desktop-aside-menu-contact-item">
                            <div className="main-page-desktop-aside-menu-contact-item-icon"></div>
                            <div className="main-page-desktop-aside-menu-contact-item-text">+55 48 90000 0000</div>
                        </div>
                        <div className="main-page-desktop-aside-menu-contact-item">
                            <div className="main-page-desktop-aside-menu-contact-item-icon">
                                <span className="material-icons">local_phone</span>
                            </div>
                            <div className="main-page-desktop-aside-menu-contact-item-text">+5548900000000</div>
                        </div>
                        <div className="main-page-desktop-aside-menu-contact-item">
                            <div className="main-page-desktop-aside-menu-contact-item-icon">
                                <span className="material-icons">markunread</span>
                            </div>
                            <div className="main-page-desktop-aside-menu-contact-item-text">help@mail.com</div>
                        </div>
                        <div className="main-page-desktop-aside-menu-contact-item">
                            <div className="main-page-desktop-aside-menu-contact-item-icon">
                                <span className="material-icons">pages</span>
                            </div>
                            <div className="main-page-desktop-aside-menu-contact-item-text">@instagram</div>
                        </div>
                        <div className="main-page-desktop-aside-menu-contact-item">
                            <div className="main-page-desktop-aside-menu-contact-item-icon">
                                <span className="material-icons">fmd_good</span>
                            </div>
                            <div className="main-page-desktop-aside-menu-contact-item-text">Rodovia José Carlos Daux, 4150, São Paulo - SP</div>
                        </div>
                    </div>
                </div>
                <div className="main-page-desktop-content">
                    <div className="main-page-desktop-content-title">All</div>
                    <div className="main-page-desktop-content-list">
                        {this.state.filtered_products_list.map((product, index) => {
                            return (
                                <ProductItem {...this.state} product={product} key={index} {...this.props}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
