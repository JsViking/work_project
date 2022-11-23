import BreadCrumbs from 'components/breadCrumbs';
import LastNewsList from 'feature/lastNewsList';
import Typography from 'components/typography';
import { ArticlePageProps } from 'pages/news/[slugCategory]/[slug]';
import classes from './articlePage.module.scss';
import dayjs from 'libs/myDayjs';
import Divider from 'components/divider';
import ArticleCover from 'feature/articleCover';
import ReadUs from 'components/readUs';
import Serializer from 'feature/ModuleEditorSerializer';
import Authors from 'components/authors';
import Taglist from 'components/taglist';
import NewsBlock from 'components/mainPageBlocks/newsBlock';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { TITLE_BOILERPLATE } from 'layouts/baseLayout';
import { telegramEmbed, vkEmbed } from 'libs/helperEmbed';
import ArticleScrollShortList from 'feature/articleScrollShortList';
import Head from 'next/head';
import { coverSelection } from 'libs/helper';
import Link from 'next/link';
import ArticleTool from 'feature/articleTool';

const crumbsMap = {
  news: {
    href: '/news',
    label: 'Новости',
  },
  narrative: {
    href: '/narrative',
    label: 'Статьи',
  },
};

const ArticlePage = ({
  article,
  lastNews,
  similarArticles,
  infinityArticles,
}: ArticlePageProps) => {
  const {
    category,
    type,
    title,
    yandex_title,
    pub_date_at,
    pub_updated_at,
    url,
    slug,
  } = article;
  const articleUrl = `/${type}/${category.slug}/${slug}`;
  const [pageScrolled, setPageScrolled] = useState(false);
  const metaDescription = `${article.meta_description || article.lead || ' '}`;
  const ogTitle = `${
    article.meta_title || article.title
  } | ${TITLE_BOILERPLATE}`;
  const [metaTitle, setMetaTitle] = useState(ogTitle);
  const [refFirstArticle, inViewFirstArticle, entryFirstArticle] = useInView({
    rootMargin: '-40% 0%',
  });

  // Загрузка после первого скрола
  const onScrollHandler = () => {
    setPageScrolled(true);
    telegramEmbed();
    vkEmbed();
  };

  useEffect(() => {
    document.addEventListener('scroll', onScrollHandler, { once: true });
  });

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta property="og:title" content={ogTitle} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:image" content={coverSelection(article)} />
        <meta property="og:description" content={metaDescription} />
        <meta name="description" content={metaDescription} />
        {article.authors &&
          article.authors.map(({ first_name, last_name, id }) => (
            <meta
              key={id}
              property="article:author"
              content={`${first_name} ${last_name}`}
            />
          ))}
        {article.category && (
          <meta property="article:section" content={article.category.title} />
        )}
        {article.tags.length &&
          article.tags.map(({ title, id }) => (
            <meta property="article:tag" content={title} key={id} />
          ))}
        <meta
          property="article:published_time"
          content={dayjs(article.pub_date_at).format('YYYY-MM-DDTHH:mm:ssZ[Z]')}
        />
        <meta
          property="article:modified_time"
          content={dayjs(article.pub_updated_at).format(
            'YYYY-MM-DDTHH:mm:ssZ[Z]'
          )}
        />
        {article.is_available_by_link && (
          <meta name="robots" content="noindex, nofollow" />
        )}
        {article.image_cover && (
          <link rel="preload" as="image" href={coverSelection(article)} />
        )}
      </Head>
      <main className={classes.ArticlePage}>
        <div
          className={classes.article}
          data-article-slug={articleUrl}
          data-article-meta={JSON.stringify({
            title: article.meta_title || article.title,
            description: metaDescription,
            url: articleUrl,
            file: article?.image_cover.file || '',
          })}
          ref={refFirstArticle}
        >
          <div className={classes.wrapper}>
            <article className={classes.body}>
              <ArticleTool
                className={classes.ArticleTool}
                votes={article?.reactions}
                article={article}
                vertical
              />
              <BreadCrumbs
                items={[
                  crumbsMap[type],
                  { label: category.title, href: `/category/${category.slug}` },
                ]}
              />
              <Typography
                className={classes.title}
                size="size__24"
                fontWeight="black"
              >
                {title}
              </Typography>
              {yandex_title && (
                <Typography
                  className={classes.mb16}
                  color="secondary"
                  size="size__16"
                >
                  {yandex_title}
                </Typography>
              )}
              <div className={classes.date}>
                <Typography size="size__14" color="secondary">
                  {dayjs(pub_date_at).format('DD MMMM, HH:mm')}
                </Typography>
                {pub_updated_at && (
                  <Typography
                    className={classes.updatedDate}
                    size="size__14"
                    color="secondary"
                  >
                    {dayjs(pub_updated_at).format('Обновлено: DD MMMM, HH:mm')}
                  </Typography>
                )}
              </div>
              <div className={classes.content}>
                <Divider className={classes.mb16} />
                <ArticleCover
                  cover={article.image_cover}
                  video_cover={article.video_cover}
                />
                <ReadUs />
                <Serializer
                  images={article?.editor_data_images}
                  nodes={article?.editor_data}
                />
              </div>
              <Authors items={article.authors} />
              <ArticleTool
                className={classes.ArticleToolMobile}
                votes={article?.reactions}
                article={article}
              />
              <header className={classes.tags}>
                <Typography
                  size="size__14"
                  fontWeight="bold"
                  className={classes.tagLabel}
                >
                  Теги:
                </Typography>
                <Taglist
                  items={article?.tags?.map(({ title, slug }) => ({
                    title,
                    href: `/tag/${slug}`,
                  }))}
                />
              </header>
            </article>
            <LastNewsList
              rootTag="footer"
              infinity
              sticky
              className={classes.lastNews}
              items={lastNews}
            />
          </div>
          <header>
            <article className={classes.relatedNews}>
              <Divider lable="Также по теме" />
              <div className={classes.news}>
                {similarArticles
                  .slice(0, 2)
                  .map(({ title, category, url }, i) => (
                    <Link href={url} key={i}>
                      <a>
                        <NewsBlock
                          className={i % 2 === 0 ? classes.divider : ''}
                          title={title}
                          category={category.title}
                        />
                      </a>
                    </Link>
                  ))}
              </div>
            </article>
          </header>
        </div>
        {pageScrolled && infinityArticles && (
          <ArticleScrollShortList
            inViewFirstArticle={inViewFirstArticle}
            entryFirstArticle={entryFirstArticle}
            articles={infinityArticles}
            setMetaTitle={setMetaTitle}
          />
        )}
      </main>
    </>
  );
};

export default ArticlePage;
