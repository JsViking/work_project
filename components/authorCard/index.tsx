import Typography from 'components/typography';
import classes from './authorCard.module.scss';

interface Props {
  avatar?: string;
  fio?: string;
  position?: string;
  email?: string;
  className?: string;
}

const AuthorCard = ({
  avatar,
  fio,
  position,
  email,
  className = '',
}: Props) => {
  return (
    <div className={`${classes.AuthorCard} ${className}`}>
      <div className={classes.avatar}>
        <img src={avatar || '/img/png/avatar.png'} />
      </div>
      <div className={classes.info}>
        <Typography
          className={classes.title}
          size="size__24"
          fontWeight="black"
        >
          {fio}
        </Typography>
        <Typography size="size__16">{position}</Typography>
        <Typography size="size__16" color="secondary">
          {email}
        </Typography>
      </div>
    </div>
  );
};

export default AuthorCard;
