import classes from './baseLayout.module.scss';
import Header from 'components/header';
import Footer from 'components/footer';
import Menu from 'components/menu';
import BurgerMenu from 'components/burgerMenu';
import { WithMenuContext } from 'store/menu.context';
import MobileNavpanel from 'feature/mobileNavpanel';
import { IArticle, ICategory } from 'models/articles';

export const TITLE_BOILERPLATE = 'Север-Пресс';

export const mock = [
  {
    title: 'Новости',
    href: '/',
  },
  {
    title: 'Статьи',
    href: '/',
  },
  {
    title: 'Политика',
    href: '/',
  },
  {
    title: 'Новости',
    href: '/',
  },
  {
    title: 'Статьи',
    href: '/',
  },
  {
    title: 'Политика',
    href: '/',
  },
  {
    title: 'Новости',
    href: '/',
  },
  {
    title: 'Статьи',
    href: '/',
  },
  {
    title: 'Политика',
    href: '/',
  },
];

interface Props {
  children?: React.ReactNode;
  categories?: ICategory[];
  editorsChoice?: IArticle[];
}

const BaseLayout = ({ children, categories, editorsChoice }: Props) => {
  return (
    <WithMenuContext>
      <div className={classes.BaseLayout}>
        <Header />
        {categories?.length && (
          <Menu
            items={categories?.map(({ title, slug }) => ({
              title,
              href: `/category/${slug}/`,
            }))}
          />
        )}
        <div className={classes.body}>
          <BurgerMenu categories={categories} editorsChoice={editorsChoice} />
          {children}
        </div>
        <Footer />
        <MobileNavpanel />
      </div>
    </WithMenuContext>
  );
};

export default BaseLayout;
