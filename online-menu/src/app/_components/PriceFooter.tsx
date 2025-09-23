import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import '../../styles/PriceFooter.css';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStore } from '../_stores/main';
import { Product } from '../_types';

const PriceFooterDesktop = () => {

  const checkout_products_list = useStore((state: any) => state.checkout_products_list);

  let prices_list = checkout_products_list.map((item: Product) => item.product_info.price * item.amount);
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

const PriceFooterMobile = () => {
  
  const checkout_products_list = useStore((state: any) => state.checkout_products_list);

  let prices_list = checkout_products_list.map((item) => item.product_info.price * item.amount);
  let total = prices_list.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  let total_units = checkout_products_list.map((item) => item.amount);
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