import { ReactNode } from 'react';
import classes from './rightBannerLayout.module.scss';

interface Props {
  children?: ReactNode;
  className?: string;
}

const RightBannerLayout = ({ children, className }: Props) => {
  return (
    <div className={`${classes.RightBannerLayout} ${className}`}>
      <div className={classes.content}>{children}</div>
      <div className={classes.bannerPlace}></div>
    </div>
  );
};

export default RightBannerLayout;
