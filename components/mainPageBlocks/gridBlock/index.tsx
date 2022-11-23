import Button from 'components/button';
import Divider from 'components/divider';
import { IArticle } from 'models/articles';
import Link from 'next/link';
import NewsBlock from '../newsBlock';
import classes from './gridBlock.module.scss';

interface Props {
  items: IArticle[];
  moreButtonLink?: string;
  label?: string;
}

const GridBlock = ({ items, moreButtonLink, label }: Props) => {
  return (
    <div className={classes.GridBlock}>
      {label && <Divider lable={label} />}
      <div className={classes.horizontalArticleBlock}>
        {items?.map(({ title, category, image_cover, id, url }) => (
          <Link key={id} href={url}>
            <a>
              <NewsBlock
                title={title}
                category={category?.title}
                image={image_cover?.file}
                titleSize="size__14"
              />
            </a>
          </Link>
        ))}
      </div>
      {moreButtonLink && (
        <Link href={moreButtonLink}>
          <a>
            <Button className={classes.button}>Показать ещё</Button>
          </a>
        </Link>
      )}
    </div>
  );
};

export default GridBlock;
