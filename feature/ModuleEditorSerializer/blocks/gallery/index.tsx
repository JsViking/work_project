import React, { useEffect, useState } from 'react';
import classes from './gallery.module.scss';
import Image from 'feature/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, type Swiper as SwiperRef } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import NavArrow from 'public/img/svg/navigation.svg';
import cn from 'classnames';
import Typography from 'components/typography';
import { Counter } from 'components/slider';

interface PropsNavigation {
  swiper: any | null;
}

const SlideNextButton = ({ swiper }: PropsNavigation) => (
  <div
    className={cn(classes.next, classes.swiperButton)}
    onClick={() => swiper?.slideNext()}
    role="button"
    tabIndex={0}
    onKeyDown={() => swiper?.slideNext()}
  >
    <NavArrow />
  </div>
);

const SlidePrevButton = ({ swiper }: PropsNavigation) => (
  <div
    className={cn(classes.prev, classes.swiperButton)}
    onClick={() => swiper?.slidePrev()}
    role="button"
    tabIndex={0}
    onKeyDown={() => swiper?.slidePrev()}
  >
    <NavArrow />
  </div>
);

interface Props {
  content: {
    items: any[];
  };
  editor_data_images: any;
}

const Gallery = ({ content, editor_data_images }: Props) => {
  const [pageTitle, setPageTitle] = useState('');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [swiper, setSwiper] = useState<SwiperRef>();
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPageTitle(`${document?.title?.split(' | ')[0]} | Фото`);
    }
  }, []);

  const handleSlideChange = (index: number) => {
    // @ts-ignore
    thumbsSwiper?.slideTo(index);
    setCurrentIndex(index + 1);
  };
  return (
    <div className={classes.galleryWrapper}>
      <div className={classes.Gallery}>
        <Swiper
          thumbs={{
            swiper:
              // @ts-ignore
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          slidesPerView={1}
          onSlideChange={(slide) => handleSlideChange(slide.snapIndex)}
          onSwiper={(swiper) => setSwiper(swiper)}
          className={classes.swiper}
        >
          {content.items.map(({ id, description }) => {
            const img = editor_data_images[id]?.img;
            return (
              <SwiperSlide key={id}>
                <Image
                  crops={img}
                  layout="fill"
                  src={img?.src}
                  alt={description || pageTitle}
                  title={description || pageTitle}
                  objectFit="contain"
                  quality={100}
                  loading="lazy"
                  sizes="(max-width: 490px) calc(100vw - 40px),(max-width: 768px) calc(100vw - 60px),(max-width: 1024px) calc(100vw - 360px),(max-width: 1440px) calc(100vw - 720px),720px"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <SlideNextButton swiper={swiper} />
        <SlidePrevButton swiper={swiper} />
        <Counter
          currentIndex={currentIndex}
          count={content.items.length}
          className={classes.counter}
          color="secondary"
        />
      </div>
      <div className={classes.GalleryThumb}>
        <Swiper
          modules={[FreeMode, Navigation, Thumbs]}
          slidesPerView={1}
          className={classes.swiperThumb}
          // @ts-ignore
          onSwiper={setThumbsSwiper}
        >
          {content.items.map(({ id, description }) => (
            <SwiperSlide key={id}>
              <Typography size="size__12" color="secondary">
                {description}
              </Typography>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Gallery;
