import Typography from 'components/typography';
import classes from './divider.module.scss';

interface Props {
  lable?: string;
  className?: string;
}

const Divider = ({ lable, className = '' }: Props) => {
  return (
    <div className={`${classes.Divider} ${className}`}>
      {lable && (
        <Typography rootTag="h2" size="size__28" fontWeight="black">
          {lable}
        </Typography>
      )}
    </div>
  );
};

export default Divider;
