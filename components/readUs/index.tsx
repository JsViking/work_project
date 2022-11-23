import Chip from 'components/chip';
import Typography from 'components/typography';
import Link from 'next/link';
import classes from './readUs.module.scss';
import VkSvg from 'public/img/svg/vk.svg';
import TelegramSvg from 'public/img/svg/telegram.svg';

const ReadUs = () => {
  return (
    <footer className={classes.ReadUs}>
      <Typography
        className={classes.label}
        size="size__16"
        color="secondary"
        fontWeight="bold"
      >
        Читать Север Пресс в
      </Typography>
      <Link href="/">
        <a>
          <Chip className={classes.wrapper}>
            <TelegramSvg />
            <Typography size="size__16" fontWeight="bold">
              Telegram
            </Typography>
          </Chip>
        </a>
      </Link>
      <Link href="/">
        <a>
          <Chip className={classes.wrapper}>
            <VkSvg />
            <Typography size="size__16" fontWeight="bold">
              ВКонтакте
            </Typography>
          </Chip>
        </a>
      </Link>
    </footer>
  );
};

export default ReadUs;
