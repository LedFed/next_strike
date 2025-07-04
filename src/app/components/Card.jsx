'use client';
import React, { useEffect, useState } from 'react'
import CardItem from '../../app/components/CardItem';
// import Loading from '../dashboard/loading';
import { useCart } from '../../app/context/CartProvider';
// import { getProductsData } from '../../app/lib/getProductsData';
// import fs from 'fs';
// import path from 'path';

export default function Card() {
    const [visibleCount, setVisibleCount] = useState(4); //Задаем кол-во выдаваемых элементов на странице
    const { toggleCartItem, cart, loadCartFromLocalStorage, products, formatNumber } = useCart();
    const [items, setItems] = useState([]);

    // const handleClick = () => {
    //     // Плавная прокрутка к началу страницы
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth'
    //     });
    // };
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

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 12);
    };

    useEffect(() => {
        // Устанавливаем items при изменении products
        setItems(products);
    }, [products]); // Добавляем products как зависимость

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         // const response = await fetch('/api/products');
    //         // const data = await response.json();
    //         setItems(products);
    //     };

    //     fetchProducts();
    // }, []);

    // const getProduct = async () => {
    //     try {
    //         const response = await fetch('/api/products');
    //         // const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bdlist.json');
    //         // const jsonData = fs.readFileSync(filePath);
    //         // const data = JSON.parse(jsonData);
    //         const data = await response.json();
    //         return data; // Верните данные для использования в useEffect
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const products = await getProduct();
    //         setItems(products);
    //         console.log(items);
    //     };

    //     fetchProducts();
    // }, []);

    // useEffect(() => {
    //     console.log(products); // Логируем продукты в консоль
    //     console.log(products.length);
    // }, [products]);
   
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

                {
                     items.slice(0, visibleCount).map(item => (
                        <CardItem key={item.code} product={item} />
                    ))
                }

                {/* {
                    items.map(item => (
                        <CardItem  key={item.code} product={item} />
                    )
                    )} */}
                {/* {products.length > 0 ? (
                    products.slice(0, visibleCount).map(item => (
                        <CardItem key={item.code} product={item} />
                        <div>fds</div>
                    ))
                ): (
                    <div>Загрузка</div>
                )} */}
                {/* {products.map(item => (
                    <CardItem key={item.code} product={item} />
                ))} */}
            </div>

            {visibleCount < items.length && (
                <div className="btn" onClick={handleShowMore}>Показать еще</div>
            )}
        </>
    )
}
