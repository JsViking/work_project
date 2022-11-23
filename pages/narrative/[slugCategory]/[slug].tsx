import type { ReactElement } from 'react';
import Layout, { TITLE_BOILERPLATE } from 'layouts/baseLayout';
import Head from 'next/head';

import type { AppProps } from 'next/app';
import { getArticle, getNextArticle, getSimilarArticle } from 'requests';
import { IArticle } from 'models/articles';
import { GetStaticProps } from 'next';
import ArticlePage from 'view/articlePage';
import { IGetStaticParams } from 'models/common';

export interface ArticlePageProps extends AppProps {
  lastNews: IArticle[];
  article: IArticle;
  similarArticles: IArticle[];
  infinityArticles: IArticle[];
}

export default function Narrative(props: ArticlePageProps) {
  const TITLE = `${props?.article?.title || ''} | ${TITLE_BOILERPLATE}`;
  const META_DESCRIPTION = props?.article?.lead || '';
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
      </Head>
      <ArticlePage {...props} />
    </>
  );
}

Narrative.getLayout = function getLayout(
  page: ReactElement,
  props: ArticlePageProps
) {
  return <Layout {...props}>{page}</Layout>;
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as IGetStaticParams;
  const response = await Promise.all([
    getArticle(slug),
    getArticle('?per_page=9'),
    getSimilarArticle('?similar_count=2'),
    getNextArticle(slug, '?per_page=5'),
  ]);
  const [article, lastNews, similarArticles, infinityArticles] = response;

  return {
    props: {
      lastNews: lastNews?.results || [],
      article,
      similarArticles: similarArticles?.results || [],
      infinityArticles: infinityArticles?.results || [],
    },
    revalidate: 1,
  };
};
