'use client';
import Image from 'next/image';
import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';

export default function Carousel({ slides = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const intervalId = setInterval(() => {
      // пролистываем вперёд; если достигнут конец, emblaApi.scrollNext() будет вести себя в зависимости от настроек loop
      emblaApi.scrollNext();
    }, 7000); // 9000 ms = 9 секунд

    return () => clearInterval(intervalId);
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((src, idx) => (
            <div className="embla__slide" key={idx}>
              <h1 className='main_title'>{src.title}</h1>
              <Image src={src.img} alt={`slide-${idx}`} priority/>
              <Link href={src.links} className='btn'>Посмотреть</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

