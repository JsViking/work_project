import React from 'react';
import classes from '../ModuleEditorSerializer.module.scss';

interface Props {
  text?: string;
  marks?: [];
}

const RenderMarks = ({ text, marks = [] }: Props) => {
  if (marks?.length > 0) {
    const classNames = marks?.reduce(
      (acc: string, { type }) => `${acc} ${classes[type]}`,
      ''
    );
    return <span className={classNames}>{text}</span>;
  }
  return text as unknown as JSX.Element;
};

export default RenderMarks;
