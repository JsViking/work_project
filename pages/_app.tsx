import React from 'react';
import '../styles/globals.scss';
import type { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement, props: AppProps) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  console.log('pageProps', pageProps);
  const getLayout = Component.getLayout ?? ((page) => page);
  //@ts-ignore
  return getLayout(<Component {...pageProps} />, pageProps);
}

export default MyApp;
