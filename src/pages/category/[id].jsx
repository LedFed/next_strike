'use client';

import Breadcrumbs from "../../app/components/Breadcrumbs";
import CardItem from '../../app/components/CardItem';
import Accordions from "@/app/components/Accordions";
import "@/app/globals.css";
import fs from 'fs';
import Head from "next/head";
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
        // console.error('Ошибка при получении данных:', error);
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({ params }) {
    try {
        const filePath = path.join(process.cwd(), 'public', 'bdlist.json');
        const jsonData = fs.readFileSync(filePath);
        const data = JSON.parse(jsonData);

        const description = categoriesData[params.id]
        const HeadMeta = metaTeg[params.id]

        const products = data.filter(product => product.category === params.id)

        return {
            props: {
                products,
                description,
                HeadMeta
            }
        };
    } catch (error) {
        console.error('Ошибка при получении данных продукта:', error);
        return { props: { products: null, description: null } };
    }
}

const categoriesData = {
    'Гранаты': [{ title: 'Страйкбольные гранаты: Что это такое и как они работают?', content: 'Страйкбольные гранаты — это специальные устройства, используемые в страйкболе для создания эффектов, имитирующих реальные боевые действия. Они добавляют элемент стратегии и неожиданности в игру, позволяя игрокам применять тактические приемы.' },
    { title: 'Принцип действия страйкбольной гранаты', content: 'Страйкбольные гранаты работают по принципу имитации взрыва или рассеивания. При активации они могут выпускать пластиковые шарики или дым, создавая эффект, который затрудняет противнику ведение боя. В зависимости от модели, гранаты могут иметь различные механизмы срабатывания, включая активную чеку.' },
    { title: 'Устройство страйкбольной гранаты с активной чекой', content: 'Страйкбольные гранаты с активной чекой имеют простую, но эффективную конструкцию. Чека удерживает механизм в неактивном состоянии, и при её извлечении граната начинает действовать. Это позволяет игроку точно контролировать момент использования гранаты, что делает её незаменимым инструментом в арсенале страйкболиста.' },
    { title: 'Что внутри страйкбольной гранаты?', content: 'Внутри страйкбольной гранаты, в зависимости от производителя, могут находиться различные компоненты. Например, пиротехнические гранаты могут использовать разные пироматериалы и механизмы инициации. Это может быть терочный механизм, частичная имитация запала с замедлителем или запал с активной чекой. В качестве наполнителя часто используется горох или пластиковые шарики (BBs), которые при активации создают эффект рассеивания и имитируют «взрыв».' }],

    'Дым': [{ title: 'Дымовые гранаты: Применение и особенности', content: 'Страйкбольный дым — это незаменимый элемент для создания атмосферных и стратегических моментов на поле боя. Страйкбольная дымовая шашка используется для формирования густого дыма, который помогает скрыть движения команды, отвлечь противника или создать эффект неожиданности.' }, { title: 'Дымовые завесы', content: 'Дымовая завеса — это обычная дымовая шашка, которая не отличается внешне и по эффекту. Наша коллекция дымовых шашек включает в себя разнообразные модели, которые обеспечивают быстрое и равномерное распространение дыма. Эти шашки легко активируются и гарантируют надежную работу в любых условиях.' }],

    'МинаРастяжка': [{ title: 'Мины-растяжки: Как они работают?', content: 'Мины-растяжки, известные также как растяжки или растягивающие взрывные устройства (ЭВФ), срабатывают при натяжении или обрыве проволоки, прикрепленной к взрывателю. Когда кто-то наступает на растяжку или задевает её, проволока тянет за собой взрыватель, инициируя детонацию взрывчатого вещества. ' }, { title: 'Что такое ЭВФ', content: 'Это тип взрывного устройства, который использует электрический импульс для инициирования взрыва взрывчатого вещества(Электроспичка).Для инициации можно использовать пусковое устройство или батарейку типа "Крона". После инициации взрыв происходит без задержки.' }]
};

const metaTeg = {
    'Гранаты': { title: 'Страйкбольные Гранаты', chapter: 'Страйкбольные гранаты используются в страйкболе для создания тактических ситуаций.' },
    'Дым': { title: 'Дымовые гранаты', content: 'Дымовые гранаты создают облако дыма, которое используется для маскировки.' },
    'МинаРастяжка': { title: 'Мины-растяжки', content: 'Мины-растяжки активируются при натяжении, создавая эффект неожиданности.' }
};

const Stage = ({ products, description, HeadMeta }) => {
    const [listitem, setListitem] = useState([]);
    const [visibleCount, setVisibleCount] = useState(16);

    useEffect(() => {
        if (listitem.length !== 0) {
            setListitem(products);
        } else {
            setListitem(products);
        }
        // setLoader(false)
    }, [products])

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 12); // Увеличиваем количество видимых элементов на 4
    };

    const breadcrumbsItems = [
        { title: 'Главная', link: '/' },
        { title: products && products[0]?.category || 'раздел', link: `/product/${products[0]?.category || ''}` }
    ];

    const descriptionText = [
        { title: 'Страйкбольный дым — это мощный инструмент, который может изменить ход игры. Использование дыма создает завесу, позволяющую скрыть перемещение игроков и дезориентировать противника.' },
        { title: '1. Тактическое прикрытие: Дымовая завеса помогает скрыть действия вашей команды, что особенно полезно при атаке или отступлении.' },
        { title: '2. Дезориентация противника: Густой дым затрудняет видимость, создавая неразбериху у противника и позволяя вашей команде действовать более уверенно.' },
        { title: 'Страйкбольный дым — это не просто эффект, а стратегический элемент, который поможет вам добиться успеха в игре. Используйте дымовые гранаты с умом и создавайте завесу для достижения тактического преимущества!' },

    ]


    return (

        <div>
            <Head>
                <title>{HeadMeta?.title}</title>
                <meta name="description" content={HeadMeta?.chapter} />
            </Head>

            <div className="container">
                <Breadcrumbs items={breadcrumbsItems} />
                <div className="catalog_cards">

                    <div className="card_items">

                        {listitem.slice(0, visibleCount).map(item => (
                            <CardItem key={item.code} product={item} />
                        ))}

                    </div>

                    {visibleCount < listitem.length && (
                        <div className="btn" onClick={handleShowMore}>Показать еще</div>
                    )}

                </div>

                {/* {descriptionText.map((e, index) => (
                    <p key={index} className="pattern_text">
                        {e.title}
                    </p>
                ))} */}

                <Accordions items={description} />
            </div>
        </div>
    );
};

export default Stage;
