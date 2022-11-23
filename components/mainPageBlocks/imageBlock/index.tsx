import Typography from 'components/typography';
import classes from './imageBlock.module.scss';

const mock = {
  image:
    'https://yamal-media.cltest1.ru/images/insecure/rs:fill-down:1080:608/aHR0cHM6Ly8yNTc4/MjQuc2VsY2RuLnJ1/L2phbV90ZXN0L2Qx/NjhkOTJmLTM0Ni53/ZWJw.webp',
  theme: 'Тема',
  title:
    'Честный маршрут Дмитрия Артюхова возглавил топ-5 позитивных кейсов глав регионов',
};

const ImageBlock = ({ item = mock }) => {
  return (
    <div
      className={classes.ImageBlock}
      style={{ backgroundImage: `url(${item.image})` }}
    >
      <div className={classes.contentWrapper}>
        <Typography textAlign="center" size="size__14" color="white">
          {item.theme}
        </Typography>
        <Typography
          textAlign="center"
          fontWeight="black"
          size="size__24"
          color="white"
        >
          {item.title}
        </Typography>
      </div>
    </div>
  );
};

export default ImageBlock;
