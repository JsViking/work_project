import Chip from 'components/chip';
import Typography from 'components/typography';
import Link from 'next/link';
import { mockTagList } from 'view/mainPage';
import classes from './taglist.module.scss';

interface Props {
  items: typeof mockTagList;
  className?: string;
  moreButtonLink?: string;
}

const Taglist = ({ items, className = '', moreButtonLink }: Props) => {
  return (
    <nav className={className}>
      <h2 style={{ display: 'none' }}>Главные темы на сайте «Север-Пресс»</h2>
      <ul className={classes.Taglist}>
        {items.map(({ title, href }, i) => (
          <li key={i}>
            <Link href={href}>
              <a>
                <Chip>
                  <Typography size="size__14">{title}</Typography>
                </Chip>
              </a>
            </Link>
          </li>
        ))}
        {moreButtonLink && (
          <li>
            <Link href={moreButtonLink}>
              <a>
                <Chip backGround="grey">
                  <Typography size="size__14">Все</Typography>
                </Chip>
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Taglist;
