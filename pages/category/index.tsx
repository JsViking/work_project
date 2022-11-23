import type { ReactElement } from 'react';
import Layout, { TITLE_BOILERPLATE } from 'layouts/baseLayout';
import Head from 'next/head';

import type { AppProps } from 'next/app';
import { getCategory } from 'requests';
import RightBannerLayout from 'layouts/rightBannerLayout';
import { ICategory } from 'models/articles';
import SimpleList from 'view/simpleList';

export interface TagPageProps extends AppProps {
  categories: ICategory[];
}

const TITLE = `Все рубрики | ${TITLE_BOILERPLATE}`;
const META_DESCRIPTION =
  'Полный список новостных рубрик сайта Север-Пресс: политика, происшествия, здоровье и многое другое';

export default function Category(props: TagPageProps) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
      </Head>
      <SimpleList label="Все категории " items={props.categories} />
    </>
  );
}

Category.getLayout = function getLayout(
  page: ReactElement,
  props: TagPageProps
) {
  return (
    <Layout {...props}>
      <RightBannerLayout>{page}</RightBannerLayout>
    </Layout>
  );
};

export async function getStaticProps() {
  const categories = await getCategory('?per_page=9999999');

  return {
    props: {
      categories: categories?.results || [],
    },
    revalidate: 1,
  };
}
