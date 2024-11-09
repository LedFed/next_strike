'use client';
import axios from "axios";
import Productpages from "../../app/components/Productpages";
import Breadcrumbs from "../../app/components/Breadcrumbs";

export async function getStaticPaths() {
    try {
        const response = await axios.get(`${process.env.API_HOST}/products`); // замените на ваш путь
        const data = response.data;

        const paths = data.rows.map(product => ({
            params: { id: product.code.toString() },
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
        const response = await axios.get(`/groups?value=${encodeURIComponent(params.id)}`);// замените на ваш путь
        const data = response.data;
        console.log(data);

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

    console.log(product);

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