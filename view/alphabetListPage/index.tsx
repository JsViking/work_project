import Divider from 'components/divider';
import Typography from 'components/typography';
import { ITag } from 'models/common';
import Link from 'next/link';
import { Fragment } from 'react';
import classes from './alphabetListPage.module.scss';

export type AlphabetList = { firstLetter: string; data: ITag[] };

interface Props {
  items?: AlphabetList[];
  label?: string;
}

const AlphabetListPage = ({ items, label }: Props) => {
  return (
    <div className={classes.AlphabetListPage}>
      {label && (
        <Typography size="size__28" fontWeight="black">
          {label}
        </Typography>
      )}
      {items && (
        <div className={classes.alphabet}>
          {items.map(({ firstLetter }) => (
            <Link href={`#${firstLetter}`} key={firstLetter}>
              <a>
                <Typography size="size__18" fontWeight="bold">
                  {firstLetter}
                </Typography>
              </a>
            </Link>
          ))}
        </div>
      )}
      <Divider />
      {items?.map(({ firstLetter, data }) => (
        <Fragment key={firstLetter}>
          <div id={firstLetter} className={classes.listBlock}>
            <Typography size="size__28" fontWeight="black">
              {firstLetter}
            </Typography>
            <ul className={classes.list}>
              {data.map(({ title, slug }) => (
                <li key={slug}>
                  <Link href={`/tag/${slug}`}>
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
          <Divider />
        </Fragment>
      ))}
    </div>
  );
};

export default AlphabetListPage;
