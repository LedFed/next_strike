// "use client";
import React from 'react';
import Card from './components/Card';
import Category from './components/Category';
import Feedback from './components/Feedback';
import Accordions from './components/Accordions';
import EmblaCarousel from './components/EmblaCarousel';

export const metadata = {
  title: ' Страйкбольный интернет магазин strikeops - гранаты, мины, дымы для страйкбола и пейнтбола',
  description: 'Магазин страйкбольных гранат Купить гранаты, мины, дымы для страйкбола в одном месте по низким ценам. Быстрая доставка по всей России.'
};

export default async function Main() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const items = [
    { title: 'Как сделать заказ? ', content: 'Перейдите в каталог товаров и выберите интересующий вас продукт > Нажмите кнопку "Добавить в корзину" > Перейдите в корзину, проверьте выбранные товары и нажмите "Оформить заказ" > Дальше наш менджер свяжеться с вами ватсап или телеграм' },
    { title: 'Как проходит оплата?', content: 'После того как вы выбрали товар, с вами свяжеться наш мендежер. Мы принимаем оплату по системе СБП, также возможна оплата по расчетному счету' },
    { title: 'Как происходит доставка ?', content: 'После оплаты заказа мы собираем и упаковываем ваши товары. Заказ передается в службу доставки, которая осуществляет его транспортировку. Вы получите трек-номер для отслеживания статуса доставки вашего заказа.' },
    { title: 'Какие сроки доставки?', content: 'Стоимость доставки и ее время зависит от вашего местоположение и габаритов поссылки Обычно занимает от 3 до 7 рабочих дней. Точные сроки доставки можно уточнить на этапе оформления заказа или связавшись с нашей службой поддержки в WhatsApp или Telegram.' },
  ];

  const slides = [
    { title: 'В нашем магазине теперь можно заказать петарды', img: '/img/baner_petard.webp',  links:'/category/Петарды'  },
    { title: 'Страйкбольная граната: что это такое ?', img: '/img/baner.webp', links:'/articles/granats' }
  ]

  return (
    <>

      <div className="container">

        <EmblaCarousel slides={slides} />

        <h2 className="title">Категории товаров</h2>
        <Category />
        <h2 className="title">Популярные товары</h2>
        <Card
        // products={products}
        />
        <Feedback />

        <h2 className="title center">FaQ</h2>
        <Accordions items={items} />
      </div>

    </>
  )
}
