import React from 'react';

const InstagramSharing = ({ sharingContent }) => {
  if (!sharingContent) return <></>;

  const prepareSharingContent = sharingContent.replace(
    /<script\b[^>]*>([\s\S]*?)<\/script>/gm,
    ''
  );

  return (
    <div
      className="article-instagram-sharing social-embed"
      dangerouslySetInnerHTML={{ __html: prepareSharingContent }}
    />
  );
};

export default InstagramSharing;
