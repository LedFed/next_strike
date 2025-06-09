import { AppProps } from 'next/app';

import "@/app/globals.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { CartProvider } from "../app/context/CartProvider";
// import { YandexMetrika } from '@koiztech/next-yandex-metrika';
import Script from 'next/script';
import { useEffect } from 'react';
// import ScrollToTop from "@/app/components/ScrollToTop";
// import LayoutClient from '@/app/components/LayoutClient'


export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.ym = window.ym || function () {
                (window.ym.a = window.ym.a || []).push(arguments);
            };
            window.ym.l = 1 * new Date();
            window.ym(process.env.NEXT_PUBLIC_YANDEX_ID, 'init', {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
            });
        }
    }, []);

    return (
        <>
            {/* <ScrollToTop > */}
            {/* <LayoutClient/> */}


            <Script
                src="https://mc.yandex.ru/metrika/tag.js"
                async
                strategy="afterInteractive"
            />
            <noscript>
                <div>
                    <img src="https://mc.yandex.ru/watch/YOUR_COUNTER_ID" style={{ position: 'absolute', left: '-9999px' }} alt="" />
                </div>
            </noscript>


            {/* <YandexMetrika
                id={process.env.NEXT_PUBLIC_YANDEX_ID}
                clickmap={true}
                trackLinks={true}
                accurateTrackBounce={true}
                webvisor={true}
                strategy="afterInteractive" /> */}
            <CartProvider>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </CartProvider>
            {/* </ScrollToTop> */}
        </>
    );
}