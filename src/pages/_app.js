import { AppProps } from 'next/app';

import "@/app/globals.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { CartProvider } from "../app/context/CartProvider";
// import ScrollToTop from "@/app/components/ScrollToTop";


export default function MyApp({ Component, pageProps }) {
    return (
        <>
            {/* <ScrollToTop > */}
                <CartProvider>
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                </CartProvider>
            {/* </ScrollToTop> */}
        </>
    );
}