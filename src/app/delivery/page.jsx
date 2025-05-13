import React from 'react'

export default function page() {
    return (
        <div className="container">
            <h2 className="title">Условия доставки</h2>

            <div className="pattern_left_margin">
                <p className="pattern_text">Отправляем через транспортную компанию CDEK в день заказа. Стоимость доставки высчитывает CDEK она зависит от
                    габаритов, веса поссылки и удаленности вашего города.</p>

                <p className="pattern_text">Посылки отправляются в день оформления заказа, если пункт выдачи заказов (ПВЗ) работает и принимает посылки. После оформления заказа вам будет выдан трек-номер для отслеживания статуса вашей посылки.</p>

                <p className="pattern_text">Также по возможности можем отправить другими транспортными компаниями. </p>

                <p className="pattern_text">Стоит учесть, что большинство товаров на нашем сайте являются пиротехникой и  порой могут быть не приняты той или иной  ТК.</p>

                <p className="pattern_text">В среднем время доставки CDEK 3-4 дня</p>

                <h2 className="pattern_title">ВАЖНО!</h2>
                <ul className='pattern_blcok'>
                    <li>
                        <p className="pattern_text">Не отправляем наложеным платежом.</p>
                    </li>

                    <li>
                        <p className="pattern_text">Отправляем после полной оплаты.</p>
                    </li>

                    <li>
                        <p className="pattern_text">Доставку оплачивает покупатель.</p>
                    </li>

                    <li>
                        <p className="pattern_text">В описании накладной может быть указана категория “рыболовные снасти”,  “игрушки”, “одежда”. </p>
                    </li>
                </ul>
            </div>


        </div>

    )
}
