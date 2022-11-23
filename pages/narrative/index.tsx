import type { GetServerSideProps } from 'next';
import { ReactElement, useState } from 'react';
import ArticleListingPage from 'view/articleListingPage';
import BaseLayout, { TITLE_BOILERPLATE } from 'layouts/baseLayout';
import { getArticle } from 'requests';
import { ArticleListPageProps } from 'models/articles';
import { IGetStaticQuery } from 'models/common';
import { objectToStringParams } from 'libs/helper';
import Head from 'next/head';

const TITLE = `Свежие статьи ЯНАО (Ямала) на сегодня | ${TITLE_BOILERPLATE}`;
const META_DESCRIPTION =
  'Актуальные статьи ЯНАО (Ямала) на сайте Север-Пресс. Интересные лонгриды о явлениях в Ямало-Ненецком автономном округе';

export default function Listing(props: ArticleListPageProps) {
  const { queryParams } = props;
  const [currentPage, setCurrentPage] = useState(queryParams.page);
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
        label="Все статьи"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

Listing.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page } = context.query as IGetStaticQuery;
  const queryParams = {
    page: page || 1,
    per_page: 20,
    type: 'narrative',
  };

  const response = await Promise.all([
    getArticle(`?${objectToStringParams(queryParams)}`),
  ]);
  const [article] = response;
  return {
    props: {
      article,
      queryParams,
    },
  };
};
