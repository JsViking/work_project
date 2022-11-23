import Typography from 'components/typography';
import classes from './ArticleCover.module.scss';
import Image from 'feature/image';
import { IImageCover } from 'models/images';

interface Props {
  video_cover?: string;
  cover?: IImageCover;
  className?: string;
}

const ArticleCover = ({ video_cover, cover, className }: Props) => {
  if (video_cover) {
    const src = `https://www.youtube.com/embed/${video_cover}`;
    let img = ` <img
    alt=""
    src='https://img.youtube.com/vi/${video_cover}/maxresdefault.jpg'
    onLoad="if (this.naturalWidth < 1280) { this.src = this.src.replace('maxres', 'sd') }"
    />`;
    if (cover) img = `<img src='${cover.file}' />`;
    return (
      <div className={classes.articleScrollItemCoverWrap}>
        <div className={classes.articleScrollItemWrapIframe}>
          <iframe
            style={{ backgroundColor: 'black' }}
            src={src}
            srcDoc={`<style>html, body, a, img {display: block; width: 100%; height: 100%; margin: 0; padding: 0;} a:before, a:after {position: absolute; content: ''; left: 50%; top: 50%;} a:before {margin: -4.9% 0 0 -7%; background: rgba(166, 206, 57, 0.8); padding-top: 9.8%; width: 14%; border-radius: 16% / 27%;} a:after {margin: -1.9vw 0 0 -1vw; border: 2vw solid transparent; border-left: 3.8vw solid #fff;} a:hover:before {background: rgb(166, 206, 57)}</style><a href='https://www.youtube-nocookie.com/embed/${video_cover}?autoplay=1&mute=1&enablejsapi=1'>${img}</a>`}
            allowFullScreen
            title="iframe-responsive"
            width="100%"
            height="100%"
          />
        </div>
        <div className={classes.articleScrollItemImageSignature} />
      </div>
    );
  }

  if (cover) {
    return (
      <div
        className={`${classes.ArticleCover} ${className}`}
        aria-hidden="true"
      >
        <div className={classes.wrapImage}>
          <Image
            crops={cover.img}
            layout="fill"
            loading="eager"
            src={cover?.img?.src}
            alt={cover?.description || ''}
            width={cover?.img?.width}
            height={cover?.img?.height}
            objectFit="cover"
            quality={100}
            sizes="(max-width: 490px) 100vw, (max-width: 1000px) calc(100vw - 32px), 766px"
          />
        </div>
        <div className={classes.descriptions}>
          {cover?.description && (
            <Typography
              rootTag="span"
              size="size__12"
              color="secondary"
              fontWeight="light"
            >
              {cover.description}
            </Typography>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default ArticleCover;
