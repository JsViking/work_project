import React from 'react';
import Image, { ImageLoaderProps, ImageProps } from 'next/image';
import { IImage, IImageBase } from 'models/images';

export interface IMyImage extends ImageProps {
  crops: IImage;
}

export interface IMyLoader {
  srcset: IImageBase[];
}

const myLoader = (args: ImageLoaderProps, { srcset }: IMyLoader) => {
  const crop = srcset?.find((image) => image.width === args.width);
  return crop?.src || args?.src;
};

const MyImage = ({ crops, ...props }: IMyImage) => {
  if (!crops) return null;
  return (
    <Image
      loader={(args: ImageLoaderProps) => myLoader(args, crops)}
      {...props}
    />
  );
};

export default MyImage;
