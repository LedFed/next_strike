// 'use client';
// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';

// // export default function PageInfo() {
//     const PageInfo = () => {

//     const router = useRouter();
//     // const { value } = router.query; // Извлекаем значение из query
//     const value = router.query; 
//     // const [products, setProducts] = useState([]);
//     // const value = '392b5fd1-7dcd-11ef-0a80-05c00027a337';
//     // console.log(value);

//     // const getProducts = async (value) => {
//     //     try {
//     //         console.log(value);
//     //         const response = await fetch(`/api/groups?value=${encodeURIComponent(value)}`);
//     //         console.log(value);
//     //         console.log(response);
//     //         const data = await response.json();
//     //         console.log(data);
//     //         // setProducts(data);
//     //         // console.log('Вот я получаю все успешно ' + response);
//     //         return data;
//     //     } catch (error) {
//     //         console.error('Error fetching products:', error);
//     //         return null;
//     //     }
//     // };

//     // useEffect(() => {
//     //     console.log(value);
//     //     if (value) {
//     //         const fetchProducts = async () => {
//     //             const productData = await getProducts(value);
//     //             console.log(productData);
//     //             if (productData) {
//     //                 setProducts(productData); // Предполагаем, что данные находятся в поле rows
//     //             }
//     //         };

//     //         fetchProducts();
//     //     }
//     // }, [value]);
//     console.log(value);
//     console.log(products);

//     // if (!products) {
//     //     return <div>Продукт не найден</div>; // Обработка случая, когда продукт не найден
//     // }

//     return (
//         <>

//             <div>Инфа</div>

//         </>
//     );
// };
// export default PageInfo;
'use client';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartProvider';
import { useEffect, useState } from 'react';
import CardItem from '../components/CardItem';
import Breadcrumbs from '../components/Breadcrumbs';
// import { useEffect, useState } from 'react';

