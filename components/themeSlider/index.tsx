import { Swiper, SwiperSlide } from 'swiper/react';
import { type Swiper as SwiperRef } from 'swiper';
import Typography from 'components/typography';
import 'swiper/css';
import { useState } from 'react';
import classes from './themeSlider.module.scss';
import Link from 'next/link';
import NavigationSvg from 'public/img/svg/navigation.svg';
import Button from 'components/button';
import { Counter } from 'components/slider';

const mock = [
  {
    title: 'Короновирус',
    image:
      'https://yamal-media.cltest1.ru/images/insecure/rs:fill-down:616:346/aHR0cHM6Ly8yNTc4/MjQuc2VsY2RuLnJ1/L2phbV90ZXN0LzU1/NDIxZDE0LTQ2OC53/ZWJw.webp',
    href: '/',
  },
  {
    title: 'Короновирус',
    image:
      'https://yamal-media.cltest1.ru/images/insecure/rs:fill-down:616:346/aHR0cHM6Ly8yNTc4/MjQuc2VsY2RuLnJ1/L2phbV90ZXN0LzU1/NDIxZDE0LTQ2OC53/ZWJw.webp',
    href: '/',
  },
  {
    title: 'Короновирус',
    image:
      'https://yamal-media.cltest1.ru/images/insecure/rs:fill-down:616:346/aHR0cHM6Ly8yNTc4/MjQuc2VsY2RuLnJ1/L2phbV90ZXN0LzU1/NDIxZDE0LTQ2OC53/ZWJw.webp',
    href: '/',
  },
  {
    title: 'Короновирус',
    image:
      'https://yamal-media.cltest1.ru/images/insecure/rs:fill-down:616:346/aHR0cHM6Ly8yNTc4/MjQuc2VsY2RuLnJ1/L2phbV90ZXN0LzU1/NDIxZDE0LTQ2OC53/ZWJw.webp',
    href: '/',
  },
  {
    title: 'Короновирус',
    image:
      'https://yamal-media.cltest1.ru/images/insecure/rs:fill-down:616:346/aHR0cHM6Ly8yNTc4/MjQuc2VsY2RuLnJ1/L2phbV90ZXN0LzU1/NDIxZDE0LTQ2OC53/ZWJw.webp',
    href: '/',
  },
  {
    title: 'Короновирус',
    image:
      'https://yamal-media.cltest1.ru/images/insecure/rs:fill-down:616:346/aHR0cHM6Ly8yNTc4/MjQuc2VsY2RuLnJ1/L2phbV90ZXN0LzU1/NDIxZDE0LTQ2OC53/ZWJw.webp',
    href: '/',
  },
  {
    title: 'Короновирус',
    image:
      'https://yamal-media.cltest1.ru/images/insecure/rs:fill-down:616:346/aHR0cHM6Ly8yNTc4/MjQuc2VsY2RuLnJ1/L2phbV90ZXN0LzU1/NDIxZDE0LTQ2OC53/ZWJw.webp',
    href: '/',
  },
  {
    title: 'Короновирус',
    image:
      'https://yamal-media.cltest1.ru/images/insecure/rs:fill-down:616:346/aHR0cHM6Ly8yNTc4/MjQuc2VsY2RuLnJ1/L2phbV90ZXN0LzU1/NDIxZDE0LTQ2OC53/ZWJw.webp',
    href: '/',
  },
  {
    title: 'Короновирус',
    image:
      'https://yamal-media.cltest1.ru/images/insecure/rs:fill-down:616:346/aHR0cHM6Ly8yNTc4/MjQuc2VsY2RuLnJ1/L2phbV90ZXN0LzU1/NDIxZDE0LTQ2OC53/ZWJw.webp',
    href: '/',
  },
  {
    title: 'Короновирус',
    image:
      'https://yamal-media.cltest1.ru/images/insecure/rs:fill-down:616:346/aHR0cHM6Ly8yNTc4/MjQuc2VsY2RuLnJ1/L2phbV90ZXN0LzU1/NDIxZDE0LTQ2OC53/ZWJw.webp',
    href: '/',
  },
];

interface LinkWrapperProps {
  url: string;
  children?: React.ReactNode;
}

const LinkWrapper = ({ url, children }: LinkWrapperProps) => (
  <Link href={url}>
    <a>{children}</a>
  </Link>
);

const ThemeSlider = ({ items = mock }) => {
  const [swiper, setSwiper] = useState<SwiperRef>();
  const [currentIndex, setCurrentIndex] = useState(1);
  if (!items?.length) return null;
  return (
    <div className={classes.ThemeSlider}>
      <Typography textAlign="center" size="size__28" fontWeight="black">
        Темы
      </Typography>
      <div className={classes.swiperWrapper}>
        <Swiper
          onSwiper={(swiper) => setSwiper(swiper)}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex + 1)}
          className={classes.wrapper}
          slidesPerView={1}
          centerInsufficientSlides
          breakpoints={{
            1000: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1150: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1500: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {items.map(({ title, image, href }, i) => {
            return (
              <SwiperSlide key={i}>
                <LinkWrapper url={href}>
                  <div className={classes.slideWrapper}>
                    <div
                      className={classes.slide}
                      style={{ background: `url(${image})` }}
                    >
                      <Typography
                        size="size__18"
                        fontWeight="black"
                        color="white"
                        className={classes.title}
                      >
                        {title}
                      </Typography>
                    </div>
                  </div>
                </LinkWrapper>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <NavigationSvg
          className={`${classes.navigation} ${classes.navigationRight}`}
          onClick={() => swiper?.slideNext()}
        />
        <NavigationSvg
          className={`${classes.navigation} ${classes.navigationLeft}`}
          onClick={() => swiper?.slidePrev()}
        />
        <Counter
          currentIndex={currentIndex}
          count={items.length}
          className={classes.counter}
        />
      </div>
      <Button className={classes.button}>Все темы</Button>
    </div>
  );
};

export default ThemeSlider;
