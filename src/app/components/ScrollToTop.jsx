"use client"; // Помечаем компонент как клиентский

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScrollToTop = () => {
  const pathname = usePathname(); // Получаем текущий путь

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    // console.log("Изменение положения скролла"); // Лог для отладки
  }, [pathname]); // Запускаем эффект при изменении пути

  return null; // Этот компонент ничего не рендерит
};

export default ScrollToTop;
