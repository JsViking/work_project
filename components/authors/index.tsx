import Typography from 'components/typography';
import { IAuthor } from 'models/common';
import Link from 'next/link';
import classes from './authors.module.scss';

interface Props {
  items: IAuthor[];
}

const Authors = ({ items }: Props) => {
  return (
    <footer className={classes.Authors}>
      <Typography className={classes.label} color="secondary" size="size__14">
        Авторы
      </Typography>
      {items.map(({ first_name, last_name, id }) => (
        <Link href={`/author/${id}`}>
          <a>
            <Typography color="secondary" size="size__14">
              {`${first_name} ${last_name}`}
            </Typography>
          </a>
        </Link>
      ))}
    </footer>
  );
};

export default Authors;
