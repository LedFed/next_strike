'use client';
// // components/EmblaCarousel.js
// import React, { useEffect, useRef, useCallback } from 'react'
// import Image from 'next/image'
// import useEmblaCarousel from 'embla-carousel-react'

// export default function EmblaCarousel({ slides = [], interval = 3000, options = { loop: true } }) {
//   const [emblaRef, emblaApi] = useEmblaCarousel(options)
//   const autoplayRef = useRef(null)
//   const isPausedRef = useRef(false)

//   const stopAutoplay = useCallback(() => {
//     if (autoplayRef.current) {
//       clearInterval(autoplayRef.current)
//       autoplayRef.current = null
//     }
//   }, [])

//   const startAutoplay = useCallback(() => {
//     stopAutoplay()
//     if (!emblaApi || isPausedRef.current) return
//     autoplayRef.current = setInterval(() => {
//       if (!emblaApi) return
//       if (emblaApi.canScrollNext()) emblaApi.scrollNext()
//       else emblaApi.scrollTo(0) // в случае отсутствия loop
//     }, interval)
//   }, [emblaApi, interval, stopAutoplay])

//   // Установки автоплейа и обработчики взаимодействий
//   useEffect(() => {
//     if (!emblaApi) return

//     // старт при инициализации
//     startAutoplay()

//     const onPointerDown = () => {
//       isPausedRef.current = true
//       stopAutoplay()
//     }
//     const onPointerUp = () => {
//       // возобновляем после небольшого таймаута (чтобы не крутилось сразу при отпускании)
//       isPausedRef.current = false
//       // немного отложим рестарт, чтобы избежать конфликтов с жестами
//       setTimeout(() => startAutoplay(), 200)
//     }
//     const onVisibilityChange = () => {
//       if (document.visibilityState === 'hidden') {
//         stopAutoplay()
//       } else {
//         // возобновить если не было ручной паузы
//         if (!isPausedRef.current) startAutoplay()
//       }
//     }

//     emblaApi.on('pointerDown', onPointerDown)
//     // pointerUp может не сработать всегда, лучше слушать settle и pointerUp
//     emblaApi.on('pointerUp', onPointerUp)
//     emblaApi.on('dragEnd', onPointerUp)
//     document.addEventListener('visibilitychange', onVisibilityChange)

//     // IntersectionObserver: если слайдер вне экрана — пауза
//     const io = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (!entry.isIntersecting) {
//           stopAutoplay()
//         } else if (!isPausedRef.current) {
//           startAutoplay()
//         }
//       })
//     }, { threshold: 0.25 })

//     // элемент viewport — родительный элемент, к которому привязан ref
//     const el = emblaRef && emblaRef.current ? emblaRef.current : null
//     if (el) io.observe(el)

//     return () => {
//       stopAutoplay()
//       emblaApi.off('pointerDown', onPointerDown)
//       emblaApi.off('pointerUp', onPointerUp)
//             emblaApi.off('dragEnd', onPointerUp)
//       document.removeEventListener('visibilitychange', onVisibilityChange)
//       io.disconnect()
//     }
//   }, [emblaApi, emblaRef, startAutoplay, stopAutoplay])

//   // Можно также управлять навигацией с кнопок
//   const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
//   const scrollNext = () => emblaApi && emblaApi.scrollNext()

//   return (
//     <div className="embla" ref={emblaRef}>
//       <div className="embla__viewport">
//         <div className="embla__container">
//           {slides.map((s, idx) => (
//             <div className="embla__slide" key={idx} style={{ position: 'relative' }}>
//               {/* Используем next/image с fill — контейнер должен быть position: relative */}
//               <Image src={s} alt={`slide-${idx}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div style={{ marginTop: 8 }}>
//         <button className="embla__button" onClick={scrollPrev} aria-label="Previous">Prev</button>
//         <button className="embla__button" onClick={scrollNext} aria-label="Next" style={{ marginLeft: 8 }}>Next</button>
//       </div>
//     </div>
//   )
// }


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
              <img src={src.img} alt={`slide-${idx}`} loading="lazy" />
              <Link href={src.links} className='btn'>Посмотреть</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

