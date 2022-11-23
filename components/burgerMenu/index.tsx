import classes from './burgerMenu.module.scss';
import { useMenuContext } from 'store/menu.context';
import Typography from 'components/typography';
import Divider from 'components/divider';
import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { IArticle, ICategory } from 'models/articles';
import Link from 'next/link';

interface Props {
  categories?: ICategory[];
  editorsChoice?: IArticle[];
}

const BurgerMenu: FC<PropsWithChildren<Props>> = ({
  categories = [],
  editorsChoice = [],
}) => {
  const menuMap = [
    {
      label: 'Рубрики',
      data: categories.map(({ title, slug }) => ({
        title,
        href: `/category/${slug}/`,
      })),
    },
    {
      label: 'Популярные темы',
      data: editorsChoice.map(({ title, url }) => ({
        title,
        href: `/${url}`,
      })),
    },
    {
      label: 'Новости по регионам',
      data: [],
    },
  ];
  const burgerRef = useRef<HTMLDivElement>(null);
  const { isOpenBurger, setBurgerRef } = useMenuContext();

  useEffect(() => {
    if (burgerRef.current) setBurgerRef(burgerRef.current);
  }, [burgerRef.current]);

  return (
    <nav
      className={classNames(classes.BurgerMenu, {
        [classes.active]: isOpenBurger,
      })}
      ref={burgerRef}
    >
      <h2 style={{ display: 'none' }}>Основное меню сайта «Север-Пресс»</h2>
      {menuMap.map(({ label, data }) => (
        <>
          <Typography
            rootTag="h2"
            size="size__28"
            fontWeight="black"
            key={label}
          >
            {label}
          </Typography>
          <ul className={classes.list}>
            {data?.map(({ title, href }) => (
              <li>
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
          <Divider />
        </>
      ))}
    </nav>
  );
};

export default BurgerMenu;
