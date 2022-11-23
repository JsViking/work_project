import Head from 'next/head';
import { ReactElement } from 'react';
import classes from './notFound.module.scss';
import Layout, { TITLE_BOILERPLATE } from 'layouts/baseLayout';
import Typography from 'components/typography';

const TITLE = `404 | ${TITLE_BOILERPLATE}`;
const META_DESCRIPTION = 'Страница не найдена';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
      </Head>
      <div className={classes.notFound}>
        <div className={classes.wrapper}>
          <Typography fontWeight="black" className={classes.label}>
            404
          </Typography>
          <Typography size="size__18" fontWeight="bold">
            Страница не найдена
          </Typography>
        </div>
      </div>
    </>
  );
}

NotFound.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
