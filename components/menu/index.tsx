import classes from './menu.module.scss';
import BurgerSvg from 'public/img/svg/burger.svg';
import SearchSvg from 'public/img/svg/search.svg';
import CrossSvg from 'public/img/svg/cross.svg';
import Typography from 'components/typography';
import Link from 'next/link';
import { mock } from 'layouts/baseLayout';
import { useMenuContext } from 'store/menu.context';
import { useEffect } from 'react';

interface Items {
  items: typeof mock;
}

const Menu = ({ items }: Items) => {
  const { isOpenBurger, setIsOpenBurger } = useMenuContext();
  return (
    <div className={classes.Menu}>
      {isOpenBurger ? (
        <CrossSvg
          className={classes.icon}
          onClick={() => setIsOpenBurger(!isOpenBurger)}
        />
      ) : (
        <BurgerSvg
          className={classes.icon}
          onClick={() => setIsOpenBurger(!isOpenBurger)}
        />
      )}
      <nav>
        <h2 style={{ display: 'none' }}>Главные рубрики сайта «Север-Пресс»</h2>
        <ul className={classes.list}>
          {!isOpenBurger &&
            items.map(({ title, href }, i) => (
              <li key={i}>
                <Link href={href}>
                  <a>
                    <Typography size="size__18" fontWeight="bold">
                      {title}
                    </Typography>
                  </a>
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      <Link href={'/search/'}>
        <a>
          <SearchSvg className={classes.icon} />
        </a>
      </Link>
    </div>
  );
};

export default Menu;
