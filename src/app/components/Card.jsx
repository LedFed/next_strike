import React, { useEffect, useState } from 'react'
import CardItem from '../../app/components/CardItem';


export default function Card() {
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
    }, []); 

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 4); 
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

            {visibleCount < items.length && ( 
                <div className="btn" onClick={handleShowMore}>Показать еще</div>
            )}
        </>
    )
}
