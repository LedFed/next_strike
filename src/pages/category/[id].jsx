'use client';

import { useRouter } from 'next/router';
import Breadcrumbs from "../../app/components/Breadcrumbs";
import CardItem from '../../app/components/CardItem';
import "@/app/globals.css";

export async function getStaticPaths() {
    try {
        const response = await fetch(`${process.env.API_HOST}/products`)
        const data = await response.json();
        console.log(data);

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
        const response = await fetch(`${process.env.API_HOST}/categoriy?value=${encodeURIComponent(params.id)}`);
        const data = await response.json();
        console.log(data);
        const product = data.rows;
        // const product = data.rows.find(i => i.pathName === params.id) || null; // Если продукт не найден, возвращаем null
        console.log('Вернем это!!!' + product);
        return { props: { product } };
    } catch (error) {
        console.error('Ошибка при получении данных продукта:', error);
        return { props: { product: null } };
    }
    // return { props: { product: response.data } };
}

const Stage = ({ product }) => {
    const router = useRouter();
    const { id } = router.query;
    console.log(Object.keys(product).length + 'Гранаты 3');
    const breadcrumbsItems = [
        { title: 'Главная', link: '/' },
        { title: product.pathName, link: `/product/${product.id}` }
    ];
    return (
        <div>
            {/* <h1>Страница для ID: {id}</h1> */}
            <div className="container">
                <Breadcrumbs items={breadcrumbsItems} />
                <div className="card_items">
                    {
                        product.map(i => (
                            <CardItem product={i} />
                        ))}
                </div>
            </div>
            {/* <p>{product ? JSON.stringify(product) </p> */}
        </div>
    );
};

export default Stage;

