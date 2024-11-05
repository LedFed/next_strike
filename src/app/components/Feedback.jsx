
import axios from 'axios';
import React, { useState } from 'react'

export default function Feedback() {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Отправка...');
        const consultationData = {
            type: 'consultation',
            data: {
                name: name,
                phone: phone,
            },
        };
        try {
            await axios.post('/api/telegram', consultationData)
            setStatus('Сообщение отправлено!');
            setName('');
            setPhone('');
        } catch (error) {
            setStatus('Ошибка при отправке сообщения.');
        }
    };

    return (
        <div className="support_calls">
            <h3 className="support_title">Нужна помощь в подборе оборудования?</h3>
            <p className="support_text">Запишитесь на консультацию. Наш специалист перезвонит вам.</p>
            <form onSubmit={handleSubmit} className="support">
                <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required />
                <input
                    onChange={(e) => setPhone(e.target.value)}

                    type="number"
                    value={phone}
                    name=""
                    id=""
                    placeholder="Телефон"
                    required
                />
                <input

                    value="Заказать"
                    className="button"
                    type="submit" />
            </form>
            <p className="support_subtext">Нажимая на кнопку «Записаться» вы соглашаетесь на обработку персональных данных,
                получение sms и email с предложениями о новых акциях нашей компании.</p>
        </div>
    )
}
