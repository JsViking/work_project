/* eslint-disable react/no-array-index-key */
import React from 'react';
import RenderText from '../text';
import Typography from 'components/typography';

interface Props {
  nodes: any;
}

const List = ({ nodes }: Props) => {
  const render = nodes.map((node: any, index: number) => (
    <Typography rootTag="li" size="size__16" key={index}>
      <RenderText {...node} />
    </Typography>
  ));
  return render;
};

export default List;
