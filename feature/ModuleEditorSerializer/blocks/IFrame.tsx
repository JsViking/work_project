import cn from 'classnames';
import React from 'react';

interface Props {
  src: string;
  allowfullscreen?: boolean;
  frameborder?: string;
  shareProvider?: string;
  showComments?: boolean;
  height?: number;
  width?: number;
}

const IFrame = ({
  src,
  allowfullscreen,
  frameborder,
  shareProvider,
  showComments,
  height = 315,
  width = 560,
  ...restProps
}: Props) => {
  const horizontal =
    parseInt(String(width), 10) > parseInt(String(height), 10) &&
    !src.match('facebook.com');

  const bodyClasses = cn({
    'frame-container_body': horizontal,
  });

  const youtubeWrapper = () => {
    const parseSrc = src.split('/');
    const id = parseSrc[parseSrc.length - 1];
    return (
      <iframe
        style={{ backgroundColor: 'black' }}
        src={src}
        srcDoc={`<style>html, body, a, img {display: block; width: 100%; height: 100%; margin: 0; padding: 0;} a:before, a:after {position: absolute; content: ''; left: 50%; top: 50%;} a:before {margin: -4.9% 0 0 -7%; background: rgba(166, 206, 57, 0.8); padding-top: 9.8%; width: 14%; border-radius: 16% / 27%;} a:after {margin: -1.9vw 0 0 -1vw; border: 2vw solid transparent; border-left: 3.8vw solid #fff;} a:hover:before {background: #AFCA0B}</style><a href='https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&enablejsapi=1'><img src='//img.youtube.com/vi/${id}/maxresdefault.jpg' srcset='//img.youtube.com/vi/${id}/mqdefault.jpg 320w, //img.youtube.com/vi/${id}/hqdefault.jpg 480w, //img.youtube.com/vi/${id}/maxresdefault.jpg 1307w'></a>`}
        allowFullScreen={allowfullscreen}
        title="iframe-responsive"
        frameBorder={frameborder}
        width="100%"
        height={height}
        {...restProps}
      />
    );
  };

  const defaultIframe = () => (
    <iframe
      src={src}
      title="iframe-responsive"
      allowFullScreen={allowfullscreen}
      frameBorder={frameborder}
      width="100%"
      height={height}
      {...restProps}
    />
  );

  return (
    <div className="box-video">
      <div className={bodyClasses}>
        {shareProvider === 'YOUTUBE' ? youtubeWrapper() : defaultIframe()}
      </div>
    </div>
  );
};

export default IFrame;
