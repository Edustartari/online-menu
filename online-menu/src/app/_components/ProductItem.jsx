import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import '../../styles/ProductItem.css';
import Image from 'next/image'
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import { useStore } from '../_stores/main';
import Link from 'next/link';

function ProductItemDesktop ({ display_mode, ...props }) {
    const add_product = useStore((state) => state.add_product);

    const [hover, setHover] = useState(false);

    const product = props.product;

    return (
        <React.Fragment>
            {display_mode === 'grid' &&
                <div className="product-item-desktop-grid-container">
                    <Link href={"/product-page/" + product.code}>
                        <div className="product-item-desktop-grid" onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                            <div className="product-item-desktop-grid-img">
                                <div className="product-item-desktop-grid-opacity"></div>
                                <Image src={'/' + (product.image ? product.image : 'default_image') + '.jpg'} width={310} height={310} alt="" />
                            </div>
                            <div className="product-item-desktop-grid-content">
                                <div className="product-item-desktop-grid-title">
                                    {product.is_highlight &&
                                        <div className="product-item-desktop-grid-title-favorite">
                                            <StarIcon/>
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
                                    onClick={(event) => {event.preventDefault(), event.stopPropagation(), add_product(product)}} 
                                    className="product-item-desktop-grid-button" 
                                    style={hover ? {display: 'flex'} : {display: 'none'}}
                                >
                                    <span className="material-icons"><AddIcon/></span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            }
            {display_mode === 'list' &&
                <div className="product-item-desktop-list-container">
                    <Link href={"/product-page/" + product.code}>
                        <div className="product-item-desktop-list" onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                            <div className="product-item-desktop-list-img">
                                <div className="product-item-desktop-list-opacity"></div>
                                <Image src={'/' + (product.image ? product.image : 'default_image') + '.jpg'} width={310} height={310} alt="" />
                            </div>
                            <div className="product-item-desktop-list-content">
                                <div className="product-item-desktop-list-title">
                                    {product.is_highlight &&
                                        <div className="product-item-desktop-list-title-favorite">
                                            <StarIcon/>
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
                                    onClick={(event) => {add_product(product); event.preventDefault()}} 
                                    className="product-item-desktop-list-button" 
                                    style={hover ? {display: 'flex'} : {display: 'none'}}
                                >
                                    <span className="material-icons"><AddIcon/></span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            }
        </React.Fragment>
    )
}

function ProductItemMobile(props) {
    const add_product = useStore((state) => state.add_product);

    const product = props.product;

    return (
        <React.Fragment>
            {display_mode === 'grid' &&
                <div className="product-item-mobile-grid-container">
                    <Link href={"/product-page/" + product.code}>
                        <div className="product-item-mobile-grid">
                            <div className="product-item-mobile-grid-img">
                                <Image src={'/' + (product.image ? product.image : 'default_image') + '.jpg'} width={310} height={310} alt="" />
                            </div>
                            <div className="product-item-mobile-grid-content">
                                <div className="product-item-mobile-grid-title">
                                    {product.is_highlight &&
                                        <div className="product-item-mobile-grid-title-favorite">
                                            <StarIcon/>
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
                                    onClick={(event) => {add_product(product); event.preventDefault()}} 
                                    className="product-item-mobile-grid-button" 
                                >
                                    <span className="material-icons"><AddIcon/></span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            }
            {display_mode === 'list' &&
                <div className="product-item-mobile-list-container">
                    <Link href={"/product-page/" + product.code}>
                        <div className="product-item-mobile-list">
                            <div className="product-item-mobile-list-img">
                                <Image src={'/' + (product.image ? product.image : 'default_image') + '.jpg'} width={310} height={310} alt="" />
                                <div 
                                    onClick={(event) => {add_product(product); event.preventDefault()}} 
                                    className="product-item-mobile-list-button" 
                                >
                                    <span className="material-icons"><AddIcon/></span>
                                </div>
                            </div>
                            <div className="product-item-mobile-list-content">
                                <div className="product-item-mobile-list-title">
                                    {product.is_highlight &&
                                        <div className="product-item-mobile-list-title-favorite">
                                            <StarIcon/>
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

export default function ProductItem(props) {
    if(isMobile){
        return(<ProductItemMobile {...props}/>)
    } else {
        return(<ProductItemDesktop {...props}/>)
    }
}