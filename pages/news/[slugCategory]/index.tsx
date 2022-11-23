import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticProps } from 'next';
import { ReactElement } from 'react';

export interface IGetStaticParams extends ParsedUrlQuery {
  slugCategory: string;
}

export default function Category() {
  return null;
}

Category.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
