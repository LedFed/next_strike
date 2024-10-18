// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// // import Card from '@/app/components/Card';
// // import "../app/globals.css";

// const Catalog = () => {
//     // const router = useRouter();
//     // const { value } = router.query; // Извлекаем значение из query
//     // const [products, setProducts] = useState([]);

//     // const getProducts = async (value) => {
//     //     try {
//     //         const response = await fetch(`/api/groups?value=${encodeURIComponent(value)}`);
//     //         console.log(response);
//     //         const data = await response.json();
//     //         console.log(data);
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
//     //                 console.log(productData);
//     //             }
//     //         };

//     //         fetchProducts();
//     //     }
//     // }, [value]);

//     return (

//         <div>
//             <h1>Каталог товаров по теме: </h1>
//             <div className="product_list">
//                 <div className="card_items">

                    
//                         <div key={products.id} className="product_item">
//                             <h2>{products.name}</h2>
//                             {/* Здесь можно добавить другие детали о продукте */}
//                         </div>

//                       {/* <Card product={product} key={product.id}/> */}
             
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Catalog;