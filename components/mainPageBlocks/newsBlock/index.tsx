import Typography, { Size } from 'components/typography';
import classes from './newsBlock.module.scss';
export interface NewsBlockProps {
  category?: string;
  title?: string;
  description?: string;
  image?: string;
  showButton?: boolean;
  titleSize?: Size;
  className?: string;
}

const NewsBlock = ({
  category = '',
  title = '',
  description = '',
  image,
  showButton,
  titleSize = 'size__24',
  className = '',
}: NewsBlockProps) => {
  return (
    <div className={`${classes.NewsBlock} ${className}`}>
      {image && <img src={image} className={classes.image} />}
      <div className={classes.titleBlock}>
        <Typography rootTag="time" size="size__14" color="secondary">
          {category}
        </Typography>
        <Typography rootTag="h2" size={titleSize} fontWeight="bold">
          {title}
        </Typography>
      </div>
      {description && (
        <Typography size="size__18" color="secondary">
          {description}
        </Typography>
      )}
      {showButton && (
        <Typography size="size__16" fontWeight="bold">
          Подробнее {'>'}
        </Typography>
      )}
    </div>
  );
};

export default NewsBlock;
