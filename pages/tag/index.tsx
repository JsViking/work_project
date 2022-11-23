import type { ReactElement } from 'react';
import Layout, { TITLE_BOILERPLATE } from 'layouts/baseLayout';
import Head from 'next/head';

import type { AppProps } from 'next/app';
import { getCachedTags, getCategoriesHeader } from 'requests';
import AlphabetListPage, { AlphabetList } from 'view/alphabetListPage';
import { ITag } from 'models/common';
import RightBannerLayout from 'layouts/rightBannerLayout';
import { ICategory } from 'models/articles';

export interface TagPageProps extends AppProps {
  tags: AlphabetList[];
}

const TITLE = `Все теги | ${TITLE_BOILERPLATE}`;
const META_DESCRIPTION = 'Полный список новостных тегов сайта Север-Пресс';

export default function Tag(props: TagPageProps) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
      </Head>
      <AlphabetListPage label="Все теги" items={props.tags} />
    </>
  );
}

Tag.getLayout = function getLayout(page: ReactElement, props: TagPageProps) {
  return (
    <Layout {...props}>
      <RightBannerLayout>{page}</RightBannerLayout>
    </Layout>
  );
};

export async function getStaticProps() {
  const response = await Promise.all([getCachedTags(), getCategoriesHeader()]);
  const [tags, categories] = response as [ITag[], ICategory[]];
  const tagList: { [key: string]: ITag[] } = {};

  tags.forEach((tag) => {
    if (tag.is_active) {
      const char = tag.title.charAt(0).toLowerCase();
      // eslint-disable-next-line no-unused-expressions
      Array.isArray(tagList[char])
        ? tagList[char].push(tag)
        : (tagList[char] = [tag]);
    }
  });

  const alphabetList = Object.entries(tagList)
    .map(([key, value]) => ({
      firstLetter: key,
      data: value,
    }))
    .sort((a, b) => a.firstLetter.localeCompare(b.firstLetter));
  return {
    props: {
      tags: alphabetList,
      categories,
    },
    revalidate: 1,
  };
}
