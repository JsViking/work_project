import Typography from 'components/typography';
import { ReactNode } from 'react';
import classes from './button.module.scss';

interface Props<T> {
  test: T;
  children: ReactNode;
  className?: string;
  onClick?: (e: T) => void;
}

const Button = ({ children, className = '', onClick }) => {
  return (
    <div className={`${classes.Button} ${className}`} onClick={onClick}>
      <Typography size="size__16" fontWeight="bold" textAlign="center">
        {children}
      </Typography>
    </div>
  );
};

export default Button;
