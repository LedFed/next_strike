"use client";
import React, { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Link from 'next/link';
import Card from './components/Card';
import Category from './components/Category';
import Accordion from './components/Accordion';
import Feedback from './components/Feedback';

export default function Main() {

  return (
    <>
      <div className="container">

        {/* <>Привет мир</> */}
        <div className="banner">
          <h1 className="main_title">Самые низкие цены</h1>
        </div>
        <h2 className="title">Категории товаров</h2>
        <Category />
        <h2 className="title">Популярные товары</h2>
        <Card />

        <Feedback/>

        <h2 className="title center">FaQ</h2>
        <Accordion />
      </div>


    </>
  )
}
