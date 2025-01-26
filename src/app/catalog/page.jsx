'use client';

import { useCart } from '../context/CartProvider';
import { useEffect, useState } from 'react';
import CardItem from '../components/CardItem';
import Breadcrumbs from '../components/Breadcrumbs';

const Catalog = () => {

    const { toggleCartItem} = useCart();

    const [sortedProducts, setSortedProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(16);

    const breadcrumbsItems = [
        { title: 'Главная', link: '/' },
        { title: 'Каталог', link: `/catalog` }
    ];

    const getProduct = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            return data.rows; // Верните данные для использования в useEffect
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProduct();
            setSortedProducts(products);
        };

        fetchProducts();
    }, []);

    // useEffect(() => {
    //     setSortedProducts(products);
    //     console.log(products + 'КаТаЛог');
    // }, [products])

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 8); // Увеличиваем количество видимых элементов на 4
    };

    const sortProducts = (criteria) => {
        let sortedArray = [...sortedProducts];

        switch (criteria) {
            case 'priceAsc':
                sortedArray.sort((a, b) => b.salePrices[0].value - a.salePrices[0].value);
                break;
            case 'priceDesc':
                sortedArray.sort((a, b) => a.salePrices[0].value - b.salePrices[0].value);
                break;
            case 'popularity':
                break;
            default:
                break;
        }
        console.log(sortedArray + 'Поменяли');
        setSortedProducts(sortedArray);
    };

    if (!sortedProducts) {
        return <div>Загрузка...</div>
    }


    return (
        <div className='container'>

            <Breadcrumbs items={breadcrumbsItems} />
            <div className="catalog">
                
                {/* <div className="catalog_filter">
                    <h2 className="catalog_title">Фильтр</h2>

                    <p className="catalog_subtitle">Производитель</p>

                    <div className="catalog_checkboxses">
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="PyroFX"
                                id="PyroFX"
          
                            />
                            <label className="catalog_text" htmlFor="PyroFX">PyroFX</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="A2"
                                id="A2"
     
                            />
                            <label className="catalog_text" htmlFor="A2">A2</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox" name="GH"
                                id="GH"
      
                            />
                            <label className="catalog_text" htmlFor="GH">GH</label>
                        </div>
                    </div>

                    <p className="catalog_subtitle">Наполнитель</p>

                    <div className="catalog_checkboxses">
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox" name="Горох"
                                id="Горох"
                 
                            />
                            <label className="catalog_text" htmlFor="Горох">Горох</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="Акустика"
                                id="Акустика"
                     
                            />
                            <label className="catalog_text" htmlFor="Акустика">Акустика</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="Мел"
                                id="Мел"
                    
                            />
                            <label className="catalog_text" htmlFor="Мел">Мел</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="Свето-шумовые"
                                id="Свето-шумовые"
                           
                            />
                            <label className="catalog_text" htmlFor="PyroFX">Свето-шумовые</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="Страйкбольные шары"
                                id="Страйкбольные шары"

                            />
                            <label className="catalog_text" htmlFor="Страйкбольные шары">Страйкбольные шары</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="Пейнтбольные шары"
                                id="Пейнтбольные шары"

                            />
                            <label className="catalog_text" htmlFor="PyroFX">Пейнтбольные шары</label>
                        </div>
                    </div>

                    <p className="catalog_subtitle">Мощность</p>


                    <div className="catalog_checkboxses">
                        <div>
                            <input className="custom_checkbox" type="checkbox" name="PyroFX" id="4corsar" />
                            <label className="catalog_text" htmlFor="4corsar">4 корсар</label>
                        </div>
                        <div>
                            <input className="custom_checkbox" type="checkbox" name="PyroFX" id="6corsar" />
                            <label className="catalog_text" htmlFor="6corsar">6 корсар</label>
                        </div>


                    </div>

                    <div className="single_checkbox">
                        <input className="custom_checkbox"
                            type="checkbox"
                            name="activeSkoba"
                            id="skoba"
                    
                        />

                        <label className="catalog_text" htmlFor="skoba" >Активная скоба</label>
                    </div>

                </div> */}

                <div className="catalog_cards">

                    <div className='catalog_sort_right'>
                        <select className='catalog_sort' onChange={(e) => sortProducts(e.target.value)}>
                            <option className='catalog_sort_option' value="popularity">Сначала популярные</option>
                            <option className='catalog_sort_option' value="priceDesc">Сначала дешевле</option>
                            <option className='catalog_sort_option' value="priceAsc">Сначала дороже</option>
                        </select>

                    </div>

                    <div className="card_items">
                        {sortedProducts.slice(0, visibleCount).map(product => (
                          
                            <CardItem key={product.id} product={product}  />
                        ))}
                    </div>

                    {visibleCount < sortedProducts.length && ( // Проверяем, есть ли еще элементы для отображения
                        <div className="btn" onClick={handleShowMore}>Показать еще</div>
                    )}
                </div>

            </div>


        </div>
    );
};

export default Catalog;