const Catalog = () => {
    // const router = useRouter();
    // const value = router.query.value; // Получаем значение из query
    const { toggleCartItem, products } = useCart();
    // const getProducts = async (value) => {

    //     try {
    //         console.log(value);
    //         const response = await fetch(`/api/groups?value=${encodeURIComponent(value)}`);
    //         const data = await response.json();
    //         setProducts(data); // Сохраняем данные в состояние
    //         console.log(data);
    //     } catch (error) {
    //         console.error('Ошибка при получении продуктов:', error);
    //     }
    // };

    // useEffect(() => {
    //     if (value) {
    //         getProducts(value);
    //     }
    // }, [value]);

    // if (!value) {
    //     return <div>Загрузка...</div>; // Показываем загрузку, пока value не доступно
    // }
    // const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState(products);
    const [visibleCount, setVisibleCount] = useState(3);

    const breadcrumbsItems = [
        { title: 'Главная', link: '/' },
        { title: 'Каталог', link: `/catalog` }
    ];

    useEffect(() => {
        setSortedProducts(products);
    }, [products])

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 4); // Увеличиваем количество видимых элементов на 4
    };

    const sortProducts = (criteria) => {
        let sortedArray = [...products];

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

        setSortedProducts(sortedArray);
    };

    if (!sortedProducts) {
        return <div>Загрузка...</div>
    }


    return (
        <div className='container'>
            {/* <ToastContainer /> */}
            {/* <h1 onClick={notify}>Список товаров</h1> */}
            <Breadcrumbs items={breadcrumbsItems} />
            <div className="catalog">
                <div className="catalog_filter">
                    <h2 className="catalog_title">Фильтр</h2>

                    <p className="catalog_subtitle">Производитель</p>

                    <div className="catalog_checkboxses">
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="PyroFX"
                                id="PyroFX"
                            // checked={filters['8813e9a2-6c7d-11ef-0a80-006a001ae2d1']['PyroFX']}
                            // onChange={() => handleCheckbox(['8813e9a2-6c7d-11ef-0a80-006a001ae2d1'], 'PyroFX')} 
                            />
                            <label className="catalog_text" htmlFor="PyroFX">PyroFX</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="A2"
                                id="A2"
                            // checked={filters['8813e9a2-6c7d-11ef-0a80-006a001ae2d1']['A2']}
                            // onChange={() => handleCheckbox(['8813e9a2-6c7d-11ef-0a80-006a001ae2d1'], 'A2')}
                            />
                            <label className="catalog_text" htmlFor="A2">A2</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox" name="GH"
                                id="GH"
                            // checked={filters['8813e9a2-6c7d-11ef-0a80-006a001ae2d1']['GH']}
                            // onChange={() => handleCheckbox(['8813e9a2-6c7d-11ef-0a80-006a001ae2d1'], 'GH')}
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
                            // checked={filters['8813e741-6c7d-11ef-0a80-006a001ae2d0']['Горох']}
                            // onChange={() => handleCheckbox(['8813e741-6c7d-11ef-0a80-006a001ae2d0'], 'Горох')} 
                            />
                            <label className="catalog_text" htmlFor="Горох">Горох</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="Акустика"
                                id="Акустика"
                            // checked={filters['8813e741-6c7d-11ef-0a80-006a001ae2d0']['Акустика']}
                            // onChange={() => handleCheckbox(['8813e741-6c7d-11ef-0a80-006a001ae2d0'], 'Акустика')} 
                            />
                            <label className="catalog_text" htmlFor="Акустика">Акустика</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="Мел"
                                id="Мел"
                            // checked={filters['8813e741-6c7d-11ef-0a80-006a001ae2d0']['Мел']}
                            // onChange={() => handleCheckbox(['8813e741-6c7d-11ef-0a80-006a001ae2d0'], 'Мел')} 
                            />
                            <label className="catalog_text" htmlFor="Мел">Мел</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="Свето-шумовые"
                                id="Свето-шумовые"
                            // checked={filters['8813e741-6c7d-11ef-0a80-006a001ae2d0']['Свето-шумовые']}
                            // onChange={() => handleCheckbox(['8813e741-6c7d-11ef-0a80-006a001ae2d0'], 'Свето-шумовые')} 
                            />
                            <label className="catalog_text" htmlFor="PyroFX">Свето-шумовые</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="Страйкбольные шары"
                                id="Страйкбольные шары"
                            // checked={filters['8813e741-6c7d-11ef-0a80-006a001ae2d0']['Страйкбольные шары']}
                            // onChange={() => handleCheckbox(['8813e741-6c7d-11ef-0a80-006a001ae2d0'], 'Страйкбольные шары')} 
                            />
                            <label className="catalog_text" htmlFor="Страйкбольные шары">Страйкбольные шары</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="Пейнтбольные шары"
                                id="Пейнтбольные шары"
                            // checked={filters['8813e741-6c7d-11ef-0a80-006a001ae2d0']['Пейнтбольные шары']}
                            // onChange={() => handleCheckbox(['8813e741-6c7d-11ef-0a80-006a001ae2d0'], 'Пейнтбольные шары')} 
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
                        // checked={filters['8813e103-6c7d-11ef-0a80-006a001ae2cf']}
                        // onChange={() => handleCheckbox('8813e103-6c7d-11ef-0a80-006a001ae2cf')} 
                        />

                        <label className="catalog_text" htmlFor="skoba" >Активная скоба</label>
                    </div>

                </div>

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
                            // <li key={product.id}>
                            //     {product.name} - ${product.salePrices[0].value}
                            // </li> 
                            <CardItem product={product} />
                        ))}
                    </div>

                    {visibleCount < sortedProducts.length && ( // Проверяем, есть ли еще элементы для отображения
                        <div class="btn" onClick={handleShowMore}>Показать еще</div>
                    )}
                </div>

            </div>


        </div>
    );
};

export default Catalog;
