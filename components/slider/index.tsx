import classes from './slider.module.scss';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import Typography, { TypographyColor } from 'components/typography';
import NavigationSvg from 'public/img/svg/navigation.svg';
import { useState } from 'react';

const mock = [
  {
    image:
      'https://yamal-media.cltest1.ru/images/insecure/rs:fill-down:1920:1080/aHR0cHM6Ly8yNTc4/MjQuc2VsY2RuLnJ1/L2phbV90ZXN0L2Jm/NTcwM2UxLTQ0Zi53/ZWJw.webp',
    theme: 'Тема',
    title:
      'Честный маршрут Дмитрия Артюхова возглавил топ-5 позитивных кейсов глав регионов',
  },
  {
    image:
      'https://yamal-media.cltest1.ru/images/insecure/rs:fill-down:1080:608/aHR0cHM6Ly8yNTc4/MjQuc2VsY2RuLnJ1/L2phbV90ZXN0L2Qx/NjhkOTJmLTM0Ni53/ZWJw.webp',
    theme: 'Тема',
    title:
      'Честный маршрут Дмитрия Артюхова возглавил топ-5 позитивных кейсов глав регионов',
  },
  {
    image:
      'https://yamal-media.cltest1.ru/images/insecure/rs:fill-down:1080:608/aHR0cHM6Ly8yNTc4/MjQuc2VsY2RuLnJ1/L2phbV90ZXN0LzI3/YTllZThhLTQ5OC53/ZWJw.webp',
    theme: 'Тема',
    title:
      'Честный маршрут Дмитрия Артюхова возглавил топ-5 позитивных кейсов глав регионов',
  },
];

export function SlideNextButton({ className = '' }) {
  const swiper = useSwiper();
  return (
    <NavigationSvg
      className={className}
      style={{ transform: 'rotate(180deg)' }}
      onClick={() => swiper.slideNext()}
    />
  );
}

export function SlidePrevButton({ className = '' }) {
  const swiper = useSwiper();
  return (
    <NavigationSvg className={className} onClick={() => swiper.slidePrev()} />
  );
}

interface CounterProps {
  currentIndex: number;
  count: number;
  className?: string;
  color?: TypographyColor;
}

export function Counter({
  currentIndex = 1,
  count = 1,
  className = '',
  color = 'secondary',
}: CounterProps) {
  return (
    <Typography
      className={className}
      size="size__14"
      fontWeight="black"
      color={color}
    >
      {currentIndex} / {count}
    </Typography>
  );
}

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  return (
    <div className={classes.Slider}>
      <Swiper
        className={classes.wrapper}
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex + 1)}
      >
        {mock.map(({ image, theme, title }) => {
          return (
            <SwiperSlide>
              <div
                className={classes.slide}
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className={classes.contentWrapper}>
                  <Typography textAlign="center" size="size__14" color="white">
                    {theme}
                  </Typography>
                  <Typography
                    textAlign="center"
                    fontWeight="black"
                    size="size__24"
                    color="white"
                  >
                    {title}
                  </Typography>
                  <div className={classes.buttonBlock}>
                    <SlidePrevButton />
                    <Counter currentIndex={currentIndex} count={mock.length} />
                    <SlideNextButton />
                  </div>
                </div>
                <SlidePrevButton
                  className={`${classes.button} ${classes.left}`}
                />
                <SlideNextButton
                  className={`${classes.button} ${classes.right}`}
                />
                <Counter
                  currentIndex={currentIndex}
                  count={mock.length}
                  className={classes.counter}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
