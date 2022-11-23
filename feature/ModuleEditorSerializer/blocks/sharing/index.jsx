import React from 'react';
import InstagramSharing from './InstagramSharing';
import TwitterSharing from './TwitterSharing';
import VkSharing from './VkSharing';
import TelegramSharing from './TelegramSharing';

const Sharing = ({ shareProvider, source, showComments, sharingContent }) => {
  switch (shareProvider) {
    case 'INSTAGRAM':
      return <InstagramSharing sharingContent={sharingContent} />;
    case 'TWITTER':
      return <TwitterSharing source={source} showComments={showComments} />;
    case 'VKONTAKTE':
      return <VkSharing source={source} />;
    case 'TELEGRAM':
      return <TelegramSharing source={source} />;

    default:
      return (
        <div
          data-content={source}
          data-provider={shareProvider}
          data-extend={showComments ? 'show' : 'hide'}
        />
      );
  }
};

export default Sharing;
