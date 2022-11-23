import type { GetServerSideProps } from 'next';
import { ReactElement, useState } from 'react';
import ArticleListingPage from 'view/articleListingPage';
import BaseLayout, { TITLE_BOILERPLATE } from 'layouts/baseLayout';
import { getArticle, getCategory } from 'requests';
import { ArticleListPageProps, ICategory } from 'models/articles';
import Head from 'next/head';
import { IGetStaticParams, IGetStaticQuery } from 'models/common';
import { objectToStringParams } from 'libs/helper';

interface AuthorListProps extends ArticleListPageProps {
  slug: string;
  category: ICategory;
}

export default function Listing(props: AuthorListProps) {
  const { article, queryParams } = props;
  const category =
    article?.results.length > 0 ? article.results[0]?.category : null;
  const [currentPage, setCurrentPage] = useState(queryParams.page);
  const totalPageCount = Math.ceil(article.count / queryParams.per_page);

  const seoPages = `Страница ${currentPage} из ${totalPageCount}`;
  const TITLE = `${category?.title} | ${
    queryParams.page === 1 ? 'Новости и статьи на сегодня' : seoPages
  } | ${TITLE_BOILERPLATE}`;
  const META_DESCRIPTION = `Новости и статьи по теме «${
    category?.title
  }» на сайте Север-Пресс ${queryParams.page === 1 ? '' : ` - ${seoPages}`}`;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
      </Head>
      <ArticleListingPage
        {...props}
        label={`${category?.title}`}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        backButton={{
          title: 'Все категории',
          href: '/category/',
        }}
      />
    </>
  );
}

Listing.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page } = context.query as IGetStaticQuery;
  const { slug } = context.params as IGetStaticParams;
  const queryParams = {
    page: page || 1,
    per_page: 20,
    category__slug: slug,
  };

  const response = await Promise.all([
    getArticle(`?${objectToStringParams(queryParams)}`),
  ]);
  const [article] = response;
  return {
    props: {
      article,
      queryParams,
      slug,
    },
  };
};
