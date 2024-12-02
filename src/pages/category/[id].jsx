'use client';

import { useRouter } from 'next/router';
import Breadcrumbs from "../../app/components/Breadcrumbs";
import CardItem from '../../app/components/CardItem';
import "@/app/globals.css";

export async function getStaticPaths() {
    try {
        const catalog = [
            { title: 'Гранаты', active: true, links: './icons/free-icon-grenade-1281087.svg' },
            { title: 'Дым', active: true, links: './icons/free-icon-grenade-2514237.svg' },
            { title: 'Растяжки-мины', active: true, links: './icons/free-icon-grenade-13091752.svg' },
            { title: 'Пульты', active: true, links: './icons/free-icon-remote-16276269.svg' },
            { title: 'Обмундирования', active: false, links: './icons/free-icon-paintball-1099542.svg' },
            { title: 'Пульки', active: false, links: './icons/free-icon-paintball-588794_1.svg' },
            { title: 'Автоматы/Пистолеты', active: false, links: './icons/icons8-оружие-для-пейнтбола-50.svg' },
        ]

        const paths = catalog.map(path => ({
            params: { id: path.title.toString() },
        }));

        console.log(paths);

        return { paths, fallback: 'blocking' };
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({ params }) {
    try {
        // const response = await fetch(`http://localhost:3000/api/categoriy?value=${encodeURIComponent(params.id)}`);
        const response = await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/product?filter=pathName=${encodeURIComponent(params.id)}`, {
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
        const data = await response.json();
        // console.log(data);
        const product = data.rows;
        // if (!data || !data.rows) {
        //     console.error('Нет данных или нет поля rows');
        //     return { props: { product: [] }; // Возвращаем пустой массив продуктов
        // }
        // const product = data.rows.find(i => i.pathName === params.id) || null; // Если продукт не найден, возвращаем null
        console.log('Вернем это!!!' + product);
        return { props: { product } };
    } catch (error) {
        console.error('Ошибка при получении данных продукта:', error);
        return { props: { product: null } };
    }
    // return { props: { product: response.data } };
}


const Stages = ({ product }) => {
    // const breadcrumbsItems = [
    //     { title: 'Главная', link: '/' },
    //     { title: product.pathName, link: `/product/${product.id}` }
    // ];
    return (
        <div>
            {/* <h1>Страница для ID: {id}</h1> */}
            <div className="container">
                {/* <Breadcrumbs items={breadcrumbsItems} /> */}
                <div className="card_items">
                    {/* {
                        product.map(i => (
                            <CardItem product={i} />
                        ))} */}
                    {product.map(i => (
                        // <CardItem product={i} />
                        <div>{i.name}</div>
                    ))}

                </div>
            </div>
            {/* <p>{product ? JSON.stringify(product) </p> */}
        </div>
    );
};

export default Stages;
