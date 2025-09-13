'use client';
import React, { useEffect } from 'react'
import { useCart } from '../context/CartProvider';
import Link from 'next/link'
// import { useRouter } from 'next/router';

export default function CardItem({ product }) {
    const { toggleCartItem, cart } = useCart();
    const filename = product && product.src && product.src.length >= 1
        ? product.src[0]
        : 'defaultFilename.jpg';

    const handleAddToCart = () => {
        toggleCartItem(product); // Вызываем функцию при добавлении товара
    };

    // const router = useRouter();

    // const scrollToTop = () => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth',
    //     });
    // };

    // useEffect(() => {
    //     const handleRouteChange = () => {
    //         scrollToTop();
    //     };

    //     router.events.on('routeChangeComplete', handleRouteChange);

    //     return () => {
    //         router.events.off('routeChangeComplete', handleRouteChange);
    //     };
    // }, [router.events]);

    return (
        <Link className="card_item" href={`/product/${product.code}`} passHref scroll={true} >
            {/* <img src={`../img/${product.src[0]}`} alt={product.name} className="card_img" /> */}
            {filename !== 'defaultFilename' ? (
                <img src={`../img/${filename}`} alt={product.name} className="card_img" />
            ) : (
                <div>Нет изображений</div>
            )}
            <h3 className="card_title">{product.name}</h3>
            <p className="card_arct">Артикул:{product.article}</p>
            <div className="card_bottom">
                <p className="card_price">{product.price}</p>
                {/* <div className="addCard" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    toggleCartItem(product);
                }}></div> */}

                <div className={cart.some(item => item.id === product.id) ? `addCard active` : 'addCard'}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart()
                    }}>
                    {/* {cart.some(item => item.id === product.id) ? 'Удалить из корзины' : "Добавить в корзину"} */}
                </div>
            </div>
        </Link>
    )
}
