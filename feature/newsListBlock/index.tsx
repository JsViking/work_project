import classes from './newsListBlock.module.scss';
import NewsBlock, { NewsBlockProps } from 'components/mainPageBlocks/newsBlock';

interface Props extends NewsBlockProps {
  image?: string;
}

const NewsListBlock = ({ image, ...rest }: Props) => {
  return (
    <div className={classes.NewsListBlock}>
      <NewsBlock {...rest} />
      {image && (
        <div className={classes.imgWrapper}>
          <img src={image} />
        </div>
      )}
    </div>
  );
};

export default NewsListBlock;
