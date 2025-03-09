'use client';
import React, { useState } from 'react';
import { useCart } from '../context/CartProvider';
import Breadcrumbs from '../components/Breadcrumbs';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import Modal from '../modal/Modal';

export default function page() {
  const { cart, toggleCartItem, totalQuant, totalSum, increment, decrement } = useCart();

  const [active, setActive] = useState(false);

  const breadcrumbsItems = [
    { title: 'Главная', link: '/' },
    { title: 'Корзина', link: `/basket` }
  ];

  const handleOrder = async (name, phone) => {
    const orderData = {
      type: 'order',
      data: {
        cart: cart,
        totalSum: totalSum,
        customer: {
          name,
          phone,
        },
      },
    };

    try {
      const response = await fetch('/pages/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (data.success) {
        setActive(false);
        toast.success('Заказ успешно отправлен!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      } else {
        toast.error('Ошибка при отправке заказа.', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error('Ошибка при отправке заказа.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  console.log(cart);
  return (
    <>
      <div className="container">
        <Breadcrumbs items={breadcrumbsItems} />
        <Modal active={active} handleOrder={handleOrder} setActive={setActive} />
        <div className="basket_block">
          <div className="basket_items">
            {cart.length > 0 ? (
              cart.map(product => (
                <div key={product.id} className="basket_item" >
                  <img src={`../img/${product.src[0]}`} alt="" className="basket_picture" />
                  <div className="basket_item_right">
                    <Link className="basket_block_column" href={`/product/${product.code}`} passHref>
                      <h4 className="basket_block_title">{product.name}</h4>
                      <p className="basket_articul">Артикул:{product.article}</p>
                    </Link>

                    <div className="basket_functional">
                      <button className="decrement" onClick={() => decrement(product)}>-</button>
                      <div className="count">{product.count}</div>
                      <button className="increment" onClick={() => increment(product, product.count)}>+</button>
                    </div>

                    <div className="bakset_item_bottom">
                      <p className="price">{product.price}</p>
                      <img className="deleted" onClick={() => toggleCartItem(product)} src="./icons/free-icon-delete-1214428 1.svg" alt="" />
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <p> Ничего не нашли </p>
            )}

          </div>

          <div className="basket_info_block">
            <h4 className="basket_info_title">Оплата после примерки</h4>
            <p className="basket_info_text">Товары, {totalQuant} шт.</p>
            <div className="basket_info_total">
              <div className="result">Итого</div>
              <div className="all_price">{totalSum}</div>
            </div>
            <div className="btn" onClick={() => setActive(true)
              //  onClick={handleOrder}
            }>Заказать</div>
            <div className="basket_info_polity"><span>Соглашаюсь с правилами пользования торговой площадкой и <Link href='/delivery'>возврата</Link> </span>
            </div>
          </div>


        </div>
        <ToastContainer />
      </div>
    </>
  )
}
