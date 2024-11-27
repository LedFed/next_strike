// app/pages/products.js (или другой файл страницы)
import React from 'react';
import { getProductsData } from '../../app/lib/getProductsData';

const More = ({ products }) => {
    console.log(products);
    return (
        <div>
            <h1>Продукты</h1>
            <ul>
                {/* {products.map(product => (
                    <li key={product.id}>{product.code}</li>
                ))} */}
            </ul>
        </div>
    );
};

export async function getStaticProps() {
    let products = [];
    try {
        products = await getProductsData(); // Получаем данные продуктов
        console.log(products);
    } catch (error) {
        console.error(error);
    }

    return {
        props: {
            products,
        },
        // revalidate: 10, // Опционально: обновление данных каждые 10 секунд
    };
}

export default More;
