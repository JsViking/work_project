import classes from './searcher.module.scss';
import Button from 'components/button';
import SearchSvg from 'public/img/svg/search.svg';
import Typography from 'components/typography';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  count?: number;
}

const Searcher = ({ value, onChange, onClick, count }: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick && onClick();
    }
  };

  return (
    <div className={classes.Searcher}>
      <div className={classes.panel}>
        <div className={classes.wrapper}>
          <SearchSvg className={classes.icon} />
          <input
            onKeyDown={handleKeyDown}
            onChange={onChange}
            value={value}
            placeholder="Поиск"
          />
        </div>
        <Button className={classes.button} onClick={onClick}>
          Найти
        </Button>
      </div>
      {count ? (
        <Typography
          size="size__14"
          color="secondary"
        >{`По запросу «${value}» найдено ${count} совпадений`}</Typography>
      ) : null}
    </div>
  );
};

export default Searcher;
