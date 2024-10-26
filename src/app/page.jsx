"use client";
import React, { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Link from 'next/link';
import Card from './components/Card';
import Category from './components/Category';
import Accordion from './components/Accordion';
import Feedback from './components/Feedback';
import Slider from 'react-slick';

export default function Main() {


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="container">

        <Slider {...settings}>
          <div className="banner">
            <h1 className="main_title">Самые низкие цены</h1>
          </div>
          <div className="banner">
            <h1 className="main_title">Самые низкие цены</h1>
          </div>
        </Slider>
        {/* <>Привет мир</> */}
        {/* <div className="banner">
          <h1 className="main_title">Самые низкие цены</h1>
        </div> */}
        <h2 className="title">Категории товаров</h2>
        <Category />
        <h2 className="title">Популярные товары</h2>
        <Card />

        <Feedback />

        <h2 className="title center">FaQ</h2>
        <Accordion />
      </div>


    </>
  )
}
