import Typography from 'components/typography';
import Link from 'next/link';
import classes from './breadCrumbs.module.scss';

type BreadCrumb = {
  label: string;
  href: string;
};

interface Props {
  items: BreadCrumb[];
}

const BreadCrumbs = ({ items }: Props) => {
  return (
    <div className={classes.BreadCrumbs}>
      {items.map(({ label, href }) => (
        <Link href={href}>
          <a>
            <Typography color="secondary" size="size__14">
              {label}
            </Typography>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default BreadCrumbs;
