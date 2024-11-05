'use client';
import React from 'react';
import { useCart } from '../context/CartProvider';
import Breadcrumbs from '../components/Breadcrumbs';
import { ToastContainer, toast } from 'react-toastify';


export default function page() {
  const { cart, toggleCartItem, totalQuant, totalSum, formatNumber, increment, decrement } = useCart();

 
  const breadcrumbsItems = [
    { title: 'Главная', link: '/' },
    { title: 'Корзина', link: `/basket` }
  ];

  const handleOrder = async () => {
    const orderData = {
      type: 'order',
      data: {
        cart: cart,
        totalSum: totalSum,
      },
    };

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (data.success) {
      
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
  
        <div className="basket_block">
          <div className="basket_items">
            {cart.length > 0 ? (
              cart.map(product => (
                <div key={product.id} className="basket_item">
                  <img src={product.images.rows[0].meta.href} alt="" className="basket_picture" />
                  <div className="basket_item_right">
                    <div className="basket_block_column">
                      <h4 className="basket_block_title">{product.name}</h4>
                      <p className="basket_articul">Артикул:{product.article}</p>
                    </div>

                    <div className="basket_functional">
                      <button className="decrement" onClick={() => decrement(product)}>-</button>
                      <div className="count">{product.count}</div>
                      <button className="increment" onClick={() => increment(product, product.count)}>+</button>
                    </div>

                    <div className="bakset_item_bottom">
                      <p className="price">{formatNumber(product.salePrices[0].value)}</p>
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
              <div className="all_price">{formatNumber(totalSum)}</div>
            </div>
            <div className="btn" onClick={handleOrder}>Заказать</div>
            <div className="basket_info_polity">Соглашаюсь <span>с правилами пользования торговой площадкой</span> и
              возврата</div>
          </div>


        </div>
        <ToastContainer />
      </div>
    </>
  )
}
