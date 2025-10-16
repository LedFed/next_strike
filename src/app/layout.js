
import "./globals.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import ScrollToTop from "@/app/components/ScrollToTop";
import { CartProvider } from "./context/CartProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import { YandexMetrika } from "@koiztech/next-yandex-metrika";
import GoogleAnalytics from './components/GoogleAnalytics';
import LayoutClient from './components/LayoutClient'
import { Niramit } from 'next/font/google';
const niramit = Niramit({
  subsets: ['latin'],
  weight: ['200','300','400','500','600','700'],
  style: ['normal','italic'],
  display: 'swap',
  variable: '--font-niramit' // необязательно, если хотите CSS-переменную
});


export const metadata = {
  title: 'Каталог | страйкбольного магазина strikeops',
  description: 'Магазин страйкбольных гранат strikeops: страйкбольные гранаты, дымы, мина-растяжки, армейская пиротехника, петарды',
  // icons: '/favicon.ico'
};

export default function RootLayout({ children }) {
  // const yandexMetrikaId = 101262687;
  // const googleAnalytics = 101262687;
  return (
    <html lang="ru" className={niramit.className}>

      <body >

        <div>
          <ScrollToTop />
          {/* <YandexMetrika
            id={process.env.NEXT_PUBLIC_YANDEX_ID}
            clickmap={true}
            trackLinks={true}
            accurateTrackBounce={true}
            webvisor={true}
            strategy="afterInteractive" /> */}

          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          <CartProvider>
            <Header />

            <LayoutClient >
              {children}
            </LayoutClient>
            <Footer />

          </CartProvider>

        </div>
      </body>
    </html >
  );
}
