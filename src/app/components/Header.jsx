"use client";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartProvider';

const Header = () => {
    const inputRef = useRef(null);
    const { toggleCartItem, cart, loadCartFromLocalStorage, products, formatNumber } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    function handleInputChange() {
        setIsChecked(!isChecked);
    };

    const handleTouch = (e) => {
        e.preventDefault(); // предотвращаем стандартное поведение
        handleFocus();
        setTimeout(handleFocus, 0); // Устанавливаем фокус с небольшой задержкой
    };

    // useEffect(() => {
    //     // if (isSearching )
    //     console.log(typeof(products));
    //     if (isSearching ) {
    //         const productArray = Object.values(products);
    //         // Фильтрация товаров на основе введенного слова
    //         const results = productArray.filter(product =>
    //             product.name.toLowerCase().includes(searchTerm.toLowerCase())
    //         );
    //         setFilteredProducts(results);
    //         console.log(typeof(results));
    //     }
    // }, [searchTerm]);

    useEffect(() => {
        if (isSearching) {
            try {
                const productArray = Object.values(products);
                const results = productArray.filter(product =>
                    product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredProducts(results);
            } catch (error) {
                console.error("Ошибка при фильтрации продуктов:", error);
            }
        }
    }, [searchTerm]);


    // const handleFocus = () => {
    //     setIsSearching(true); // Устанавливаем состояние поиска в true
    // };

    const handleFocus = () => {
        setIsSearching(true);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    // const handleBlur = () => {
    //     setTimeout(() => {
    //         setIsSearching(!isSearching);
    //     }, 200);
    // };

    // const handleFocus = () => {
    //     setIsSearching(true);

    //     inputRef.current?.focus();

    // };

    const handleBlur = () => {
        // Убираем фокус через некоторое время, чтобы не терять его сразу
        setTimeout(() => {
            setIsSearching(false);
        }, 200);
    };

    // функция служит для мобилок, убирает фокус с инпута когда закрываеться клавиатура
    // const handleResize = () => {
    //     if (window.innerHeight > 500) { // Задайте подходящее значение для вашей ситуации
    //         setIsSearching(false);
    //         if (inputRef.current) {
    //             inputRef.current.blur(); // Убираем фокус с input
    //         }
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener('resize', handleResize);

    //     handleResize();

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    return (

        <header>

            <div className="container">
                <nav className={isSearching ? 'active' : ''}>

                    <div className="logo"><img src="/Logo.svg" alt="logo" /></div>

                    <div className={isChecked ? 'header_container active' : 'header_container'}>

                        <ul className="header_items">
                            <li className="header_item"><Link href="/" className="header_links" onClick={handleInputChange}>Главная</Link></li>
                            <li className="header_item"><Link href="/catalog" className="header_links" onClick={handleInputChange}>Каталог</Link></li>
                            <li className="header_item"><Link href="/delivery" className="header_links" onClick={handleInputChange}>Доставка</Link></li>
                            <li className="header_item none">
                                <a className="number" href="tel: +7953553053">+ 7 9(535)-530-53</a>
                            </li>
                            <Link href='/basket' className="header_item "><div className="basket" onClick={handleInputChange}>
                                <span className="basket_count">{cart.length}</span>
                            </div></Link>
                        </ul>

                    </div>

                    <div className="header_functional">
                        <div className="header_search"
                        >
                            <input
                                className={isSearching ? 'search active' : 'search'}

                                placeholder="Поиск"
                                type="text"
                                ref={inputRef}
                                value={searchTerm}
                                // onFocus={() => setIsSearching(true)} 
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <img
                                onTouchStart={handleTouch}
                                onClick={handleFocus}
                                className="search_img"
                                src="/icons/search.svg" alt="" />
                        </div>

                        <a className="number" href="tel: +7953553053">+ 7 9(535)-530-53</a>
                        <Link href="/basket" className="basket" onClick={handleInputChange}>
                            <span className="basket_count">{cart.length}</span>
                        </Link>
                    </div>

                    <div className="menu back menu--3" onChange={handleInputChange}  onBlur={handleBlur}>
                        <label className="burger">
                            <input type="checkbox" defaultChecked={isChecked} checked={isChecked} />
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

                    <Link className="search_item" href={`/product/${item.code}`} key={item.id} onClick={handleInputChange}>
                        <img src={`../img/${item.images.rows[0].filename}`} alt={item.name} className="search_picture" />
                        <div className="search_block_text">
                            <h4 className="search_title">{item.name}</h4>
                            <span className="search_price">{formatNumber(item.salePrices[0].value)}</span>
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