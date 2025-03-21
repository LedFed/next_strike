// "use client";
import React from 'react';
import Card from './components/Card';
// import Category from './components/Category';
// import Feedback from './components/Feedback';
// import More from './components/More';
// import Slider from 'react-slick';
// import Accordions from './components/Accordions';
// import fs from 'fs';
// import path from 'path';
// import ScrollToTop from './components/ScrollToTop';

// async function getProducts() {
//   const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bdlist.json');
//   const jsonData = fs.readFileSync(filePath);
//   const products = JSON.parse(jsonData);
//   return products;
// }

export default async function Main() {

  // const products = await getProducts();

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
    { title: 'Какие сроки доставки?', content: 'Стоимость доставки и ее время зависит от вашего местоположение и габаритов поссылки Обычно занимает от 3 до 7 рабочих дней. Точные сроки доставки можно уточнить на этапе оформления заказа или связавшись с нашей службой поддержки в Telegram или watshap' },
  ];

  return (
    <>
      {/* <ScrollToTop /> */}
      <div className="container">

        {/* <Slider {...settings}> */}
        <div className="banner">
          <img src="/img/baner.png" alt="" />
          <h1 className="main_title">Самые низкие цены</h1>
        </div>



        {/* <div className="banner">
            <h1 className="main_title">Самые низкие цены</h1>
          </div> */}
        {/* </Slider> */}

        <h2 className="title">Категории товаров</h2>
        {/* <Category /> */}
        <h2 className="title">Популярные товары</h2>
        <Card
        // products={products}
        />

        {/* <More /> */}
        {/* <Feedback /> */}

        <h2 className="title center">FaQ</h2>
        {/* <Accordions items={items} /> */}
      </div>


    </>
  )
}
