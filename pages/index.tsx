import type { ReactElement } from 'react';
import Layout from 'layouts/baseLayout';
import Head from 'next/head';

import type { AppProps } from 'next/app';
import MainPage from 'view/mainPage';
import {
  getArticle,
  getCachedTags,
  getCategoriesHeader,
  getMainPageArticles,
} from 'requests';
import { IArticle, ICategory } from 'models/articles';
import { chunkArrayInGroups } from 'libs/helper';
import { ITag } from 'models/common';

export interface MainPageProps extends AppProps {
  lastNews: IArticle[];
  mainArticlesGroup: IArticle[][];
  secondArticlesGroup: IArticle[][];
  thirdBlockArticles: IArticle[];
  categories: ICategory[];
  tags: ITag[];
  editorsChoice: IArticle[];
}

const TITLE = 'ИА «Север-Пресс» | Все новости ЯНАО и Ямала';
const META_DESCRIPTION =
  '«Север-Пресс» — старейшее информационное агентство ЯНАО. Рассказываем, что происходит на Ямале семь дней в неделю';

export default function Home(props: MainPageProps) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
      </Head>
      <MainPage {...props} />
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement, props: MainPageProps) {
  return <Layout {...props}>{page}</Layout>;
};

export async function getStaticProps() {
  const response = await Promise.all([
    getArticle('?per_page=7'),
    getMainPageArticles(),
    getCategoriesHeader(),
    getCachedTags(),
    getMainPageArticles('editors_choice'),
  ]);
  const [lastNews, mainArticles, categories, tags, editorsChoice] = response;
  const firstBlock = mainArticles.slice(0, 4);
  const secondBlock = mainArticles.slice(4, 10);
  const thirdBlockArticles = mainArticles.slice(0, 3);
  const mainArticlesGroup = chunkArrayInGroups(firstBlock, 2);
  const secondArticlesGroup = chunkArrayInGroups(secondBlock, 2);
  return {
    props: {
      lastNews: lastNews?.results || [],
      mainArticlesGroup,
      secondArticlesGroup,
      thirdBlockArticles,
      categories,
      tags: tags.slice(0, 7),
      editorsChoice,
    },
    revalidate: 1,
  };
}
