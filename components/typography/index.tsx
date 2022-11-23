import classes from './Typography.module.scss';

export type Size =
  | 'size__10'
  | 'size__12'
  | 'size__14'
  | 'size__13'
  | 'size__15'
  | 'size__16'
  | 'size__18'
  | 'size__20'
  | 'size__22'
  | 'size__24'
  | 'size__28'
  | 'size__32'
  | 'size__48';

export type TypographyColor = 'primary' | 'secondary' | 'white';

export type TypographyFontWeight = 'bold' | 'light' | 'normal' | 'black';

export interface ITypography {
  rootTag?: keyof JSX.IntrinsicElements;
  size?: Size;
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  color?: TypographyColor;
  fontWeight?: TypographyFontWeight;
  textAlign?: 'center' | 'right' | 'left';
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  dangerouslySetInnerHTML?: { __html: string };
  style?: React.CSSProperties;
}

const Typography: React.FC<ITypography> = ({
  rootTag: Root = 'p',
  size = 'size__16',
  transform = 'none',
  color = 'primary',
  textAlign = 'left',
  fontWeight = 'normal',
  className,
  children,
  ...rest
}): JSX.Element => {
  const createClasses = `${classes.text} ${className || ''} ${
    classes[size] || ''
  } ${classes[transform]} ${classes[color] || ''} ${
    classes[fontWeight] || ''
  } ${classes[textAlign] || ''}`;

  return (
    <Root {...rest} className={createClasses}>
      {children}
    </Root>
  );
};

export default Typography;
