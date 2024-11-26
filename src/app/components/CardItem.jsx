'use client';
import React from 'react'
import { useCart } from '../context/CartProvider';
import Link from 'next/link'

export default function CardItem({ product }) {
    // const { toggleCartItem, formatNumber } = useCart();
    console.log(product.images + 'Карточка');
    return (
        <Link className="card_item" href={`/product/${product.code}`} passHref >
            {/* <img src={product.images.rows[0].meta.downloadHref} alt={product.name} className="card_img" /> */}
            {/* {product.images.rows[0].filename ? 
            <img src={`../img/${product.images.rows[0].filename}`} alt={product.name} className="card_img"/> : <div>Нет изображений</div>} */}
            <h3 className="card_title">{product.name}</h3>
            <p className="card_arct">Артикул:{product.article}</p>
            <div className="card_bottom">
                {/* <p className="card_price">{formatNumber(product.salePrices[0].value)}</p> */}
                {/* <div className="addCard" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    toggleCartItem(product);
                }}></div> */}
            </div>
        </Link>
    )
}
