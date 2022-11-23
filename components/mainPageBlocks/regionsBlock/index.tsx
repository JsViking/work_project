import Divider from 'components/divider';
import classes from './regionsBlock.module.scss';
import MapSvg from 'public/img/svg/map.svg';
import Link from 'next/link';
import Typography from 'components/typography';

const mock = [
  'Салехард',
  'Салехард',
  'Салехард',
  'Салехард',
  'Салехард',
  'Салехард',
  'Салехард',
  'Салехард',
  'Салехард',
  'Салехард',
];

interface Props {
  regions?: string[];
}

const RegionsBlock = ({ regions = mock }: Props) => {
  return (
    <div className={classes.RegionsBlock}>
      <Divider lable="Новости по регионам" />
      <div className={classes.content}>
        <div className={classes.map}>
          <MapSvg />
        </div>
        <div className={classes.list}>
          {regions.map((item, i) => (
            <Link key={i} href="/">
              <a>
                <Typography size="size__18" fontWeight="bold">
                  {item}
                </Typography>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionsBlock;
