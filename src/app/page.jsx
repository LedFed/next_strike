"use client";
import React, { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

export default function Main() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  return (
    <>
      <Header  productList={products} basket={cart} />
      <>Привет мир</>
      <Footer />
    </>
  )
}
