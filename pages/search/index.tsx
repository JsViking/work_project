import type { GetServerSideProps, GetStaticProps } from 'next';
import { ReactElement, useState } from 'react';
import ArticleListingPage from 'view/articleListingPage';
import BaseLayout, { TITLE_BOILERPLATE } from 'layouts/baseLayout';
import { getArticle } from 'requests';
import { ArticleListPageProps } from 'models/articles';
import Head from 'next/head';
import { IGetStaticQuery } from 'models/common';
import { objectToStringParams } from 'libs/helper';
import Searcher from 'feature/searcher';
import Divider from 'components/divider';
import { useRouter } from 'next/router';

const baseURL = process.env.NEXT_PUBLIC_SITE_URL;

export default function Search(props: ArticleListPageProps) {
  const { queryParams, article } = props;
  const [currentPage, setCurrentPage] = useState(queryParams.page);
  const [value, setValue] = useState<string>(queryParams.search || '');
  const router = useRouter();

  const setSearch = () => {
    if (!value) return;
    router.push({
      pathname: `${baseURL || ''}/search/`,
      query: { search: value },
    });
  };
  return (
    <>
      <Head>
        <title>{`Поиск | ${TITLE_BOILERPLATE}`}</title>
        <meta
          name="description"
          content="Последние новости ЯНАО (Ямала) на сайте Север-Пресс. Новостные заметки о событиях в Ямало-Ненецком автономном округе"
        />
      </Head>
      <ArticleListingPage
        {...props}
        label="Поиск"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        slot={
          <>
            <Searcher
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onClick={setSearch}
              count={article.count}
            />
            <Divider />
          </>
        }
      />
    </>
  );
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page, search = '' } = context.query as IGetStaticQuery;
  const queryParams = {
    page: page || 1,
    per_page: 20,
    search,
  };

  if (!search)
    return {
      props: {
        article: {
          count: 0,
          results: [],
          next: null,
        },
        queryParams,
      },
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
