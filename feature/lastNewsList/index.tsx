import Typography from 'components/typography';
import { IArticle } from 'models/articles';
import { Fragment, useEffect, useState } from 'react';
import classes from './lastNewsList.module.scss';
import dayjs from 'libs/myDayjs';
import Link from 'next/link';
import Button from 'components/button';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getArticle } from 'requests';

interface Props {
  items?: IArticle[];
  label?: string;
  className?: string;
  moreButton?: boolean;
  sticky?: boolean;
  infinity?: boolean;
  rootTag?: keyof JSX.IntrinsicElements;
}

const LastNewsList = ({
  items,
  label = 'Лента новостей',
  className = '',
  moreButton,
  sticky,
  infinity,
  rootTag: Root = 'article',
}: Props) => {
  const [articles, setArticles] = useState({
    next: '',
    results: items || [],
    count: 0,
  });
  const [paginationQuery, setPaginationQuery] = useState('');

  const fetchData = async (query?: string) => {
    const queryParams = query || paginationQuery;
    const { results, next, count } = await getArticle(queryParams);
    const parsedPage = (next && next.split('?')) || [];
    setPaginationQuery(`?${parsedPage[1]}`);
    if (results) {
      setArticles({
        next,
        count,
        results: query ? results : [...articles.results, ...results],
      });
    }
  };

  useEffect(() => {
    fetchData('?type=news,narrative&category__is_main=true');
  }, []);

  return (
    <Root
      className={`${classes.LastNewsList} ${
        sticky ? classes.sticky : ''
      } ${className}`}
    >
      <Typography size="size__28" fontWeight="black">
        {label}
      </Typography>
      <InfiniteScroll
        dataLength={articles.results.length + 1}
        next={() => fetchData()}
        hasMore={Boolean(infinity) && Boolean(articles.next)}
        height={infinity ? '90vh' : undefined}
        loader={<span></span>}
        className={classes.scrollComponent}
      >
        <div className={classes.listWrapper}>
          {articles.results.map(({ title, pub_date_at, url }, i) => (
            <Fragment key={title}>
              <Link href={`/${url}`}>
                <a>
                  <div className={classes.article}>
                    <Typography size="size__14" color="secondary">
                      {dayjs(pub_date_at).format('DD MMMM YYYY, HH:mm')}
                    </Typography>
                    <Typography size="size__16">{title}</Typography>
                  </div>
                </a>
              </Link>
              {articles.results.length - 1 !== i && (
                <div className={classes.divider} />
              )}
            </Fragment>
          ))}
        </div>
      </InfiniteScroll>
      {moreButton && (
        <Link href="/news">
          <a>
            <Button>Все новости</Button>
          </a>
        </Link>
      )}
    </Root>
  );
};

export default LastNewsList;
