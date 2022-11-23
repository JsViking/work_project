import classes from './vote.module.scss';
import LikeSvg from 'public/img/svg/like.svg';
import DislikeSvg from 'public/img/svg/dislike.svg';
import Typography from 'components/typography';
import { IReactions } from 'models/articles';
import { useState } from 'react';
import { increaseRaiting } from 'requests';

interface Props {
  className?: string;
  vertical?: boolean;
  reactions: IReactions;
}

const Vote = ({ className, vertical, reactions }: Props) => {
  const [state, setState] = useState({
    items: reactions.items,
    voted: '',
  });

  const setReactions = (reaction: string) => {
    if (state.voted) return;
    const data = {
      ...reactions.meta,
      reaction,
    };

    const items = { ...state.items };
    items[reaction].value += 1;
    increaseRaiting(data);
    setState({
      items,
      voted: reaction,
    });
  };
  return (
    <div
      className={`${classes.Vote} ${
        vertical ? classes.vertical : ''
      } ${className}`}
    >
      <div className={`${classes.block} ${vertical ? classes.vertical : ''}`}>
        <div
          className={`${classes.item} ${classes.count} ${
            state.voted === 'thumbs_up' ? classes.active : ''
          }`}
        >
          <Typography size="size__14">
            {state?.items?.thumbs_up?.value || 0}
          </Typography>
        </div>
        <div
          className={`${classes.item} ${classes.button}`}
          onClick={() => setReactions('thumbs_up')}
        >
          <LikeSvg />
        </div>
      </div>
      <div className={`${classes.block} ${vertical ? classes.vertical : ''}`}>
        <div
          className={`${classes.item} ${classes.count} ${
            state.voted === 'thumbs_down' ? classes.active : ''
          }`}
        >
          <Typography size="size__14">
            {state?.items?.thumbs_down?.value || 0}
          </Typography>
        </div>
        <div
          className={`${classes.item} ${classes.button}`}
          onClick={() => setReactions('thumbs_down')}
        >
          <DislikeSvg />
        </div>
      </div>
    </div>
  );
};

export default Vote;
