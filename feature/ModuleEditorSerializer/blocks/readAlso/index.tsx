import React, { useState, useEffect } from 'react';
import classes from './ReadAlso.module.scss';
import Divider from 'components/divider';
import Typography from 'components/typography';
import Link from 'next/link';
import { getArticle } from 'requests';
import { coverSelection } from 'libs/helper';
import { IArticle } from 'models/articles';

const Card = (props: IArticle) => {
  const { seo_title, title, category, slug, type, ...rest } = props;
  return (
    <div className={classes.contentWrapper}>
      <div className={classes.imageWraper}>
        <img
          decoding="async"
          loading="lazy"
          src={coverSelection(rest)}
          alt="alt"
        />
      </div>
      <div className={classes.rightBlock}>
        <Typography color="secondary" rootTag="p" size="size__14">
          {category.title}
        </Typography>
        <Typography
          className={classes.title}
          rootTag="p"
          size="size__24"
          fontWeight="bold"
        >
          {title}
        </Typography>
        <Link href={`/${type}/${category.slug}/${slug}`}>
          <a>
            <Typography rootTag="p" size="size__16" fontWeight="bold">
              Подробнее {'>'}
            </Typography>
          </a>
        </Link>
      </div>
    </div>
  );
};

interface ReadAlsoProps {
  url: string;
}

const ReadAlso = ({ url }: ReadAlsoProps) => {
  const [state, setState] = useState<IArticle>();

  const featcharticle = async () => {
    const splitUrl = url.split('/');
    const slug = splitUrl.pop();
    if (!slug) return;
    const article = await getArticle(slug);
    if (!article.id) return;
    setState(article);
  };

  useEffect(() => {
    featcharticle();
  }, []);

  return (
    <div className={classes.ReadAlso}>
      <Divider />
      {state ? <Card {...state} /> : <div className={classes.loading} />}
      <Divider />
    </div>
  );
};

export default ReadAlso;
