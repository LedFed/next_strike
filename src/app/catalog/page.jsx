'use client';

import { useCart } from '../context/CartProvider';
import { useEffect, useState } from 'react';
import CardItem from '../components/CardItem';
import Breadcrumbs from '../components/Breadcrumbs';
import Loading from '../dashboard/loading';


export default function Catalog() {
    const { products } = useCart();
    // const [product, setProduct] = useCart([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(16);
    const [loader, setLoader] = useState(true);

    const breadcrumbsItems = [
        { title: 'Главная', link: '/' },
        { title: 'Каталог', link: `/catalog` }
    ];

    const [filters, setFilters] = useState({
        "clamp": true,
        "filter": {
            'Горох': false,
            'Мел': false,
            'СветоШумовые': false,
            'Акустика': false,
            'СтрайкбольныеШары': false,
            'ПейнтбольныеШары': false
        },
        "mfr": {
            'PyroFX': false,
            'A2': false,
            'GH': false,
            'СтрайкАрт': false
        },
    });
    const [arr, setMas] = useState([]);
    const [listitem, setListitem] = useState([]);

    useEffect(() => {
        if (listitem.length !== 0) {
            setListitem(products);
            // console.log('Зашли сюда 1');
        } else {
            setListitem(products);
        }
        setLoader(false)
        // console.log(JSON.stringify(listitem) + 'listItem');

    }, [products])

    const extractTrueValues = (filters) => {
        const result = {};

        Object.entries(filters).forEach(([key, value]) => {
            if (value === true) {
                result[key] = true;
            } else if (typeof value === 'object') {
                const trueKeys = Object.entries(value)
                    .filter(([_, v]) => v === true)
                    .reduce((acc, [k]) => {
                        acc[k] = true;
                        return acc;
                    }, {});

                if (Object.keys(trueKeys).length > 0) {
                    result[key] = trueKeys;
                }
            }
        });

        return result;
    };

    const filteredResults = extractTrueValues(filters);

    console.log(JSON.stringify(filteredResults) + 'Данные из фильтров');

    useEffect(() => {
        if (Object.keys(filteredResults).length !== 0) {
            const filteredMas = listitem.filter(product => {
                // Проверяем, есть ли поле attribute у продукта
                if (product.attribute) {
                    return Object.keys(filteredResults).every(key => {
                        const filterValue = filteredResults[key];
                        const productAttributeValue = product.attribute[key];

                        // Если фильтр - это объект, проверяем наличие атрибута
                        if (typeof filterValue === 'object' && filterValue !== null) {
                            return filterValue[productAttributeValue] === true;
                        } else {
                            // Если фильтр - это простое значение, сравниваем напрямую
                            return productAttributeValue === filterValue;
                        }
                    });
                }
                // Если у продукта нет поля attribute, он не проходит фильтр
                return false;
            });

            // setMas(filteredMas);
            setListitem(filteredMas)
            console.log(JSON.stringify(filteredMas));
        } else {
            setMas([]); // Если нет фильтров, очищаем массив
            setListitem(products)
        }
    }, [filters]);

    const handleCheckbox = (name, i) => {
        setFilters((prev) => {
            // Проверяем, является ли значение по ключу name объектом
            if (typeof prev[name] === 'object') {
                return {
                    ...prev,
                    [name]: {
                        ...prev[name],
                        [i]: !prev[name][i], // или используйте переменную для ключа, если он динамический
                    },
                };
            } else {
                return {
                    ...prev,
                    [name]: !prev[name],
                };
            }
        });

    };

    // const getProduct = async () => {
    //     try {
    //         const response = await fetch('/api/products');
    //         const data = await response.json();
    //         return data; // Верните данные для использования в useEffect
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     // const fetchProducts = async () => {
    //     //     const products = await getProduct();
    //     //     setSortedProducts(products);
    //     //     setLoader(false);
    //     // };
    //     setLoader(false);
    //     setSortedProducts(products);
    //     // setProduct(products)
    //     // fetchProducts();
    // }, [products]);

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 8); // Увеличиваем количество видимых элементов на 4
    };

    const sortProducts = (criteria) => {
        let sortedArray = [...listitem];

        switch (criteria) {
            case 'priceAsc':
                sortedArray.sort((a, b) => b.price - a.price);
                break;
            case 'priceDesc':
                sortedArray.sort((a, b) => a.price - b.price);
                break;
            case 'popularity':
                break;
            default:
                break;
        }
        setListitem(sortedArray);
    };

    // if (!sortedProducts) {
    //     return <div>Загрузка...</div>
    // }


    return (
        <div className='container'>
            {/* <Loading/> */}
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
                                checked={filters['mfr']['PyroFX']}
                                onChange={() => handleCheckbox(['mfr'], 'PyroFX')}
                            />
                            <label className="catalog_text" htmlFor="PyroFX">PyroFX</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="A2"
                                id="A2"
                                checked={filters['mfr']['A2']}
                                onChange={() => handleCheckbox(['mfr'], 'A2')}
                            />
                            <label className="catalog_text" htmlFor="A2">A2</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox" name="GH"
                                id="GH"
                                checked={filters['mfr']['GH']}
                                onChange={() => handleCheckbox(['mfr'], 'GH')}
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
                                checked={filters['filter']['Горох']}
                                onChange={() => handleCheckbox(['filter'], 'Горох')}
                            />
                            <label className="catalog_text" htmlFor="Горох">Горох</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="Акустика"
                                id="Акустика"
                                checked={filters['filter']['Акустика']}
                                onChange={() => handleCheckbox(['filter'], 'Акустика')}
                            />
                            <label className="catalog_text" htmlFor="Акустика">Акустика</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="Мел"
                                id="Мел"
                                checked={filters['filter']['Мел']}
                                onChange={() => handleCheckbox(['filter'], 'Мел')}
                            />
                            <label className="catalog_text" htmlFor="Мел">Мел</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="Свето-шумовые"
                                id="СветоШумовые"
                                checked={filters['filter']['СветоШумовые']}
                                onChange={() => handleCheckbox(['filter'], 'СветоШумовые')}
                            />
                            <label className="catalog_text" htmlFor="СветоШумовые">Свето-шумовые</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="Страйкбольные шары"
                                id="СтрайкбольныеШары"
                                checked={filters['filter']['СтрайкбольныеШары']}
                                onChange={() => handleCheckbox(['filter'], 'СтрайкбольныеШары')}
                            />
                            <label className="catalog_text" htmlFor="СтрайкбольныеШары">Страйкбольные шары</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="Пейнтбольные шары"
                                id="ПейнтбольныеШары"
                                checked={filters['filter']['ПейнтбольныеШары']}
                                onChange={() => handleCheckbox(['filter'], 'ПейнтбольныеШары')}
                            />
                            <label className="catalog_text" htmlFor="ПейнтбольныеШары">Пейнтбольные шары</label>
                        </div>
                    </div>

                    <p className="catalog_subtitle">Мощность</p>


                    <div className="catalog_checkboxses">
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="PyroFX"
                                id="4corsar"
                                checked={filters['power']['4corsar']}
                                onChange={() => handleCheckbox(['power'], '4corsar')} />
                            <label className="catalog_text" htmlFor="4corsar">4 корсар</label>
                        </div>
                        <div>
                            <input
                                className="custom_checkbox"
                                type="checkbox"
                                name="PyroFX"
                                id="6corsar"
                                checked={filters['power']['6corsar']}
                                onChange={() => handleCheckbox(['power'], '6corsar')} />
                            <label className="catalog_text" htmlFor="6corsar">6 корсар</label>
                        </div>

                    </div>

                    <div className="single_checkbox">
                        <input className="custom_checkbox"
                            type="checkbox"
                            name="activeSkoba"
                            id="skoba"
                            checked={filters['clamp']}
                            onChange={() => handleCheckbox('clamp')}
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
                        {loader ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <Loading key={i} />
                            ))
                        ) : (
                            // (arr && arr.length > 0 ? arr : listitem).slice(0, visibleCount).map(product => (
                            //     <CardItem key={product.id} product={product} />
                            // ))
                            listitem.slice(0, visibleCount).map(item => (
                                <CardItem key={item.code} product={item} />
                            ))
                        )}




                    </div>

                    {visibleCount < sortedProducts.length && ( // Проверяем, есть ли еще элементы для отображения
                        <div className="btn" onClick={handleShowMore}>Показать еще</div>
                    )}
                </div>

            </div>


        </div>
    );
};


