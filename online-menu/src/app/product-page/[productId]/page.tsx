"use client"
import React, { Component, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import '../../../styles/ProductPage.css';
import cards from '../../../../public/cards.png';
import paid_market from '../../../../public/paid_market.png';
import whatsapp_icon from '../../../../public/whatsapp_icon.png';
import products_list from '../../products.json';
import Link from 'next/link';
import Image from 'next/image'
import { useStore } from '../../_stores/main';

const ProductPageDesktop = (props) => {

  const add_product = useStore((state) => state.add_product);

  const pathname = window.location.pathname;
  const [product, setProduct] = React.useState(null);
  useEffect(() => {
    let product_code = pathname.slice(1);
    let product = products_list.products.filter((element) => element.code === parseInt(product_code.split('/')[1]))
    product = product[0]
    console.log(product);
    setProduct(product);
  }, [pathname, props]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-desktop-main-container">
      <div className="product-desktop-image">
        <Image src={'/' + (product.image ? product.image : 'default_image') + '.jpg'} width={310} height={310} alt="" />
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
            <Image src={'/' + (cards ? cards : 'default_image') + '.jpg'} width={310} height={310} alt="" />
          </div>
          <div className="product-desktop-payment-market">
            <div className="product-desktop-payment-market-text">Processed by</div>
            <Image src={'/' + (paid_market ? paid_market : 'default_image') + '.jpg'} width={310} height={310} alt="" />
          </div>
        </div>
        <div className="product-desktop-description">{product.description}</div>
        <div className="product-desktop-buttons">
          <div className="product-desktop-add-button" onClick={(event) => { add_product(product); event.stopPropagation() }}>
            <div className="product-desktop-add-button-text">Add item</div>
            <div className="product-desktop-add-button-icon">
              <span className="material-icons">add</span>
            </div>
          </div>
          <div className="product-desktop-whatsapp-button">
            <Image src={'/' + (whatsapp_icon ? whatsapp_icon : 'default_image') + '.jpg'} width={310} height={310} alt="" />
            <div className="product-desktop-whatsapp-button-text">Order by Whatsapp</div>
          </div>
        </div>
      </div>
    </div>
  )
}


const ProductPageMobile = (props) => {
  const add_product = useStore((state) => state.add_product);

  let pathname = window.location.pathname;

  var total_units = this.props.products.map((item) => item.amount);
  // Sum all the units in the cart whithout using lodash

  total_units = total_units.reduce((accumulator, currentValue) => accumulator + currentValue);

  let product_code = window.location.pathname.slice(1);
  let product = products_list.products.filter((element) => element.code === parseInt(product_code))
  product = product[0]

  var product_image;
  if (product.image.length > 0) {
    Image = require('../../../../public/' + product.image + '.jpg');
    product_image = Image.default
  } else {
    Image = require('../../../../public/default_image.jpg');
    product_image = Image.default
  }

  return (
    <div className="product-mobile-main-container">
      <div className="product-mobile-image">
        <img loading="lazy" src={product_image} alt="" />
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
            <img loading="lazy" src={cards} alt="" />
          </div>
          <div className="product-mobile-payment-market">
            <div className="product-mobile-payment-whatsapp-button">
              <div className="product-mobile-payment-whatsapp-text">Order by</div>
              <img loading="lazy" src={whatsapp_icon} alt="" />
            </div>
            <div className="product-mobile-payment-market-column">
              <div className="product-mobile-payment-market-text">Processed by</div>
              <img loading="lazy" src={paid_market} alt="" />
            </div>
          </div>
        </div>
        <div className="product-mobile-description">{product.description}</div>
        <div className="product-mobile-buttons">
          <Link to="/checkout">
            <div className="product-mobile-cart-button">
              <div className="product-mobile-cart-button-icon">
                <span className="material-icons">shopping_cart</span>
              </div>
              <div className="product-mobile-cart-button-number">{total_units}</div>
            </div>
          </Link>
          <div className="product-mobile-add-button" onClick={(event) => { add_product(product); event.stopPropagation() }}>
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

export default function ProductPage(props) {
  if (isMobile) {
    return (<ProductPageMobile {...props} />)
  } else {
    return (<ProductPageDesktop {...props} />)
  }
}
