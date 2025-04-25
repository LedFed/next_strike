"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalQuant, settotalQuant] = useState(0);
    const [totalSum, settotalSum] = useState(0);
    const [products, setProducts] = useState([]);


    // async function getProducts() {
    //     const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bdlist.json');
    //     const jsonData = fs.readFileSync(filePath);
    //     const products = JSON.parse(jsonData);
    //     setProducts(products);
    // }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bdlist.json');
                // const jsonData = fs.readFileSync(filePath);
                // const products = JSON.parse(jsonData);
                const res = await fetch('/bdlist.json')
                const data = await res.json();
                setProducts(data);
                // console.log('Полученные данные:', data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProducts();

    }, [])


    // async function getProducts() { //Возвращает продукт
    //     // await cors(req, res);
    //     // if (req.method === 'GET') {
    //     // const params = new URLSearchParams({
    //     //     expand: 'images, attributes',
    //     //     limit: 100,
    //     //     fields: 'stock',
    //     // });
    //     try {
    //         // const response = await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/product?${params}`, {
    //             const response = await fetch(`/api/products`, {
    //             // method: 'GET',
    //             // headers: {
    //             //     'Authorization': 'Bearer 04c229acda627c250062de4c2a82b1bc3c9293d5',
    //             //     'Accept-Encoding': 'gzip',
    //             // },

    //             // params: {
    //             //     expand: 'images, attributes',
    //             //     limit: 100,
    //             //     fields: 'stock', // Добавляем параметр fields
    //             // },

    //         });
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         const data = await response.json();
    //         console.log('вывод' + JSON.stringify(data) + 'вывод');
    //         setProducts(data);
    //         // return data.rows;
    //         console.log('вроде успех' + products);
    //     } catch (error) {
    //         console.log('Ошибка получение в контекст' + error);
    //     }
    //     // }
    // }
    // getProducts();
    const loadCartFromLocalStorage = () => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
            Allsum(JSON.parse(savedCart));
        }
    };

    const formatNumber = (num) => {
        // Убедимся, что num - это строка
        const numberString = String(num).replace(/\s+/g, ''); // Убираем пробелы
        const trimmedNumberString = numberString.slice(0, -2); // Убираем последние два символа

        const number = Number(trimmedNumberString); // Преобразуем строку в число

        if (isNaN(number)) return ''; // Если это не число, возвращаем пустую строку
        // Форматируем с пробелами
        return number.toLocaleString('ru-RU');
    };

    useEffect(() => {
        loadCartFromLocalStorage();
        // getProducts();
    }, []);

    const saveCartToLocalStorage = (updatedCart) => {
        Allsum(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const toggleCartItem = (product) => {
        const productExists = cart.some(item => item.code === product.code);
        let updatedCart;

        if (productExists) {
            updatedCart = cart.filter(item => item.code !== product.code);
        } else {
            const productWithCount = { ...product, count: 1 };
            updatedCart = [...cart, productWithCount];
        }
        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);
    };

    const Allsum = (updatedCart) => {
        let totalQuantity = 0;
        let totalPrice = 0;
        // console.log(cart);
        updatedCart.map(item => {
            // console.log(item);
            totalQuantity += item.count;
            totalPrice += item.count * item.price;
        })

        settotalQuant(totalQuantity);
        settotalSum(totalPrice);
    }

    const increment = (product) => {
        const updatedCart = cart.map(item => {
            if (item.id === product.id) {
                return { ...item, count: ++item.count };
            }
            return item;
        })

        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);
    }


    const decrement = (product) => {
        const updatedCart = cart.map(item => {
            if (item.id === product.id && item.count !== 1) {
                return { ...item, count: --item.count };
            }
            return item;
        })

        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);
    }

    return (
        <CartContext.Provider value={{ cart, toggleCartItem, loadCartFromLocalStorage, totalQuant, totalSum, formatNumber, increment, decrement, products }}>
            {children}
        </CartContext.Provider>
    );
};
