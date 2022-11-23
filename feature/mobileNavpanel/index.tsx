import classes from './mobileNavpanel.module.scss';
import HomeSvg from 'public/img/svg/home.svg';
import ListSvg from 'public/img/svg/list.svg';
import VkSvg from 'public/img/svg/vk.svg';
import TgSvg from 'public/img/svg/telegram.svg';
import OkSvg from 'public/img/svg/ok.svg';
// import ZenSvg from 'public/img/svg/zen.svg';
import SubscribeSvg from 'public/img/svg/subscribe.svg';
import Link from 'next/link';
import Button from 'components/button';
import Typography from 'components/typography';
import { useState } from 'react';
import cn from 'classnames';

const MobileNavpanel = () => {
  const [isopenSubscribe, setOpenSubscribe] = useState(false);
  const handleClose = () => {
    setOpenSubscribe(false);
  };
  return (
    <div className={classes.MobileNavpanel}>
      <Link href="/">
        <a>
          <HomeSvg />
        </a>
      </Link>
      <Link href="/news/">
        <a>
          <ListSvg />
        </a>
      </Link>
      <SubscribeSvg onClick={() => setOpenSubscribe(true)} />
      <div
        className={cn(classes.subscribeMenu, {
          [classes.active]: isopenSubscribe,
        })}
      >
        <div className={classes.social}>
          {/* <div className={classes.item}>
            <ZenSvg />
            <Typography size="size__16" fontWeight="bold">
              Дзен
            </Typography>
          </div> */}
          <Link href="/">
            <a>
              <div className={classes.item} onClick={handleClose}>
                <VkSvg />
                <Typography size="size__16" fontWeight="bold">
                  ВКонтакте
                </Typography>
              </div>
            </a>
          </Link>
          <Link href="/">
            <a>
              <div className={classes.item} onClick={handleClose}>
                <TgSvg />
                <Typography size="size__16" fontWeight="bold">
                  Telegram
                </Typography>
              </div>
            </a>
          </Link>
          <Link href="/">
            <a>
              <div className={classes.item} onClick={handleClose}>
                <OkSvg />
                <Typography size="size__16" fontWeight="bold">
                  Одноклассники
                </Typography>
              </div>
            </a>
          </Link>
        </div>
        <Button onClick={handleClose}>Закрыть</Button>
      </div>
    </div>
  );
};

export default MobileNavpanel;
