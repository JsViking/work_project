import Typography from 'components/typography';
import classes from './whiteBlock.module.scss';
import VkSvg from 'public/img/svg/vk.svg';
import TelegramSvg from 'public/img/svg/telegram.svg';
import okSvg from 'public/img/svg/ok.svg';
import Link from 'next/link';

const socialMap = {
  vk: VkSvg,
  ok: okSvg,
  tg: TelegramSvg,
};

const mock = {
  theme: 'Цифра',
  title: '3,3 млрд',
  description:
    'рублей потратит Россия на поддержку ДНР, ЛНР, Херсонской и Запорожской областей — первый замглавы администрации президента Сергей Кириенко',
  socials: [
    {
      type: 'vk',
      href: '/',
    },
    {
      type: 'tg',
      href: '/',
    },
    {
      type: 'ok',
      href: '/',
    },
  ],
};

const WhiteBlock = ({ item = mock }) => {
  return (
    <div className={classes.WhiteBlock}>
      <Typography textAlign="center" size="size__14" color="secondary">
        {item.theme}
      </Typography>
      <Typography textAlign="center" fontWeight="black" size="size__48">
        {item.title}
      </Typography>
      <Typography textAlign="center" size="size__18">
        {item.description}
      </Typography>
      <div className={classes.socialBlock}>
        {item.socials.map(({ type, href }, i) => {
          // @ts-ignore
          const Icon = socialMap[type];
          return (
            <Link href={href} key={i}>
              <a>
                <Icon />
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WhiteBlock;
