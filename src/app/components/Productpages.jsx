import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import "../globals.css";
import { useCart } from '../context/CartProvider';

export default function Productpages({ product }) {
    const { toggleCartItem, cart, loadCartFromLocalStorage } = useCart();
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');

    const texts = [
        { id: 1, text: 'Описание', description: product.description },
        { id: 2, text: 'Как купить', description: 'Описание текста 2' },
        { id: 3, text: 'Возврат/Обмен', description: 'Описание текста 3' },
        { id: 4, text: 'Доставка', description: 'Описание текста 2' },
    ];

    const handleTextClick = (index, description) => {
        setCurrentText(description);
        setActiveIndex(index);
    };

    const handleImgClick = (src) => {
        setCurrentImg(src);
    }

    const handleAddToCart = () => {
        toggleCartItem(product); // Вызываем функцию при добавлении товара
    };

    return (
        <div className="container">
            <div className="current_card " key={product.id}>
                <div className="current_card_left">
                    <img src={product.images.rows[0].meta.downloadHref}
                        alt={product.name}
                        className="main_img" />
                    <div className="current_carusel">
                        {product.images.rows.map((img, i) => (
                            <img
                                onClick={() => handleImgClick(img.meta.downloadHref)}
                                key={i}
                                src={img.meta.downloadHref}
                                alt={product.name}
                                className="current_img" />
                        ))}

                        {/* <img src="./img/f-1.jpg" alt="" className="current_img" />
                <img src="./img/f-1.jpg" alt="" className="current_img" /> */}
                    </div>
                </div>
                <div className="current_card_right">
                    <div className="current_block_column">
                        <h5 className=" current_title">{product.name}</h5>
                        <p className="current_articul">{product.article || 'Пусто'}</p>
                    </div>
                    <div className="sale">Хит продаж</div>
                    <p className="current_price">{product.salePrices[0].value}</p>
                    <div className="current_clue">Цена действительна только для интернет-магазина и может отличаться от цен в
                        розничных магазинах</div>

                    <div className={cart.some(item => item.id === product.id) ? `btn active` : 'btn'} onClick={handleAddToCart}>{cart.some(item => item.id === product.id) ? 'удалить' : "добавить в корзину"}</div>
                    <div className="current_chapter">
                        {texts.map((item, i) => (
                            <p
                                key={item.id}
                                className={`current_text ${activeIndex === i ? 'active' : ''}`}
                                onClick={() => handleTextClick(i, item.description)}
                            >{item.text}</p>
                        ))}
                        {/* <p className="current_text active">Описание</p>
                <p className="current_text">Как купить</p>
                <p className="current_text">Возврат/Обмен</p>
                <p className="current_text">Доставка</p> */}
                    </div>

                    <p className="current_descript">{currentText || product.description}</p>

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
        </div>
    )
}
