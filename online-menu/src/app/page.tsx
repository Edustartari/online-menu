"use client"
import React, { useState } from 'react';
import Image from "next/image";
import "../styles/page.css";
import '../styles/MainPage.css';
import { isMobile } from 'react-device-detect';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import whatsapp_icon from '../assets/whatsapp_icon.png';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import DoneIcon from '@mui/icons-material/Done';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import TagIcon from '@mui/icons-material/Tag';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import ProductItem from './_components/ProductItem.jsx';
import products_list from './products.json';

import { useStore } from './_stores/main';

function MainPageDesktop() {

  const add_product = useStore((state) => state.add_product);
  const checkout_products_list = useStore((state: any) => state.checkout_products_list);

  const [category, setCategory] = useState('All');
  const [sort_by, setSortBy] = useState('category');
  const [display_mode, setDisplayMode] = useState('grid'); // grid, list
  const [original_products_list, setOriginalProductsList] = useState(products_list.products);
  const [filtered_products_list, setFilteredProductsList] = useState(products_list.products);

  const sort_list = (list, value) => {
    let sortedObjs;
    if (value === 'category') {
      sortedObjs = list.sort((a, b) => a.category.localeCompare(b.category));
    } else if (value === 'lowest_price') {
      sortedObjs = list.sort((a, b) => a.price - b.price);
    } else if (value === 'highest_price') {
      sortedObjs = list.sort((a, b) => b.price - a.price);
    } else if (value === 'a_z') {
      sortedObjs = list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (value === 'z_a') {
      sortedObjs = list.sort((a, b) => b.title.localeCompare(a.title));
    }
    setFilteredProductsList(sortedObjs);
  }

  const menu_select = (option, value) => {
    if (option === 'category') {
      setCategory(value);
    } else if (option === 'sort_by') {
      setSortBy(value);
    } else if (option === 'display_mode') {
      setDisplayMode(value);
    }
    if (option === 'category') {
      let temporary_list = [...original_products_list]
      let new_list;
      if (value === 'All') {
        new_list = temporary_list
      } else if (value === 'Highlights') {
        new_list = temporary_list.filter((item) => item.is_highlight)
      } else {
        new_list = temporary_list.filter((item) => item.category === value)
      }
      sort_list(new_list, sort_by)
    }

    if (option === 'sort_by') {
      sort_list(filtered_products_list, value)
    }
  }

  return (
    <div className="main-page-desktop-container">
      <div className="main-page-desktop-aside-menu">
        <div className="main-page-desktop-aside-menu-box">
          <div className="main-page-desktop-aside-menu-box-title">Categories</div>
          <div className="main-page-desktop-aside-menu-box-option-list">
            <div className="main-page-desktop-aside-menu-box-option" onClick={() => menu_select('category', 'All')}>
              <div className="main-page-desktop-aside-menu-box-option-icon" style={category === 'All' ? { display: 'flex' } : { visibility: 'hidden' }}>
                <span className="material-icons" style={category === 'All' ? { color: 'red', fontWeight: 'bold' } : {}}><DoneIcon /></span>
              </div>
              <div className="main-page-desktop-aside-menu-box-option-text" style={category === 'All' ? { fontWeight: 'bold' } : {}}>All</div>
            </div>
            <div className="main-page-desktop-aside-menu-box-option" onClick={() => menu_select('category', 'Highlights')}>
              <div className="main-page-desktop-aside-menu-box-option-icon" style={category === 'Highlights' ? { display: 'flex' } : { visibility: 'hidden' }}>
                <span className="material-icons" style={category === 'Highlights' ? { color: 'red', fontWeight: 'bold' } : {}}><DoneIcon /></span>
              </div>
              <div className="main-page-desktop-aside-menu-box-option-text" style={category === 'Highlights' ? { fontWeight: 'bold' } : {}}>Highlights</div>
            </div>
            <div className="main-page-desktop-aside-menu-box-option" onClick={() => menu_select('category', 'Drinks')}>
              <div className="main-page-desktop-aside-menu-box-option-icon" style={category === 'Drinks' ? { display: 'flex' } : { visibility: 'hidden' }}>
                <span className="material-icons" style={category === 'Drinks' ? { color: 'red', fontWeight: 'bold' } : {}}><DoneIcon /></span>
              </div>
              <div className="main-page-desktop-aside-menu-box-option-text" style={category === 'Drinks' ? { fontWeight: 'bold' } : {}}>Drinks</div>
            </div>
            <div className="main-page-desktop-aside-menu-box-option" onClick={() => menu_select('category', 'Coffee')}>
              <div className="main-page-desktop-aside-menu-box-option-icon" style={category === 'Coffee' ? { display: 'flex' } : { visibility: 'hidden' }}>
                <span className="material-icons" style={category === 'Coffee' ? { color: 'red', fontWeight: 'bold' } : {}}><DoneIcon /></span>
              </div>
              <div className="main-page-desktop-aside-menu-box-option-text" style={category === 'Coffee' ? { fontWeight: 'bold' } : {}}>Coffee</div>
            </div>
            <div className="main-page-desktop-aside-menu-box-option" onClick={() => menu_select('category', 'Snacks')}>
              <div className="main-page-desktop-aside-menu-box-option-icon" style={category === 'Snacks' ? { display: 'flex' } : { visibility: 'hidden' }}>
                <span className="material-icons" style={category === 'Snacks' ? { color: 'red', fontWeight: 'bold' } : {}}><DoneIcon /></span>
              </div>
              <div className="main-page-desktop-aside-menu-box-option-text" style={category === 'Snacks' ? { fontWeight: 'bold' } : {}}>Snacks</div>
            </div>
            <div className="main-page-desktop-aside-menu-box-option" onClick={() => menu_select('category', 'Dessert')}>
              <div className="main-page-desktop-aside-menu-box-option-icon" style={category === 'Dessert' ? { display: 'flex' } : { visibility: 'hidden' }}>
                <span className="material-icons" style={category === 'Dessert' ? { color: 'red', fontWeight: 'bold' } : {}}><DoneIcon /></span>
              </div>
              <div className="main-page-desktop-aside-menu-box-option-text" style={category === 'Dessert' ? { fontWeight: 'bold' } : {}}>Desserts</div>
            </div>
          </div>
        </div>
        <div className="main-page-desktop-aside-menu-box">
          <div className="main-page-desktop-aside-menu-box-title">Sort by</div>
          <div className="main-page-desktop-aside-menu-box-option-list">
            <div className="main-page-desktop-aside-menu-box-option" onClick={() => menu_select('sort_by', 'category')}>
              <div className="main-page-desktop-aside-menu-box-option-icon" style={sort_by === 'category' ? { display: 'flex' } : { visibility: 'hidden' }}>
                <span className="material-icons" style={sort_by === 'category' ? { color: 'red', fontWeight: 'bold' } : {}}><DoneIcon /></span>
              </div>
              <div className="main-page-desktop-aside-menu-box-option-text" style={sort_by === 'category' ? { fontWeight: 'bold' } : {}}>Categories</div>
            </div>
            <div className="main-page-desktop-aside-menu-box-option" onClick={() => menu_select('sort_by', 'lowest_price')}>
              <div className="main-page-desktop-aside-menu-box-option-icon" style={sort_by === 'lowest_price' ? { display: 'flex' } : { visibility: 'hidden' }}>
                <span className="material-icons" style={sort_by === 'lowest_price' ? { color: 'red', fontWeight: 'bold' } : {}}><DoneIcon /></span>
              </div>
              <div className="main-page-desktop-aside-menu-box-option-text" style={sort_by === 'lowest_price' ? { fontWeight: 'bold' } : {}}>Lowest price</div>
            </div>
            <div className="main-page-desktop-aside-menu-box-option" onClick={() => menu_select('sort_by', 'highest_price')}>
              <div className="main-page-desktop-aside-menu-box-option-icon" style={sort_by === 'highest_price' ? { display: 'flex' } : { visibility: 'hidden' }}>
                <span className="material-icons" style={sort_by === 'highest_price' ? { color: 'red', fontWeight: 'bold' } : {}}><DoneIcon /></span>
              </div>
              <div className="main-page-desktop-aside-menu-box-option-text" style={sort_by === 'highest_price' ? { fontWeight: 'bold' } : {}}>Highest price</div>
            </div>
            <div className="main-page-desktop-aside-menu-box-option" onClick={() => menu_select('sort_by', 'a_z')}>
              <div className="main-page-desktop-aside-menu-box-option-icon" style={sort_by === 'a_z' ? { display: 'flex' } : { visibility: 'hidden' }}>
                <span className="material-icons" style={sort_by === 'a_z' ? { color: 'red', fontWeight: 'bold' } : {}}><DoneIcon /></span>
              </div>
              <div className="main-page-desktop-aside-menu-box-option-text" style={sort_by === 'a_z' ? { fontWeight: 'bold' } : {}}>A-Z</div>
            </div>
            <div className="main-page-desktop-aside-menu-box-option" onClick={() => menu_select('sort_by', 'z_a')}>
              <div className="main-page-desktop-aside-menu-box-option-icon" style={sort_by === 'z_a' ? { display: 'flex' } : { visibility: 'hidden' }}>
                <span className="material-icons" style={sort_by === 'z_a' ? { color: 'red', fontWeight: 'bold' } : {}}><DoneIcon /></span>
              </div>
              <div className="main-page-desktop-aside-menu-box-option-text" style={sort_by === 'z_a' ? { fontWeight: 'bold' } : {}}>Z-A</div>
            </div>
          </div>
        </div>
        <div className="main-page-desktop-aside-menu-box">
          <div className="main-page-desktop-aside-menu-box-title">Display mode</div>
          <div className="main-page-desktop-aside-menu-box-option-list">
            <div className="main-page-desktop-aside-menu-box-option" onClick={() => menu_select('display_mode', 'grid')}>
              <div className="main-page-desktop-aside-menu-box-option-icon">
                <span className="material-icons" style={display_mode === 'grid' ? { fontWeight: 'bold' } : {}}><GridViewIcon /></span>
              </div>
              <div className="main-page-desktop-aside-menu-box-option-text" style={display_mode === 'grid' ? { fontWeight: 'bold' } : {}}>Instaview</div>
            </div>
            <div className="main-page-desktop-aside-menu-box-option" onClick={() => menu_select('display_mode', 'list')}>
              <div className="main-page-desktop-aside-menu-box-option-icon">
                <span className="material-icons" style={display_mode === 'list' ? { fontWeight: 'bold' } : {}}><ViewListIcon /></span>
              </div>
              <div className="main-page-desktop-aside-menu-box-option-text" style={display_mode === 'list' ? { fontWeight: 'bold' } : {}}>List</div>
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
              <span className="material-icons"><PhoneAndroidIcon /></span>
            </div>
            <div className="main-page-desktop-aside-menu-contact-item-text">+5548900000000</div>
          </div>
          <div className="main-page-desktop-aside-menu-contact-item">
            <div className="main-page-desktop-aside-menu-contact-item-icon">
              <span className="material-icons"><EmailIcon /></span>
            </div>
            <div className="main-page-desktop-aside-menu-contact-item-text">help@mail.com</div>
          </div>
          <div className="main-page-desktop-aside-menu-contact-item">
            <div className="main-page-desktop-aside-menu-contact-item-icon">
              <span className="material-icons"><TagIcon /></span>
            </div>
            <div className="main-page-desktop-aside-menu-contact-item-text">@instagram</div>
          </div>
          <div className="main-page-desktop-aside-menu-contact-item">
            <div className="main-page-desktop-aside-menu-contact-item-icon">
              <span className="material-icons"><LocationOnIcon /></span>
            </div>
            <div className="main-page-desktop-aside-menu-contact-item-text">Rodovia José Carlos Daux, 4150, São Paulo - SP</div>
          </div>
        </div>
      </div>
      <div className="main-page-desktop-content">
        <div className="main-page-desktop-content-title">{category}</div>
        <div className="main-page-desktop-content-list">
          {filtered_products_list.map((product, index) => {
            return (
              <ProductItem product={product} key={index} display_mode={display_mode} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function FilterDrawer(props) {
  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 290 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="filter-drawer-mobile-container">
        <div className='filter-drawer-mobile-options' onClick={() => props.menu_select('sort_by', 'category')} >Categories</div>
        <div className='filter-drawer-mobile-options' onClick={() => props.menu_select('sort_by', 'lowest_price')} >Lowest price</div>
        <div className='filter-drawer-mobile-options' onClick={() => props.menu_select('sort_by', 'highest_price')} >Highest price</div>
        <div className='filter-drawer-mobile-options' onClick={() => props.menu_select('sort_by', 'a_z')} >A-Z</div>
        <div className='filter-drawer-mobile-options' onClick={() => props.menu_select('sort_by', 'z_a')} >Z-A</div>
      </div>
    </Box>
  );

  return (
    <div className="filter-drawer-mobile-main-container">
      <React.Fragment key={'bottom'}>
        <div className="main-page-mobile-menu-filter-button" onClick={toggleDrawer('bottom', true)}>
          <span className="material-icons">filter_alt</span>
        </div>
        <Drawer
          anchor={'bottom'}
          open={state['bottom']}
          onClose={toggleDrawer('bottom', false)}
          onOpen={toggleDrawer('bottom', true)}
        >
          {list('bottom')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

function MainPageMobile() {
  const [category, setCategory] = useState('All');
  const [sort_by, setSortBy] = useState('category');
  const [display_mode, setDisplayMode] = useState('grid'); // grid, list
  const [original_products_list, setOriginalProductsList] = useState(products_list.products);
  const [filtered_products_list, setFilteredProductsList] = useState(products_list.products);

  let pathname = location.pathname;

  const sort_list = (list, value) => {
    let sortedObjs;
    if (value === 'category') {
      sortedObjs = list.sort((a, b) => a.category.localeCompare(b.category));
    } else if (value === 'lowest_price') {
      sortedObjs = list.sort((a, b) => a.price - b.price);
    } else if (value === 'highest_price') {
      sortedObjs = list.sort((a, b) => b.price - a.price);
    } else if (value === 'a_z') {
      sortedObjs = list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (value === 'z_a') {
      sortedObjs = list.sort((a, b) => b.title.localeCompare(a.title));
    }
    setFilteredProductsList(sortedObjs);
  }

  const menu_select = (option, value) => {
    if (option === 'category') {
      setCategory(value);
    } else if (option === 'sort_by') {
      setSortBy(value);
    } else if (option === 'display_mode') {
      setDisplayMode(value);
    }
    if (option === 'category') {
      let temporary_list = [...original_products_list]
      let new_list;
      if (value === 'All') {
        new_list = temporary_list
      } else if (value === 'Highlights') {
        new_list = temporary_list.filter((item) => item.is_highlight)
      } else {
        new_list = temporary_list.filter((item) => item.category === value)
      }
      sort_list(new_list, sort_by)
    }

    if (option === 'sort_by') {
      sort_list(filtered_products_list, value)
    }
  }

  return (
    <div className="main-page-mobile-container">
      <div className="main-page-mobile-menu">
        <div className="main-page-mobile-menu-options">
          <Tabs value={category} onClick={(value) => menu_select('category', value.target.textContent)} aria-label="basic tabs example">
            <Tab label="All" value="All" />
            <Tab label="Highlights" value="Highlights" />
            <Tab label="Drinks" value="Drinks" />
            <Tab label="Coffee" value="Coffee" />
            <Tab label="Snacks" value="Snacks" />
            <Tab label="Dessert" value="Dessert" />
          </Tabs>
        </div>
        <div className="main-page-mobile-menu-filter">

          <FilterDrawer {...this.state} menu_select={menu_select} />

          <div className="main-page-mobile-menu-filter-button" onClick={() => this.setState({ display_mode: display_mode === 'grid' ? 'list' : 'grid' })}>
            <span className="material-icons">{display_mode === 'grid' ? 'subtitles' : 'format_list_bulleted'}</span>
          </div>
        </div>
      </div>
      <div className="main-page-mobile-content">
        <div className="main-page-mobile-content-list">
          {filtered_products_list.map((product, index) => {
            return (
              <ProductItem {...this.state} product={product} key={index} {...this.props} />
            )
          })}
        </div>
      </div>
    </div>
  )
}



export default function Home(props: any) {
  if (isMobile) {
    return (<MainPageMobile {...props} />)
  } else {
    return (<MainPageDesktop {...props} />)
  }
}