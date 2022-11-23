import classes from './header.module.scss';
import LogoSvg from 'public/img/svg/logo.svg';
import LogoMobileSvg from 'public/img/svg/logoMobile.svg';
import BurgerSvg from 'public/img/svg/burger.svg';
import SearchSvg from 'public/img/svg/search.svg';
import CrossSvg from 'public/img/svg/cross.svg';
import Link from 'next/link';
import { useMenuContext } from 'store/menu.context';

const Header = () => {
  const { setIsOpenBurger, isOpenBurger } = useMenuContext();
  return (
    <header className={classes.Header}>
      <div className={classes.logo}>
        {isOpenBurger ? (
          <CrossSvg
            style={{ width: '28px' }}
            className={classes.mobileIcon}
            onClick={() => setIsOpenBurger(!isOpenBurger)}
          />
        ) : (
          <BurgerSvg
            className={classes.mobileIcon}
            onClick={() => setIsOpenBurger(!isOpenBurger)}
          />
        )}
        <Link href="/">
          <a>
            <LogoSvg className={classes.desktopIcon} />
            <LogoMobileSvg className={classes.mobileIcon} />
          </a>
        </Link>
        <Link href="/search/">
          <a>
            <SearchSvg className={classes.mobileIcon} />
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
