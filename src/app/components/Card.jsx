'use client';
import React, { useEffect, useState } from 'react'
import CardItem from '../../app/components/CardItem';
import { useCart } from '../../app/context/CartProvider';


export default function Card() {
    const [items, setItems] = useState([]);
    const [visibleCount, setVisibleCount] = useState(3); //Задаем кол-во выдаваемых элементов на странице
    const { toggleCartItem, cart, loadCartFromLocalStorage, products, formatNumber } = useCart();
    // console.log(products);
    // const getProduct = async () => {
    //     try {
    //         const response = await fetch('/api/products');
    //         const data = await response.json();
    //         console.log(data);
    //         return data.rows; // Верните данные для использования в useEffect
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const products = await getProduct();
    //         setItems(products);
    //     };

    //     fetchProducts();
    // }, []);

    // const handleShowMore = () => {
    //     setVisibleCount(prevCount => prevCount + 4);
    // };
   

    useEffect(() => {
        console.log(products); // Логируем продукты в консоль
        console.log(products.length);
    }, [products]);
    return (
        <>
            <div className="card_items">
                {/* {items.length > 0 ? (
                    items.slice(0, visibleCount).map(item => (
                        <CardItem key={item.code} product={item} />
                    ))
                ) : (
                    <div>Загрузка</div>
                )} */}
                {products.length > 0 ? (
                    products.slice(0, visibleCount).map(item => (
                        <CardItem key={item.code} product={item} />
                    ))
                ): (
                    <div>Загрузка</div>
                )}
                {/* {products.map(item => (
                    <CardItem key={item.code} product={item} />
                ))} */}
            </div>

            {/* {visibleCount < items.length && (
                <div className="btn" onClick={handleShowMore}>Показать еще</div>
            )} */}
        </>
    )
}
