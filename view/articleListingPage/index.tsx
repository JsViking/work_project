import Divider from 'components/divider';
import Typography from 'components/typography';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import classes from './articleListingPage.module.scss';
import dayjs from 'libs/myDayjs';
import Link from 'next/link';
import NewsListBlock from 'feature/newsListBlock';
import Paginate from 'components/pagination';
import { useRouter } from 'next/router';
import { objectToStringParams } from 'libs/helper';
import { getArticle } from 'requests';
import { ArticleListPageProps } from 'models/articles';

interface Props extends ArticleListPageProps {
  backButton?: {
    title: string;
    href: string;
  };
  children?: ReactNode;
  slot?: ReactNode;
}

const ArticleListingPage = ({
  label,
  article,
  backButton,
  children,
  queryParams,
  currentPage,
  setCurrentPage,
  slot,
}: Props) => {
  const { per_page = 20 } = queryParams;
  const [articles, setArticles] = useState(article);

  const router = useRouter();

  useEffect(() => {
    setArticles(article);
  }, [article]);

  const fetchFeeds = async (page: number) => {
    const query = {
      ...queryParams,
      page,
    };
    const responseArticle = await getArticle(`?${objectToStringParams(query)}`);

    setArticles(responseArticle);
  };

  const handleChange = (page: number) => {
    if (page === 1) {
      router.replace(
        {
          query: router.query.slug ? { slug: router.query.slug } : {},
        },
        undefined,
        {
          shallow: true,
        }
      );
    } else {
      router.replace(
        {
          query: { ...router.query, page },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  useEffect(() => {
    const queryPage = Number(router?.query?.page) || 1;
    if (queryPage !== currentPage) {
      fetchFeeds(queryPage).catch(console.error);
    }
    setCurrentPage(queryPage);
  }, [router]);
  return (
    <main className={classes.ArticleListingPage}>
      <article className={classes.content}>
        {backButton && (
          <Link href={backButton.href}>
            <a>
              <Typography rootTag="header">{`< ${backButton.title}`}</Typography>
            </a>
          </Link>
        )}
        {children}
        <Typography rootTag="h1" size="size__28" fontWeight="black">
          {label}
        </Typography>
        {slot}
        <article className={classes.list}>
          {articles?.results?.map(
            ({ title, pub_date_at, url, image_cover }, i) => (
              <Fragment key={i}>
                <Link href={`/${url}`}>
                  <a>
                    <NewsListBlock
                      title={title}
                      category={dayjs(pub_date_at).format(
                        'DD MMMM YYYY, HH:mm'
                      )}
                      image={
                        image_cover?.img?.srcset?.find(
                          ({ width }) => width === 640
                        )?.src
                      }
                    />
                  </a>
                </Link>
                <Divider />
              </Fragment>
            )
          )}
        </article>
        {articles && (
          <Paginate
            route={router.asPath}
            currentPage={Number(currentPage)}
            totalCount={articles.count}
            pageSize={Number(per_page)}
            onPageChange={(page) => handleChange(page)}
            showLastPage
          />
        )}
      </article>
      <div className={classes.bannerPlace}></div>
    </main>
  );
};

export default ArticleListingPage;
