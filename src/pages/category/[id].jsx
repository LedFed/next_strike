'use client';

import { useRouter } from 'next/router';
import Breadcrumbs from "../../app/components/Breadcrumbs";
import CardItem from '../../app/components/CardItem';
import "@/app/globals.css";

export async function getStaticPaths() {
    try {
        const response = await fetch('https://api.moysklad.ru/api/remap/1.2/entity/product', {
            headers: {
                'Authorization': 'Bearer 04c229acda627c250062de4c2a82b1bc3c9293d5',
                'Accept-Encoding': 'gzip',
            },
            params: {
                expand: 'images, attributes',
                limit: 100,
                // fields: 'stock', 
            },
        });

        const data = await response.json();

        const paths = data.rows.map(product => ({
            params: { id: product.pathName.toString() },
        }));

        console.log(paths);

        return { paths, fallback: false };
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({ params }) {
    try {
        const response = await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/product?filter=pathName=${params.id}`, {
            headers: {
                'Authorization': 'Bearer 04c229acda627c250062de4c2a82b1bc3c9293d5',
                'Accept-Encoding': 'gzip',
            },
            params: {
                expand: 'images, attributes',
                limit: 100,
            },

        });
        const data = await response.json();
        // console.log(data);
        const product = data.rows;
        // const product = data.rows.find(i => i.pathName === params.id) || null; // Если продукт не найден, возвращаем null
        console.log('Вернем это!!!' + product);
        return { props: { product } };
    } catch (error) {
        console.error('Ошибка при получении данных продукта:', error);
        return { props: { product: null } };
    }
}

const Stage = ({ product }) => {

    const breadcrumbsItems = [
        { title: 'Главная', link: '/' },
        { title: product.pathName, link: `/product/${product.id}` }
    ];
    return (
        <div>
            <div className="container">
                <Breadcrumbs items={breadcrumbsItems} />
                <div className="card_items">
                    {
                        product.map(i => (
                            <CardItem product={i} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Stage;

