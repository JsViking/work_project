import type { GetServerSideProps } from 'next';
import { ReactElement, useState } from 'react';
import ArticleListingPage from 'view/articleListingPage';
import BaseLayout, { TITLE_BOILERPLATE } from 'layouts/baseLayout';
import { getArticle, getAuthors } from 'requests';
import { ArticleListPageProps } from 'models/articles';
import Head from 'next/head';
import { IAuthor, IGetStaticParams, IGetStaticQuery } from 'models/common';
import { objectToStringParams } from 'libs/helper';
import AuthorCard from 'components/authorCard';

interface AuthorListProps extends ArticleListPageProps {
  slug: string;
  author: IAuthor;
}

export default function Listing(props: AuthorListProps) {
  const { article, queryParams, author } = props;
  const [currentPage, setCurrentPage] = useState(queryParams.page);
  const totalPageCount = Math.ceil(article.count / queryParams.per_page);

  const seoPages = `Страница ${currentPage} из ${totalPageCount}`;
  const TITLE = `${author.first_name} ${author.last_name}  | ${
    queryParams.page === 1 ? '' : seoPages
  } | ${TITLE_BOILERPLATE}`;
  const META_DESCRIPTION = `${author.first_name} ${
    author.last_name
  } — статьи на сайте Север-Пресс ${
    queryParams.page === 1 ? '' : ` - ${seoPages}`
  }`;

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
        label="Публикации автора"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        backButton={{
          title: 'Все авторы',
          href: '/author/',
        }}
      >
        <AuthorCard
          avatar={author?.avatar || undefined}
          fio={`${author.first_name} ${author.last_name}`}
          position={author.post}
          email={author.email}
        />
      </ArticleListingPage>
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
    author__id: slug,
  };

  const response = await Promise.all([
    getArticle(`?${objectToStringParams(queryParams)}`),
    getAuthors(slug),
  ]);
  const [article, author] = response;
  return {
    props: {
      article,
      queryParams,
      slug,
      author,
    },
  };
};
