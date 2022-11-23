import { ReactNode } from 'react';
import classes from './chip.module.scss';

interface Props {
  children?: ReactNode;
  backGround?: 'blue' | 'grey';
  className?: string;
}

const Chip = ({ children, backGround = 'blue', className = '' }: Props) => {
  return (
    <div className={`${classes.Chip} ${classes[backGround]} ${className}`}>
      {children}
    </div>
  );
};

export default Chip;
