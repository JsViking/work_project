import AuthorCard from 'components/authorCard';
import Divider from 'components/divider';
import Typography from 'components/typography';
import { IAuthor } from 'models/common';
import Link from 'next/link';
import { Fragment } from 'react';
import classes from './alphabetColumnLiastPage.module.scss';
export type AlphabetList = { firstLetter: string; data: IAuthor[] };

interface Props {
  items?: AlphabetList[];
  label?: string;
}

const AlphabetColumnLiastPage = ({ items, label }: Props) => {
  return (
    <div className={classes.AlphabetColumnLiastPage}>
      {label && (
        <Typography size="size__28" fontWeight="black">
          {label}
        </Typography>
      )}
      {items?.map(({ firstLetter, data }, index) => (
        <Fragment key={firstLetter}>
          <div className={classes.column}>
            <Typography
              size="size__28"
              fontWeight="black"
              transform="uppercase"
            >
              {firstLetter}
            </Typography>
            <div className={classes.list}>
              {data.map(({ post, first_name, last_name, avatar, id }, i) => (
                <Fragment key={id}>
                  <Link href={`/author/${id}`}>
                    <a>
                      <AuthorCard
                        position={post}
                        fio={`${last_name} ${first_name}`}
                        avatar={avatar || ''}
                      />
                    </a>
                  </Link>
                  {i !== data.length - 1 && <Divider />}
                </Fragment>
              ))}
            </div>
          </div>
          {index !== items.length - 1 && <Divider />}
        </Fragment>
      ))}
    </div>
  );
};

export default AlphabetColumnLiastPage;
