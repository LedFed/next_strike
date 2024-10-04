'use client';
import React from 'react';
import { useCart } from '../context/CartProvider';

export default function page() {
  const { cart, toggleCartItem, loadCartFromLocalStorage, getProducts, totalQuant, totalSum, formatNumber, increment, decrement } = useCart();

  // useEffect(() => {
  //   loadCartFromLocalStorage();
  // }, []);

  console.log(cart);
  return (
    <>
      <div className="container">
        <div className="basket_block">
          <div className="basket_items">
            {cart.length > 0 ? (
              cart.map(product => (
                <div key={product.id} className="basket_item">
                  <img src={product.images.rows[0].meta.downloadHref} alt="" className="basket_picture" />
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
            <div className="btn">Заказать</div>
            <div className="basket_info_polity">Соглашаюсь <span>с правилами пользования торговой площадкой</span> и
              возврата</div>
          </div>


        </div>
      </div>
      {/* {cart.map(item => (
        <div key={item.id}>jk</div>
      ))} */}
    </>
  )
}
