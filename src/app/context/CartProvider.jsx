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
    const [products, setProducts] = useState(0);

    async function getProducts() { //Возвращает продукт
        try {
            // const response = await fetch('/api/products');// замените на ваш путь
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
            const data = await response.json();
            console.log(data);
            setProducts(data.rows) 
            // return data.rows;
            console.log(products);
        } catch (error) {
            console.log(error);
        }
    }
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
        getProducts();
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
            totalPrice += item.count * item.salePrices[0].value;
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
        <CartContext.Provider value={{ cart, toggleCartItem, loadCartFromLocalStorage, totalQuant, totalSum, formatNumber, increment, decrement, products}}>
            {children}
        </CartContext.Provider>
    );
};
