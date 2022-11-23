/* eslint-disable react/no-array-index-key */
import React from 'react';
import RenderMarks from './RenderMarks';
import RenderInline from './RenderInline';

interface Props {
  nodes: any;
}

const Paragraph = ({ nodes }: Props) => {
  const paragraphRender = nodes.map((node: any, index: number) => {
    if (node.object === 'text') {
      return <RenderMarks {...node} key={index} />;
    }
    if (node.object === 'inline') {
      return <RenderInline {...node} key={index} />;
    }
    return node.text;
  });

  return paragraphRender;
};

export default Paragraph;
