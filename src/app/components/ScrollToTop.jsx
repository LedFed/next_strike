import { useEffect } from 'react';
import { useRouter } from 'next/router';

const MyComponent = () => {
  const e = useRouter();

  useEffect(() => {
    if (!e.events) {
      console.error('Router events are undefined');
      return;
    }

    const t = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    };

    e.events.on("routeChangeComplete", t);

    return () => {
      e.events.off("routeChangeComplete", t);
    };
  }, [e.events]);

  return null; // Или ваш JSX
};

export default MyComponent;
