import Typography from 'components/typography';
import Link from 'next/link';
import classes from './footer.module.scss';
import LogoSvg from 'public/img/svg/headings.svg';
import VkSvg from 'public/img/svg/vk.svg';
import TelegramSvg from 'public/img/svg/telegram.svg';
import okSvg from 'public/img/svg/ok.svg';

const mock = [
  {
    title: 'Новости',
    href: '/',
  },
  {
    title: 'Статьи',
    href: '/',
  },
  {
    title: 'Янао',
    href: '/',
  },
  {
    title: 'Политика',
    href: '/',
  },
  {
    title: 'Общество',
    href: '/',
  },
  {
    title: 'Блоги',
    href: '/',
  },
];

const social = [
  {
    Icon: VkSvg,
    href: '/',
  },
  {
    Icon: TelegramSvg,
    href: '/',
  },
  {
    Icon: okSvg,
    href: '/',
  },
];

const Block = ({ title, items }: { title: string; items: typeof mock }) => (
  <nav className={classes.Block}>
    <Typography
      rootTag="h2"
      size="size__18"
      color="secondary"
      fontWeight="bold"
    >
      {title}
    </Typography>
    <ul className={classes.linkList}>
      {items.map((item) => (
        <li key={item.title}>
          <Link href={item.href}>
            <a>
              <Typography size="size__18" color="white" fontWeight="bold">
                {item.title}
              </Typography>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <div>
        <nav className={classes.footerBlock}>
          <Block title="Рубрики" items={mock} />
          <Block title="Темы" items={mock} />
          <Block title="Новости по регионам" items={mock} />
          <Block title="Наши проекты" items={mock} />
        </nav>
        <div className={classes.socialBlock}>
          <LogoSvg />
          <div className={classes.cosialLinks}>
            {social.map(({ href, Icon }, i) => (
              <Link href={href} key={i}>
                <a>
                  <Icon />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <small className={`${classes.footerBlock} ${classes.info}`}>
        <div className={classes.infoBlock}>
          <Typography size="size__14" color="secondary">
            © 2022 ИА Север-Пресс — Новости Ямала.
          </Typography>
          <Typography size="size__14" color="secondary">
            ИА «Север-Пресс» зарегистрировано в Федеральной службе по надзору в
            сфере связи, информационных технологий и массовых коммуникаций
            (Роскомнадзор) 09 июля 2013 года
          </Typography>
          <Typography size="size__14" color="secondary">
            Свидетельство о регистрации ИА № ФС77-54686
          </Typography>
        </div>
        <div className={classes.infoBlock}>
          <Typography size="size__14" color="secondary">
            Главный редактор — Мохнова Т. В.
          </Typography>
          <Typography size="size__14" color="secondary">
            Учредитель: Департамент внутренней политики Ямало-Ненецкого
            автономного округа
          </Typography>
        </div>
        <div className={classes.infoBlock}>
          <Typography size="size__14" color="secondary">
            629008, ЯНАО, Салехард, мкр. Богдана Кнунянца, д.1
          </Typography>
          <Typography size="size__14" color="secondary">
            Тел.: 8 (34922) 71262
          </Typography>
          <Typography size="size__14" color="secondary">
            sever-press@yamal-media.ru
          </Typography>
        </div>
      </small>
    </footer>
  );
};

export default Footer;
