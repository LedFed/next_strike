import React, { useEffect, useRef, useState } from 'react';
// import React from 'react'
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import { useCart } from '../context/CartProvider';
import Accordions from './Accordions';

export default function Productpages({ product, images }) {
    const { toggleCartItem, cart, loadCartFromLocalStorage, formatNumber } = useCart();
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    // const [currentImage, setCurrentImage] = useState(product.images.rows[0].filename);

    // Функция для обработки клика по изображению `../img/${product.images.rows[0].filename}`
    // const handleImgClick = (imgSrc) => {
    //     setCurrentImage(imgSrc);
    // };

    // const [imageSrc, setImageSrc] = useState('');

    // useEffect(() => {
    //     if (product.images.rows.length > 0) {
    //         const imagePath = `../img/${product.images.rows[0].filename}`;
    //         setImageSrc(imagePath);
    //     } else {
    //         setImageSrc('../img/photo_2024-10-27_03-14-02.jpg'); // Путь к изображению по умолчанию
    //     }
    // }, [product]);

    // console.log(product + 'Мы ведьмак');
    const texts = [
        { id: 1, title: 'Описание', content: product.description },
        { id: 2, title: 'Как купить', content: 'Нажмите кнопку "Добавить в корзину" > Перейдите в корзину, проверьте выбранные товары и нажмите "Оформить заказ" > Дальше наш менджер свяжеться с вами ватсап или телеграм' },
        { id: 3, title: 'Возврат/Обмен', content: 'Описание текста 3' },
        { id: 4, title: 'Доставка', content: 'После оплаты заказа мы собираем и упаковываем ваши товары. Заказ передается в службу доставки, которая осуществляет его транспортировку. Вы получите трек-номер для отслеживания статуса доставки вашего заказа.' },
    ];

    // const settings = {
    //     slidesToScroll: false,
    //     slidesToShow: 3,
    //     dots: false,
    //     infinite: false,
    //     responsive: [
    //         {
    //             breakpoint: 770,
    //             settings: {
    //                 dots: false,
    //                 infinite: false,
    //                 speed: 500,
    //                 slidesToShow: 2,
    //                 swipeToSlide: true,
    //                 slidesToScroll: 1,
    //             }
    //         },
    //     ]

    // }; 
    // Настройки для slider

    const handleTextClick = (index, description) => {
        setCurrentText(description);
        setActiveIndex(index);
    };

    const handleAddToCart = () => {
        toggleCartItem(product); // Вызываем функцию при добавлении товара
    };

    if (!product) {
        return <div> Загрузка... </div>
    }

    return (
        // <div className="container">
            <div className="current_card " key={product.id}>
                <div className="current_card_left">
                    <img src={`../img/${images.rows[0].filename}`}
                        alt={product.name}
                        className="main_img" />
                    <div className="current_carusel">
                        {images.rows.map((img, i) => (
                            <img
                                onClick={() => handleImgClick(img.meta.downloadHref)}
                                key={i}
                                // src={img.meta.downloadHref}
                                src={`../img/${images.rows[i].filename}`}
                                alt={product.name}
                                className="current_img" />
                        ))}

                        {/* <img src={`../img/${images.rows[0].filename}`} alt="" /> */}

                    </div>
                </div>
                <div className="current_card_right">
                    <div className="current_block_column">
                        <h5 className=" current_title">{product.name}</h5>
                        <p className="current_articul">{product.article || 'Пусто'}</p>
                    </div>
                    <div className="sale">Хит продаж</div>
                    <p className="current_price">{formatNumber(product.salePrices[0].value)}</p>
                    <div className="current_clue">Цена действительна только для интернет-магазина и может отличаться от цен в
                        розничных магазинах</div>

                    <div className={cart.some(item => item.id === product.id) ? `btn active` : 'btn'} onClick={handleAddToCart}>
                        {cart.some(item => item.id === product.id) ? 'Удалить из корзины' : "Добавить в корзину"}</div>

                    <div className="current_chapter_mobile">
                        <Accordions items={texts} />
                    </div>

                    <div className="current_chapter"  >
                        {texts.map((item, i) => (
                            <p
                                key={item.id}
                                className={`current_text ${activeIndex === i ? 'active' : ''}`}
                                onClick={() => handleTextClick(i, item.content)}
                            >{item.title}</p>
                        ))}
                    </div>

                    {/* <Slider {...setting} className="current_chapter">
                        <div>   <p className="current_text active">Описание</p></div>
                        <div><p className="current_text">Как купить</p></div>
                        {/* <div>   <p className="current_text">Возврат/Обмен</p></div>
                        <div>       <p className="current_text">Доставка</p></div> }
                    </Slider> */}

                    {/* <p className="current_descript">{currentText || product.description}</p> */}

                    <div className="current_contacts">
                        <p className="current_info">Мы будем рады ответить на все Ваши вопросы в любом удобном мессенджере:</p>
                        <div className="current_links">
                            <a href="" className="current_link">Telegram</a>
                            <a href="" className="current_link">Wathap</a>
                            <a href="" className="current_link">+7 (909) 024-56-94</a>
                        </div>
                    </div>
                </div>
            </div>
        // </div>
    )
}
