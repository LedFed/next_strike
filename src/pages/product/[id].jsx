'use client';
// import axios from "axios";
import Productpages from "../../app/components/Productpages";
import Breadcrumbs from "../../app/components/Breadcrumbs";

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
            params: { id: product.code.toString() },
        }));

        return { paths, fallback: false };
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({ params }) {
    try {
        const response = await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/product?${params.id}`, {
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

        const product = data.rows.find(i => i.code === params.id) || null; // Если продукт не найден, возвращаем null

        return { props: { product } };
    } catch (error) {
        console.error('Ошибка при получении данных продукта:', error);
        return { props: { product: null } };
    }
    // return { props: { product: response.data } };
}

const ProductPage = ({ product }) => {

    const breadcrumbsItems = [
        { title: 'Главная', link: '/' },
        { title: product.name, link: `/product/${product.code}` }
    ];

    if (!product) {
        return <div>Продукт не найден</div>; // Обработка случая, когда продукт не найден
    }

    return (
        <>
            <div className="container">
                <Breadcrumbs items={breadcrumbsItems} />
                <Productpages
                    product={product}
                />
            </div>
        </>
    );
};

export default ProductPage;