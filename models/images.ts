export interface IImageCover {
  description: string;
  file: string;
  id: number;
  img: IImage;
  is_cover: boolean;
  robots: IImageBase[][];
  title: string;
}

export interface IImageBase {
  height: number;
  src: string;
  width: number;
}

export interface IImage extends IImageBase {
  srcset: IImageBase[];
}
