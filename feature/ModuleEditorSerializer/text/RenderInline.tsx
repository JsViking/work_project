/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import RenderMarks from './RenderMarks';
import classes from '../ModuleEditorSerializer.module.scss';

interface Props {
  text?: string;
  type?: string;
  data?: any;
  nodes?: any;
}

const RenderInline = ({ type, text, data, nodes }: Props) => {
  const { href } = data;
  const location = process.env.BASE_URL;
  let url = href;
  try {
    url = new URL(href);
  } catch (error) {
    console.log('Ошибка при парсинге ссылки в контенте новости', error);
  }

  switch (type) {
    case 'link':
      return (
        <a
          href={href}
          target={location === url.origin ? '_self' : '_blank'}
          rel={location === url.origin ? '' : 'noreferrer'}
          className={classes.link}
        >
          {nodes.map((node: any, index: number) => (
            <RenderMarks {...node} key={index} />
          ))}
        </a>
      );

    default:
      return text as unknown as JSX.Element;
  }
};

export default RenderInline;
