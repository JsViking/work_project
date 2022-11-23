import React from 'react';

const TwitterSharing = ({ source, showComments }) => {
  const urlToId = (url) => {
    const matcherId = /\d{10,}/;
    const result = matcherId.exec(url);
    if (result.length === 1) {
      return result[0];
    }
    return undefined;
  };

  return (
    <div
      data-twitter-source={urlToId(source)}
      data-twitter-extend={showComments}
      className="article-twitter-sharing"
    />
  );
};

export default TwitterSharing;
