import type { ReactElement } from 'react';
import Layout, { TITLE_BOILERPLATE } from 'layouts/baseLayout';
import Head from 'next/head';

import type { AppProps } from 'next/app';
import { getAuthors } from 'requests';
import { IAuthor } from 'models/common';
import RightBannerLayout from 'layouts/rightBannerLayout';
import AlphabetColumnLiastPage, {
  AlphabetList,
} from 'view/alphabetColumnLiastPage';

export interface TagPageProps extends AppProps {
  authors: AlphabetList[];
}

const TITLE = `Все авторы | ${TITLE_BOILERPLATE}`;
const META_DESCRIPTION = 'Полный список авторов сайта Север-Пресс';

export default function Author(props: TagPageProps) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
      </Head>
      <AlphabetColumnLiastPage label="Все авторы" items={props.authors} />
    </>
  );
}

Author.getLayout = function getLayout(page: ReactElement, props: TagPageProps) {
  return (
    <Layout {...props}>
      <RightBannerLayout>{page}</RightBannerLayout>
    </Layout>
  );
};

export async function getStaticProps() {
  const response = await Promise.all([getAuthors('?per_page=999999')]);
  const [authors] = response;
  const list: { [key: string]: IAuthor[] } = {};

  authors?.results?.forEach((tag: IAuthor) => {
    if (tag.is_active) {
      const char = tag.last_name.charAt(0).toLowerCase();
      // eslint-disable-next-line no-unused-expressions
      Array.isArray(list[char]) ? list[char].push(tag) : (list[char] = [tag]);
    }
  });

  const alphabetList = Object.entries(list)
    .map(([key, value]) => ({
      firstLetter: key,
      data: value,
    }))
    .sort((a, b) => a.firstLetter.localeCompare(b.firstLetter));

  return {
    props: {
      authors: alphabetList,
    },
    revalidate: 1,
  };
}
