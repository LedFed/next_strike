import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ScrollToTop = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    // Подписываемся на событие изменения маршрута
    router.events.on('routeChangeComplete', handleRouteChange);

    // Очистка подписки при размонтировании компонента
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return null;
};

export default ScrollToTop;
