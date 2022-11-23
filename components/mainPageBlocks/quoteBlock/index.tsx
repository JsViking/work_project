import Typography, { Size } from 'components/typography';
import classes from './quoteBlock.module.scss';
import QuoteSvg from 'public/img/svg/quote.svg';

interface Props {
  type?: 'big' | 'small';
  title?: string;
  lead?: string;
  author?: string;
  position?: string;
  avatar?: string;
}

const mapSize = {
  big: {
    title: 'size__28',
    lead: 'size__18',
    author: 'size__20',
    position: 'size__18',
  },
  small: {
    title: 'size__20',
    lead: 'size__16',
    author: 'size__14',
    position: 'size__14',
  },
};

const QuoteBlock = ({
  type = 'big',
  title,
  lead,
  author,
  position,
  avatar,
}: Props) => {
  return (
    <div className={`${classes.QuoteBlock} ${classes[type]}`}>
      <div className={classes.top}>
        {title && (
          <Typography
            fontWeight="black"
            size={mapSize[type].title as Size}
          >{`«${title}`}</Typography>
        )}
        {lead && (
          <Typography color="secondary" size={mapSize[type].lead as Size}>
            {`${lead}»`}
          </Typography>
        )}
      </div>
      <div className={classes.bottom}>
        <div className={classes.autor}>
          {author && (
            <Typography fontWeight="black" size={mapSize[type].author as Size}>
              {`${author}»`}
            </Typography>
          )}
          {position && (
            <Typography color="secondary" size={mapSize[type].position as Size}>
              {`${position}»`}
            </Typography>
          )}
        </div>
        {!avatar && <QuoteSvg />}
        {avatar && (
          <img
            className={`${classes.avatar} ${classes[type]}`}
            src={avatar}
            alt={author || ''}
          />
        )}
      </div>
    </div>
  );
};

export default QuoteBlock;
