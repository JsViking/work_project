import React from 'react';
import classes from './ArticlePreview.module.scss';
import Link from 'next/link';
import Typography from '../typography';
import Image from 'feature/image';
import Parser from 'html-react-parser';
import { IImageCover } from 'models/images';
import { ICategory } from 'models/articles';

export type ArticlePreviewProps = {
  title: string;
  cover: IImageCover;
  lead: string;
  link: string;
  category: string;
};

const ArticlePreview = ({
  title,
  cover,
  link,
  category,
  lead,
}: ArticlePreviewProps) => {
  return (
    <article className={classes.AuthorArticle}>
      <Link href={link} passHref>
        <a>
          <div className={classes.warapper}>
            {cover && (
              <div className={classes.wrapImage}>
                <Image
                  className={classes.image}
                  crops={cover.img}
                  layout="fill"
                  loading="eager"
                  src={cover?.img.src}
                  alt={cover?.description || title}
                  width={cover?.img.width}
                  height={cover?.img.height}
                  objectFit="cover"
                  quality={100}
                  sizes="(max-width: 1040px) calc(100vw - 32px), 512px"
                />
              </div>
            )}
            <Typography size="size__14" color="secondary">
              {category}
            </Typography>
            <Typography size="size__24" fontWeight="bold">
              {title}
            </Typography>
            {lead && (
              <Typography size="size__18" color="secondary">
                {Parser(lead)}
              </Typography>
            )}

            <Typography
              className={classes.moreButton}
              size="size__16"
              fontWeight="bold"
            >
              Подробнее {'>'}
            </Typography>
          </div>
        </a>
      </Link>
    </article>
  );
};

export default ArticlePreview;
