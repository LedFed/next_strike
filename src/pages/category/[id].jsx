'use client';

import { useRouter } from 'next/router';
import Breadcrumbs from "../../app/components/Breadcrumbs";
import CardItem from '../../app/components/CardItem';
import "@/app/globals.css";
import axios from 'axios';

// export async function getStaticPaths() {
//     try {
//         const catalog = [
//             { title: 'Гранаты', active: true, links: './icons/free-icon-grenade-1281087.svg' },
//             { title: 'Дым', active: true, links: './icons/free-icon-grenade-2514237.svg' },
//             { title: 'Растяжки-мины', active: true, links: './icons/free-icon-grenade-13091752.svg' },
//             { title: 'Пульты', active: true, links: './icons/free-icon-remote-16276269.svg' },
//             { title: 'Обмундирования', active: false, links: './icons/free-icon-paintball-1099542.svg' },
//             { title: 'Пульки', active: false, links: './icons/free-icon-paintball-588794_1.svg' },
//             { title: 'Автоматы/Пистолеты', active: false, links: './icons/icons8-оружие-для-пейнтбола-50.svg' },
//         ]

//         const paths = catalog.map(path => ({
//             params: { id: path.title.toString() },
//         }));

//         console.log(paths);

//         return { paths, fallback: 'blocking' };
//     } catch (error) {
//         console.error('Ошибка при получении данных:', error);
//         return { paths: [], fallback: false };
//     }
// }

export async function getStaticPaths() {
    try {
        const catalog = [
            { title: 'Гранаты', active: true },
            { title: 'Дым', active: true },
            { title: 'Растяжки-мины', active: false },
            { title: 'Пульты', active: false },
            { title: 'Обмундирования', active: false },
            { title: 'Пульки', active: false },
            { title: 'Автоматы/Пистолеты', active: false },
        ];

        const paths = catalog
            .filter(item => item.active) // Фильтруем только активные элементы
            .map(item => ({
                params: { id: item.title.toString() },
            }));

        console.log(paths);
        return { paths, fallback: 'blocking' };
    } catch (error) {
        console.error('Ошибка при получении путей:', error);
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({ params }) {
    try {
        // const response = await fetch(`http://localhost:3000/api/categoriy?value=${encodeURIComponent(params.id)}`);
        const response = await axios.get(`https://api.moysklad.ru/api/remap/1.2/entity/product?filter=pathName=${encodeURIComponent(params.id)}`, {
            headers: {
                'Authorization': 'Bearer 04c229acda627c250062de4c2a82b1bc3c9293d5',
                'Accept-Encoding': 'gzip',
            },
            params: {
                expand: 'images, attributes',
                limit: 100,
                // fields: 'stock', // Добавляем параметр fields
            },

        });
        // const data = await response.data;
        // console.log(data);
        const product = response.data.rows;

        // Получаем ссылки на изображения параллельно
        // const productsWithImages = await Promise.all(product.map(async (items) => {
        //     const imagesMeta = items.images.meta.href;

        //     const responseImages = await fetch(imagesMeta, {
        //         headers: {
        //             'Authorization': 'Bearer 04c229acda627c250062de4c2a82b1bc3c9293d5',
        //             'Accept-Encoding': 'gzip',
        //         },
        //         params: {
        //             expand: 'images, attributes',
        //             limit: 100,
        //             fields: 'stock',
        //         },
        //     })

        //     if (!responseImages.ok) {
        //         throw new Error('Ошибка при получении изображений');
        //     }

        //     const imagesData = await responseImages.json();
        //     // return { images: imagesData }; 
        //     return { ...product, images: imagesData }; // Добавляем изображения к продукту
        // }));
        // return { props: { product } };
        // return { props: { product, images: productsWithImages } };


        return { props: { product } };
    } catch (error) {
        console.error('Ошибка при получении данных продукта:', error);
        return { props: { product: null } };
    }
    // return { props: { product: response.data } }; link: `/product/${product.code}` link: `/product/${product.id}`
}

// export async function getStaticPaths() {
//     try {
//         const catalog = [
//             { title: 'Гранаты', active: true },
//             { title: 'Дым', active: true },
//             { title: 'Растяжки-мины', active: true },
//             { title: 'Пульты', active: true },
//             { title: 'Обмундирования', active: false },
//             { title: 'Пульки', active: false },
//             { title: 'Автоматы/Пистолеты', active: false },
//         ];

//         const paths = catalog
//             .filter(item => item.active) // Фильтруем только активные элементы
//             .map(item => ({
//                 params: { id: item.title.toString() },
//             }));

//         console.log(paths);
//         return { paths, fallback: 'blocking' };
//     } catch (error) {
//         console.error('Ошибка при получении путей:', error);
//         return { paths: [], fallback: false };
//     }
// }

// export async function getStaticProps({ params }) {
//     try {
//         const response = await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/product?filter=pathName=${encodeURIComponent(params.id)}`, {
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
//             throw new Error('Ошибка при получении данных продукта');
//         }

//         const data = await response.json();
//         const products = data.rows;

//         // Получаем ссылки на изображения параллельно
//         // const productsWithImages = await Promise.all(products.map(async (product) => {
//         //     const imagesMeta = product.images.meta.href;

//         //     const responseImages = await fetch(imagesMeta, {
//         //         headers: {
//         //             'Authorization': 'Bearer 04c229acda627c250062de4c2a82b1bc3c9293d5',
//         //             'Accept-Encoding': 'gzip',
//         //         },
//         //     });

//         //     if (!responseImages.ok) {
//         //         throw new Error('Ошибка при получении изображений');
//         //     }

//         //     const imagesData = await responseImages.json();
//         //     return { ...product, images: imagesData }; // Добавляем изображения к продукту
//         // }));
//         return { props: { products } };
//         // return { props: { products: productsWithImages } };
//     } catch (error) {
//         console.error('Ошибка при получении данных:', error);
//         return { props: { products: [] } }; // Возвращаем пустой массив в случае ошибки
//     }
// }



const Stages = ({ product }) => {
    const breadcrumbsItems = [
        { title: 'Главная', link: '/' },
        { title: product && product.pathName ? product.pathName : 'товары', link: `/product/${product && product.pathName ? product.pathName : ''}` }
    ];
    // console.log(images);
    // console.log(product);
    // console.log('Категория');
    if (!product) {
        return <div> Загрузка... </div>
    }

    return (
        <div>
            {/* <h1>Страница для ID: {id}</h1> */}
            <div className="container">
                <Breadcrumbs items={breadcrumbsItems} />
                <div className="card_items">
                    {product ? (
                        Array.from({ length: 8 }).map((_, i) => (
                            <Loading key={i} />
                        ))
                    ) : (
                        product.slice(0, visibleCount).map(i => (
                            <CardItem key={i.id} product={i} />
                        ))
                    )}
                    
                    {
                        product.map(i => (
                            <CardItem product={i} />
                            // <CardItem product={i} />
                        ))}
                    {/* {product.map(i => (
                        <div>{i.name}</div>
                    ))} */}

                </div>
            </div>
            {/* <p>{product ? JSON.stringify(product) </p> */}
        </div>
    );
};

export default Stages;
