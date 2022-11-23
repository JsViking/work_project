import React, { useEffect, useState } from 'react';
import classes from './Images.module.scss';
import cn from 'classnames';
import ImageComponent from 'feature/image';

interface Props {
  nodes?: any;
  data?: any;
  editor_data_images?: any;
}

const Image = ({ nodes, data, editor_data_images }: Props) => {
  const [pageTitle, setPageTitle] = useState('');
  const { imageDescription, block_aligment, id } = data;

  const img = editor_data_images[id]?.img;
  const descriptionText = nodes?.[0].text || '';
  const altText = imageDescription || descriptionText;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPageTitle(`${document?.title?.split(' | ')[0]} | Фото`);
    }
  }, []);

  return (
    <div
      className={cn(classes.newsImage, {
        [classes.newsImage__half]: Boolean(block_aligment),
        [classes.newsImage__left]: block_aligment === 'left',
        [classes.newsImage__right]: block_aligment === 'right',
      })}
      role="button"
      tabIndex={0}
    >
      <div className={classes.imgWrapper}>
        <ImageComponent
          crops={img}
          layout="fill"
          loading="lazy"
          src={img?.src}
          alt={altText || pageTitle}
          title={altText || pageTitle}
          objectFit="cover"
          quality={100}
          sizes="(max-width: 490px) calc(100vw - 40px),(max-width: 768px) calc(100vw - 60px),(max-width: 1024px) calc(100vw - 360px),(max-width: 1440px) calc(100vw - 720px),720px"
        />
      </div>
      {descriptionText && (
        <div className={classes.imageChild}>{descriptionText}</div>
      )}
    </div>
  );
};

export default Image;
