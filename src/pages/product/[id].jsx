'use client';

import { useRouter } from 'next/router';
import Breadcrumbs from "../../app/components/Breadcrumbs";
import CardItem from '../../app/components/CardItem';
import "@/app/globals.css";
// import bd from '@/bd_list.json';
import axios from 'axios';
import Productpages from '../../app/components/Productpages';
import fs from 'fs';
import path from 'path';

// export async function getStaticPaths() {
//     try {
//         // const response = await axios.get('http://localhost:3000/api/products'); // замените на ваш путь
//         const response = await fetch('https://api.moysklad.ru/api/remap/1.2/entity/product', {
//             headers: {
//                 'Authorization': 'Bearer 04c229acda627c250062de4c2a82b1bc3c9293d5',
//                 'Accept-Encoding': 'gzip',
//             },
//             params: {
//                 expand: 'images, attributes',
//                 limit: 100,
//                 // fields: 'stock', 
//             },
//         });
//         const data = await response.json();
//         console.log(data.rows[0] + 'Получение данных при монтирование путей ');
//         const paths = data.rows.map(product => ({
//             params: { id: product.code.toString() },
//         }));

//         console.log(paths);

//         return { paths, fallback: false };
//     } catch (error) {
//         console.error('Ошибка при получении данных:', error);
//         return { paths: [], fallback: false };
//     }
// }

// export async function getStaticProps({ params }) {
//     try {
//         const response = await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/product?${params.id}`, {
//             headers: {
//                 'Authorization': 'Bearer 04c229acda627c250062de4c2a82b1bc3c9293d5',
//                 'Accept-Encoding': 'gzip',
//             },
//             params: {
//                 expand: 'images, attributes',
//                 limit: 100,
//             },

//         });

//         if (!response.ok) {
//             throw new Error(`Ошибка сети: ${response.status} - ${response.statusText}`);
//         }
//         const data = await response.json();
//         const product = data.rows.find(i => i.code === params.id) || null; // Если продукт не найден, возвращаем null
//         console.log('Вернем это!!!' + product);
//         return { props: { product } };
//     } catch (error) {
//         console.error('Ошибка при получении данных продукта:', error);
//         return { props: { product: null } };
//     }
//     // return { props: { product: response.data } };
// }

// export async function getStaticPaths() {
//     try {
//         const response = await fetch('https://api.moysklad.ru/api/remap/1.2/entity/product', {
//             headers: {
//                 'Authorization': 'Bearer 04c229acda627c250062de4c2a82b1bc3c9293d5',
//                 'Accept-Encoding': 'gzip',
//             },
//             params: {
//                 expand: 'images, attributes',
//                 limit: 100,
//                 // fields: 'stock', 
//             },
//         });
//         const data = await response.json();
//         console.log(data.rows + 'получение путей');
//         const paths = data.rows.map(product => ({
//             params: { id: product.code.toString() },
//         }));

//         return { paths, fallback: 'blocking' }; // Используем fallback
//     } catch (error) {
//         console.error('Ошибка при получении данных:', error);
//         return { paths: [], fallback: false };
//     }
// }

// export async function getStaticProps({ params }) {
//     try {
//         // const response = await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/product?${params.id}`, {
//         const response = await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/product`, {
//             headers: {
//                 'Authorization': 'Bearer 04c229acda627c250062de4c2a82b1bc3c9293d5',
//                 'Accept-Encoding': 'gzip',
//             },
//             params: {
//                 expand: 'images, attributes',
//                 limit: 100,
//                 // fields: 'stock', // Добавляем параметр fields
//             },

//         });

//         if (!response.ok) {
//             throw new Error(`Ошибка сети: ${response.status} - ${response.statusText}`);
//         }
//         const data = await response.json();
//         const product = data.rows.find(i => i.code === params.id) || null;
//         // const product = data.rows.find(i => i.code === params.id) || null;
//         const imagess = await product.images.meta.href;
//         const responseImage = await fetch(imagess, {
//             headers: {
//                 'Authorization': 'Bearer 04c229acda627c250062de4c2a82b1bc3c9293d5',
//                 'Accept-Encoding': 'gzip',
//             },
//             params: {
//                 expand: 'images, attributes',
//                 limit: 100,
//                 fields: 'stock',
//             },
//         })
//         const imagesData = await responseImage.json();
//         // const data = await response.json();
//         // const product = data.rows.find(i => i.code === params.id) || null; // Если продукт не найден, возвращаем null
//         // console.log(product + 'Оу');
//         // return { props: { product } };
//         return { props: { product, images: imagesData } }
//     } catch (error) {
//         console.error('Ошибка при получении данных продукта:', error);
//         return { props: { product: null } }; // Возвращаем null, если продукт не найден
//     }
// }

export async function getStaticPaths() {
    try {

        const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bdlist.json');
        const jsonData = fs.readFileSync(filePath);
        // const apiUrl = process.env.URL;
        const data = JSON.parse(jsonData);
        // console.log('Fetching data from:', apiUrl);
        // const response = await fetch(`${apiUrl}/api/bdlist.json`)
        // const response = await axios.get(`./bdlist.json`)
        // const response = await axios()
        // if (!response.ok) {
        //     throw new Error('Ошибка при получении данных здесь');
        // }
        // const data = await response.json();

        // const data = response.data;

        const paths = data.map(product => ({
            params: { id: product.code.toString() },
        }));
        console.log(paths);
        return { paths, fallback: 'blocking' }; // Используем fallback
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({ params }) {
    try {
        const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bdlist.json');
        const jsonData = fs.readFileSync(filePath);
        const data = JSON.parse(jsonData);

        // const response = await fetch(`./bdlist.json`);
        // if (!response.data.rows) {
        //     throw new Error(`Ошибка сети: Продукты не найдены`);
        // }
        // const data = await response.json();
        // Ищем продукт по его коду
        const product = data.find(i => i.code.toString() === params.id) || null;
        console.log(product);
        return { props: { product } };
    } catch (error) {
        console.error('Ошибка при получении данных продукта:', error);
        return { props: { product: null } }; // Возвращаем null, если продукт не найден
    }
}
const Stage = ({ product }) => {

    const breadcrumbsItems = [
        { title: 'Главная', link: '/' },
        { title: product && product?.name || 'товар', link: `/product/${product?.code || ''}` }
    ];
    return (
        <div>

            <div className="container">
                <Breadcrumbs items={breadcrumbsItems} />
                <Productpages
                    product={product}
                // images={images}
                />
                {/* <div className="card_items"> */}
                {/* {
                        product.map(i => (
                            <Productpages
                                product={i}
                            />
                        ))} */}

                {/* <CardItem product={product} /> */}
                {/* </div> */}
            </div>

        </div>
    );
};

export default Stage;
