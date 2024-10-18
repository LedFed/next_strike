import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartProvider';
import CardItem from '../../app/components/CardItem';

export default function Card() {
    const { toggleCartItem } = useCart();
    const [items, setItems] = useState([]);
    const [visibleCount, setVisibleCount] = useState(3); //Задаем кол-во выдаваемых элементов на странице

    const getProduct = async () => {
        const response = await fetch('api/products');
        const data = await response.json();
        console.log(data);
        return data.rows; // Верните данные для использования в useEffect
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProduct();
            setItems(products);
        };

        fetchProducts();
    }, []); // Пустой массив зависимостей

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 4); // Увеличиваем количество видимых элементов на 4
    };

    return (
        <>
            <div className="card_items">
                {items.length > 0 ? (
                        items.slice(0, visibleCount).map(item => (
                            <CardItem key={item.code} product={item} />
                        ))
                    ) : (
                        <div>Загрузка</div>
                    )}   

            </div>

            {visibleCount < items.length && ( // Проверяем, есть ли еще элементы для отображения
                <div class="btn" onClick={handleShowMore}>Показать еще</div>
            )}
        </>
    )
}

{/* <Link className="card_item" key={item.code} href={`/product/${item.code}`} passHref product={item}>
<img src={item.images.rows[0].meta.downloadHref} alt={item.name} className="card_img" />
<h3 className="card_title">{item.name}</h3>
<p className="card_arct">Артикул:{item.article}</p>
<div className="card_bottom">
    <p className="card_price">{item.salePrices[0].value}</p>
    <div className="addCard" onClick={(e) => {
        e.preventDefault();
        e.stopPropagation(); // предотвращает всплытие события

        toggleCartItem(item);
    }}></div>
</div>
</Link> */}