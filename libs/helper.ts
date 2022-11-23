import { IVideoCover } from 'models/articles';
import { IImageCover } from 'models/images';

export function chunkArrayInGroups(arr: object[], chunks: number) {
  if (!arr) return [];
  const size = Math.ceil(arr.length / chunks);
  const myArray = [];
  for (let i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size));
  }
  return myArray;
}

export const coverSelection = ({
  dummy_cover,
  image_cover,
  opening_video,
  original = false,
  width = null,
}: {
  dummy_cover: string;
  image_cover: IImageCover;
  opening_video: IVideoCover;
  original?: boolean;
  width?: null | number;
}) => {
  if (image_cover && image_cover.img) {
    if (width)
      return image_cover.img?.srcset.find((image) => image.width === width)
        ?.src;
    return original ? image_cover.file : image_cover.img.src;
  }
  if (
    opening_video &&
    opening_video.platform &&
    opening_video.platform === 'youtube'
  )
    return `//img.youtube.com/vi/${opening_video.id}/mqdefault.jpg`;
  return dummy_cover;
};

export const objectToStringParams = <T>(object: { [key: string]: T }) => {
  if (typeof object !== 'object') return '';
  return Object.entries(object).reduce(
    (acc, [key, value]) => `${acc}&${key}=${value}`,
    ''
  );
};
