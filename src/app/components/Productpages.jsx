import React from 'react';
import "../globals.css";

export default function Productpages({product}) {
  return (
    <div className="current_card ">
            <div className="current_card_left"><img src="./img/f-1.jpg" alt="" className="main_img"/>
                <div className="current_carusel">
                    <img src="./img/f-1.jpg" alt="" className="current_img"/>
                    <img src="./img/f-1.jpg" alt="" className="current_img"/>
                    <img src="./img/f-1.jpg" alt="" className="current_img"/>
                </div>
            </div>
            <div className="current_card_right">
                <div className="current_block_column">
                    <h5 className=" current_title">{product.name}</h5>
                    <p className="current_articul">Артикул: PFX00006</p>
                </div>
                <div className="sale">Хит продаж</div>
                <p className="current_price">990</p>
                <div className="current_clue">Цена действительна только для интернет-магазина и может отличаться от цен в
                    розничных магазинах</div>

                <div className="btn">Добавить в корзину</div>
                <div className="current_chapter">
                    <p className="current_text active">Описание</p>
                    <p className="current_text">Как купить</p>
                    <p className="current_text">Возврат/Обмен</p>
                    <p className="current_text">Доставка</p>
                </div>

                <p className="current_descript">Кроссовки PUMA станут секретным ингредиентом твоей скорости и неутомимости
                    во время тренировки.
                    ЛЕГКОСТЬПодошва PUMALite: ультралегкая и более устойчивая пена смягчает ударные нагрузки, чтобы ты
                    занимался столько, сколько нужно.

                    СЦЕПЛЕНИЕ С ПОВЕРХНОСТЬЮ Полноразмерная резиновая подошва делает модель более долговечной и
                    гарантирует надежное сцепление на любых типах покрытий.
                    КОМФОРТНАЯ ПОСАДКА ПО НОГЕВерх из дышащей премиум-ткани KNIT в сочетании с формованным воротником в
                    районе пятки и мягким язычком для максимального комфорта.</p>

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
  )
}
