import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import '../../styles/PriceFooter.css';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const PriceFooterDesktop = (props) => {
  let prices_list = props.products.map((item) => item.product_info.price * item.amount);
  let total = prices_list.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return (
    <div className="price-footer-desktop-container">
      <Link href="/checkout">
        <div className="price-footer-desktop-button">
          <div className="price-footer-desktop-button-text">Total: R$ {total}</div>
          <div className="price-footer-desktop-button-arrow">
            <ArrowForwardIosIcon />
          </div>
        </div>
      </Link>
    </div>
  )
}

const PriceFooterMobile = (props) => {
  let prices_list = props.products.map((item) => item.product_info.price * item.amount);
  let total = prices_list.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  let total_units = props.products.map((item) => item.amount);
  total_units = total_units.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <div className="price-footer-mobile-container">
      <Link href="/checkout">
        <div className="price-footer-mobile-button">
          <div className="price-footer-mobile-button-icon">
            <ShoppingCartIcon />
          </div>
          <div className="price-footer-mobile-button-info">
            <div className="price-footer-mobile-button-text">{total_units} itens = R$ {total}</div>
            <div className="price-footer-mobile-button-arrow">
              <ArrowForwardIosIcon />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function PriceFooter(props) {
  if (isMobile) {
    return (<PriceFooterMobile {...props} />)
  } else {
    return (<PriceFooterDesktop {...props} />)
  }
}