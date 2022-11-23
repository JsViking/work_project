import classes from './sharing.module.scss';
import SharingTool from 'libs/socialSharing';
import VkSvg from 'public/img/svg/vk.svg';
import OkSvg from 'public/img/svg/ok.svg';
import TelegramSvg from 'public/img/svg/telegram.svg';
import { useEffect, useState } from 'react';
import { IArticle } from 'models/articles';
import { coverSelection } from 'libs/helper';

interface Props extends IArticle {
  vertical?: boolean;
}

const Sharing = ({ lead, title, slug, url, vertical, ...rest }: Props) => {
  const [sh, setSH] = useState<SharingTool>();
  useEffect(() => {
    const fullUrl = `${window?.location.origin}/${url}`;
    const instance = new SharingTool({
      url: fullUrl,
      ptitle: title,
      pimg: coverSelection(rest),
      text: lead,
      slug,
    });
    setSH(instance);
  }, [url]);
  return (
    <div className={`${classes.Sharing} ${vertical ? classes.vertical : ''}`}>
      <a onClick={() => sh?.vkontakte()}>
        <VkSvg />
      </a>
      <a onClick={() => sh?.telegram()}>
        <TelegramSvg />
      </a>
      <a onClick={() => sh?.odnoklassniki()}>
        <OkSvg />
      </a>
    </div>
  );
};

export default Sharing;
