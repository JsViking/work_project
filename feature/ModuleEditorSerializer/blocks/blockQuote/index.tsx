import React from 'react';
import RenderText from '../../text';
import Typography from 'components/typography';
import classes from './blockQuote.module.scss';
import Quote from 'public/img/svg/smallQuote.svg';

interface Props {
  nodes: any;
}

const BlockQuote = ({ nodes }: Props) => {
  const [owner, ownerInfo, ...paragraphs] = nodes;
  const render = (
    <div className={classes.BlockQuote}>
      <div className={classes.icon}>
        <Quote />
      </div>
      <div className={classes.blockQuoteText}>
        {paragraphs.map((text: any) => (
          <Typography
            textAlign="center"
            rootTag="p"
            size="size__20"
            fontWeight="bold"
            key={text}
          >
            <RenderText {...text} />
          </Typography>
        ))}
      </div>
      <div className={classes.blockQuoteOwner}>
        <Typography
          textAlign="center"
          rootTag="p"
          size="size__14"
          fontWeight="black"
        >
          <RenderText {...owner} />
        </Typography>
        <Typography
          textAlign="center"
          rootTag="p"
          size="size__14"
          color="secondary"
        >
          <RenderText {...ownerInfo} />
        </Typography>
      </div>
    </div>
  );
  return render;
};

export default BlockQuote;
