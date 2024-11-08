'use client';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function More() {
    const [items, setItems] = useState([]);

    const getProduct = async () => {
        const response = await fetch('/api/products');
        const data = await response.json();
        console.log(data);
        return data.rows; 
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProduct();
            setItems(products);
        };

        fetchProducts();
    }, []); // Пустой массив зависимостей

    return (
        <>
            {items.length > 0 ? (
                items.map(item => (
                    <Link key={item.id} href={`/product/${item.code}`}>{item.name}</Link >
                ))
            ) : (
                <div>Загрузка</div>
            )
            }
        </>
    )
}
