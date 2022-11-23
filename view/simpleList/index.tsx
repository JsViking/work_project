import Typography from 'components/typography';
import { ICategory } from 'models/articles';
import Link from 'next/link';
import classes from './simpleList.module.scss';

interface Props {
  label: string;
  items: ICategory[];
}

const SimpleList = ({ label, items }: Props) => {
  return (
    <div className={classes.SimpleList}>
      {label && (
        <Typography size="size__28" fontWeight="black">
          {label}
        </Typography>
      )}
      <ul className={classes.list}>
        {items.map(({ slug, title }) => (
          <li key={slug}>
            <Link href={`/category/${slug}`}>
              <a>
                <Typography size="size__18" fontWeight="bold">
                  {title}
                </Typography>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimpleList;
