/* eslint-disable react/no-danger */
/* eslint-disable no-shadow */
import React, { Fragment, useEffect } from 'react';
import classes from './ArticleScrollPage.module.scss';
import ArticlePreview from 'components/articlePreview';
import { InView } from 'react-intersection-observer';
import { IArticle } from 'models/articles';
import { TITLE_BOILERPLATE } from 'layouts/baseLayout';
import Divider from 'components/divider';

export interface IArticleScrollShortList {
  articles: IArticle[];
  inViewFirstArticle: boolean;
  entryFirstArticle?: IntersectionObserverEntry;
  setMetaTitle: (meta: string) => void;
}

const ArticleScrollShortList = ({
  articles,
  inViewFirstArticle,
  entryFirstArticle,
  setMetaTitle,
}: IArticleScrollShortList) => {
  const isRelativePath = (path: string) => {
    let url = path;
    try {
      url = new URL(path).pathname;
    } catch (err) {
      // console.log('ERROR isRelativePath: ', err);
    }
    return url;
  };

  const observerHandler = (
    isView: boolean,
    entry: IntersectionObserverEntry | undefined,
    isFirst?: boolean
  ) => {
    if (!isView) return;
    const target = entry?.target as HTMLElement;
    const data = target.dataset;
    const { articleSlug, articleMeta } = data;
    const baseUrl = isRelativePath(articleSlug || '');
    const url = `${baseUrl}${isFirst ? '' : '?from=inf_cards'}`;
    const { title } = JSON.parse(articleMeta || '');
    window.history.replaceState(
      {
        as: undefined,
        url,
        options: { shallow: true, scroll: false },
      },
      '',
      url
    );
    const metrikaMetaTitle = `${title} | ${TITLE_BOILERPLATE}`;
    setMetaTitle(metrikaMetaTitle);
  };

  useEffect(() => {
    observerHandler(inViewFirstArticle, entryFirstArticle, true);
  }, [inViewFirstArticle]);

  return (
    <div className={classes.ArticleScrollPage}>
      <div className={classes.wrapper}>
        {articles?.map((article, i) => (
          <InView
            as="article"
            onChange={observerHandler}
            rootMargin={'-50% 0%'}
            data-article-id={article.id}
            data-article-slug={article.url}
            data-article-meta={JSON.stringify({
              title: article.meta_title || article.title,
              description: article?.meta_description || '',
              url: article.url,
              file: article?.image_cover.file,
            })}
            key={article.slug}
          >
            <Fragment key={article.id}>
              <ArticlePreview
                link={article.url}
                lead={article.lead || ''}
                title={article.title}
                cover={article.image_cover}
                category={article.category.title}
              />
              {articles.length - 1 > i && (
                <Divider className={classes.infinityDivider} />
              )}
            </Fragment>
          </InView>
        ))}
      </div>
    </div>
  );
};

export default ArticleScrollShortList;
