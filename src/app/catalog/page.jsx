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
// import { useEffect, useState } from 'react';

const MyComponent = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const value = router.query.value; // Получаем значение из query

    const getProducts = async (value) => {
        try {
            console.log(value);
            const response = await fetch(`/api/groups?value=${encodeURIComponent(value)}`);
            const data = await response.json();
            setProducts(data); // Сохраняем данные в состояние
            console.log(data);
        } catch (error) {
            console.error('Ошибка при получении продуктов:', error);
        }
    };

    useEffect(() => {
        if (value) {
            getProducts(value);
        }
    }, [value]);

    if (!value) {
        return <div>Загрузка...</div>; // Показываем загрузку, пока value не доступно
    }

    return (
        <div>
            <h1>Продукты</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default MyComponent;
