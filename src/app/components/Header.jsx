"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartProvider';

const Header = ({ productList, basket, product }) => {
    // const [products, setProducts] = useState([]);
    const { toggleCartItem, cart, loadCartFromLocalStorage, products } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    function handleInputChange() {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        if (isSearching) {
            // Фильтрация товаров на основе введенного слова
            const results = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(results);
        }
    }, [searchTerm]);

    const handleFocus = () => {
        setIsSearching(true); // Устанавливаем состояние поиска в true
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsSearching(false);
        }, 200);
    };

    return (

        <header>

            <div className="container">
                <nav>

                    <div className="logo"><img src="/Logo.svg" alt="logo" /></div>

                    <div className={isChecked ? 'header_container active' : 'header_container'}>

                        <ul className="header_items">
                            <li className="header_item"><Link href="/" className="header_links">Главная</Link></li>
                            <li className="header_item"><a href="#" className="header_links">Каталог</a></li>
                            <li className="header_item"><a href="#" className="header_links">Доставка</a></li>
                            <li className="header_item none">
                                <a className="number" href="tel: +7953553053">+ 7 9(535)-530-53</a>
                            </li>
                            <li className="header_item none"><div className="basket">
                                <span className="basket_count">1</span>
                            </div></li>
                        </ul>

                    </div>

                    <div className="header_functional">
                        <div className="header_search">
                            <input
                                className="search"
                                //  type="search" 
                                placeholder="Поиск"
                                type="text"
                                value={searchTerm}
                                onFocus={handleFocus} 
                                onBlur={handleBlur}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <img className="search_img" src="/icons/search.svg" alt="" />
                        </div>

                        <a className="number" href="tel: +7953553053">+ 7 9(535)-530-53</a>
                        <Link href="/basket" className="basket">
                            <span className="basket_count">{cart.length}</span>
                        </Link>
                    </div>

                    <div className="menu back menu--3" onChange={handleInputChange}>
                        <label className="burger">
                            <input type="checkbox" />
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="30" />
                                <path className="line--1" d="M0 40h62c18 0 18-20-17 5L31 55" />
                                <path className="line--2" d="M0 50h80" />
                                <path className="line--3" d="M0 60h62c18 0 18 20-17-5L31 45" />
                            </svg>
                        </label>
                    </div>

                </nav>
            </div>

            <div className={isSearching && filteredProducts.length > 0 ? 'search_items active' : 'search_items'}>
                {isSearching && filteredProducts.map(item => (
                    // <Link >
                        <Link className="search_item" href={`/product/${item.code}`} key={item.id}>
                            <img src={item.images.rows[0].meta.downloadHref} alt={item.name} className="search_picture" />
                            <div className="search_block_text">
                                <h4 className="search_title">{item.name}</h4>
                                <span className="search_price">{item.salePrices[0].value}</span>
                            </div>

                            <img src="/icons/free-icon-remove-from-cart-4379564 1.svg"
                                alt=""
                                className="search_addBasket"
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    toggleCartItem(item)
                                }
                                } />
                        </Link>
                    // </Link>
                ))}

            </div>

        </header>


    )
}

export default Header;

{/* <div>
    <input
      type="text"
      placeholder="Поиск товаров..."    
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <ul>
      {filteredProducts.map(item => (
        <li key={item.id}>{item.name}</li> // Предполагаем, что у каждого товара есть id и name
      ))}
    </ul>
  </div> */}