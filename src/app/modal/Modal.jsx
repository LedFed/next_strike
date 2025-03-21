import React, { useState } from 'react'
import { useCart } from '../context/CartProvider';

export default function Modal({ active, handleOrder, setActive }) {
    const { cart, totalQuant, totalSum, formatNumber } = useCart();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        handleOrder(name, phone); // Передаем name и phone в handleOrder
    };


    const isFormValid = name.trim() !== '' && phone.trim() !== '';
    return (
        <>
            <div className={active ? 'modal is-open' : 'modal'} onClick={() => setActive(false)}>
                <div className="modal__container order-modal" onClick={e => e.stopPropagation()}>
                    <div className="modal-content order-modal__content">
                        <div className="order-modal__top">
                            <h2 className="order-modal__title">Оформление заказа</h2>
                            <span className="order-modal__number">Заказ № 3456 67</span>
                        </div>
                        <div className="order-modal__info">
                            <div className="order-modal__quantity order-modal__info-item">Товаров в заказе: <span>{totalQuant}</span></div>
                            <div className="order-modal__summ order-modal__info-item">Общая сумма заказа: <span>{totalSum} ₽</span></div>

                            {/* ||Данный блок появится позже, тут можно будет просмотреть все выбранные товары и удалить или изменить кол-во!!! */}

                            {/* <div className="order-modal__products order-modal__info-item"> 
                                <button className="order-modal__btn">Состав заказа</button>
                                <ul className="order-modal__list">
                                    {cart.map(e => (
                                        <li className='order-modal__item'>
                                            <article className='order-modal__product order-product'>
                                                <img src={`../img/${e.images.rows[0].filename}`} className='order-product__img' />
                                                <div className="order-product__text">
                                                    <h3 className="order-product__title">{e.name}</h3>
                                                    <span className="order-product__price">{formatNumber(e.salePrices[0].value)}</span>
                                                </div>
                                                <button className='order-product__delete'>Удалить</button>
                                            </article>
                                        </li>
                                    ))}
                                </ul>
                            </div> */}
                        </div>
                        <div
                            // action="mail.php" method="post" 
                            className="order-modal__form order">
                            {/* <input type="hidden" name="theme" value="Обратный звонок" />
                            <input type="hidden" name="admin_email[]" value="stdarn@mail.ru" />
                            <input type="hidden" name="form_subject" value="Заявка с сайта Сайт" /> */}
                            <label className="order__label">
                                <span className="order__text">Ваше имя</span>
                                <input
                                    type="text"
                                    name="Имя"
                                    className="order__input"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </label>
                            <label className="order__label">
                                <span className="order__text">Номер телефона</span>
                                <input
                                    type="tel"
                                    name="Телефон"
                                    className="order__input"
                                    placeholder="+7 (___)___-__-__"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)} />
                            </label>

                            {/* || Возможно добавить checkbox по выбору соц.сети в которой можно связаться с закасчиком  */}

                            {/* <label className="order__label">
                                <span className="order__text">Ваше имя</span>
                                <input type="email" name="Email" className="order__input" placeholder="post@gmail.com" />
                            </label> */}
                            <button
                                className="order__btn btn"
                                // disabled={!name || !phone}
                                onClick={onSubmit}
                                // onClick={handleOrder}
                                disabled={!isFormValid}

                            >
                                {` ${isFormValid ? 'Оформить заказ' : 'Заполните поля'}`}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
