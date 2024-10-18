
// export const getStaticProps = async () => {


//     // return {
//     //     props:{
//     //         product: data,
//     //     }
//     // }
// }
// "use client";
// import react from "react";
// import { useCart } from "../../app/context/CartProvider";
// import Link from "next/link";

// const Product = () => {
//     const { toggleCartItem, cart, loadCartFromLocalStorage, products } = useCart();

//     return (
//         <>

//             {cart.map(item => (
//                 <Link href={`/product/${item.code}`} key={item.code}>{item.name} </Link>
//             ))}

//         </>
//     )
// }

// export default Product;