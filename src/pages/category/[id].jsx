'use client';

import Breadcrumbs from "../../app/components/Breadcrumbs";
import CardItem from '../../app/components/CardItem';
import "@/app/globals.css";
import Productpages from '../../app/components/Productpages';
import fs from 'fs';
import path from 'path';
import { useEffect, useState } from "react";


export async function getStaticPaths() {
    const categories = ['Дым', 'Гранаты', 'МинаРастяжка'];


    try {

        const paths = categories.map(category => ({
            params: { id: category },
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

        // console.log(data + 'вот тити');

        const products = data.filter(product => product.category === params.id)

        // console.log(products);
        return { props: { products } };
    } catch (error) {
        console.error('Ошибка при получении данных продукта:', error);
        return { props: { products: null } };
    }
}

const Stage = ({ products }) => {
    const [listitem, setListitem] = useState([]);
    const [visibleCount, setVisibleCount] = useState(16);

    useEffect(() => {
        if (listitem.length !== 0) {
            setListitem(products);
            // console.log('Зашли сюда 1');
        } else {
            setListitem(products);
        }
        // setLoader(false)
        // console.log(JSON.stringify(listitem) + 'listItem');

    }, [products])

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 12); // Увеличиваем количество видимых элементов на 4
    };

    const breadcrumbsItems = [
        { title: 'Главная', link: '/' },
        { title: products && products[0]?.category || 'раздел', link: `/product/${products[0]?.category || ''}` }
    ];

    const descriptionText = [
        { title: 'Страйкбольный дым — это мощный инструмент, который может изменить ход игры. Использование дыма создает завесу, позволяющую скрыть перемещение игроков и дезориентировать противника.'},
        { title: '1. Тактическое прикрытие: Дымовая завеса помогает скрыть действия вашей команды, что особенно полезно при атаке или отступлении.'},
        { title: '2. Дезориентация противника: Густой дым затрудняет видимость, создавая неразбериху у противника и позволяя вашей команде действовать более уверенно.'},
        { title: 'Страйкбольный дым — это не просто эффект, а стратегический элемент, который поможет вам добиться успеха в игре. Используйте дымовые гранаты с умом и создавайте завесу для достижения тактического преимущества!'},

    ]
    return (
        <div>

            <div className="container">
                <Breadcrumbs items={breadcrumbsItems} />
                <div className="catalog_cards">


                    <div className="card_items">
                        {/* {
                        products.map(i => (
                            <CardItem product={i} />
                        ))} */}

                        {listitem.slice(0, visibleCount).map(item => (
                            <CardItem key={item.code} product={item} />
                        ))}


                    </div>
                    {visibleCount < listitem.length && ( // Проверяем, есть ли еще элементы для отображения
                        <div className="btn" onClick={handleShowMore}>Показать еще</div>
                    )}

                </div>

                {descriptionText.map((e, index) => (
                    <p key={index} className="pattern_text">
                        {e.title}
                    </p>
                ))}

            </div>

        </div>
    );
};

export default Stage;
