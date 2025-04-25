'use client';

import Breadcrumbs from "../../app/components/Breadcrumbs";
import CardItem from '../../app/components/CardItem';
import "@/app/globals.css";
import Productpages from '../../app/components/Productpages';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'bdlist.json');
        const jsonData = fs.readFileSync(filePath);
        const data = JSON.parse(jsonData);
        const paths = data.map(product => ({
            params: { id: product.code.toString() },
        }));
        // console.log(paths);
        return { paths, fallback: 'blocking' };
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({ params }) {
    try {
        const filePath = path.join(process.cwd(), 'public', 'bdlist.json');
        const jsonData = fs.readFileSync(filePath);
        const data = JSON.parse(jsonData);

        const product = data.find(i => i.code.toString() === params.id) || null;
        // console.log(product);
        return { props: { product } };
    } catch (error) {
        console.error('Ошибка при получении данных продукта:', error);
        return { props: { product: null } };
    }
}

const Stage = ({ product }) => {

    const breadcrumbsItems = [
        { title: 'Главная', link: '/' },
        { title: product && product?.name || 'товар', link: `/product/${product?.code || ''}` }
    ];
    return (
        <>
            <Head>
                <title>{product?.name}</title>
                <meta name="description" content= {product?.name} />
            </Head>
            <div>

                <div className="container">
                    <Breadcrumbs items={breadcrumbsItems} />
                    <Productpages
                        product={product}
                    // images={images}
                    />
                    <div className="card_items">
                        {/* {
                        product.map(i => (
                            <Productpages
                                product={i}
                            />
                        ))} */}

                        {/* <CardItem product={product} /> */}
                    </div>
                </div>

            </div>

        </>
    );
};

export default Stage;
