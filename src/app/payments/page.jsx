import React from 'react';
import Link from 'next/link';

export default function page() {
    return (
        <div className="container">
            <h2 className="title">Условия оплаты</h2>

            <div className="pattern_left_margin">
                <p className="pattern_text">После оформления заказа в <Link href='/basket'>корзине</Link> с вами свяжется наш менеджер по указанному вами номеру.</p>

                <p className="pattern_text">Он может написать в мессенджеры WhatsApp или Telegram.</p>

                <p className="pattern_text">В случае отсутствия выбранного вами товара он предложит аналог.</p>

                <p className="pattern_text">После подтверждения заказа вам будут выданы реквизиты для оплаты. За товар вы оплачиваете сразу, а доставку — при получении. Стоимость доставки зависит от габаритов и удаленности вашего города от наших складов.</p>

            </div>


        </div>

    )
}
