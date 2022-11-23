import { AppProps } from 'next/app';
import { IAuthor, IResponse, ITag } from './common';
import { IImageBase, IImageCover } from './images';

export interface IArticle {
  id: number;
  title: string;
  editor_data_images: IImageBase;
  image_cover: IImageCover;
  video_cover: string;
  opening_video: IVideoCover;
  slug: string;
  type: 'news' | 'narrative';
  pub_date_at: string;
  pub_updated_at: string | null;
  is_exclusive: boolean;
  is_important: boolean;
  category: ICategory;
  url: string;
  meta_title?: string;
  meta_description?: string;
  yandex_title: string;
  editor_data: any;
  tags: ITag[];
  seo_title: string;
  authors: IAuthor[];
  lead?: string;
  dummy_cover: string;
  is_available_by_link: boolean;
  reactions: IReactions;
}

export interface IArticleResponce extends IResponse {
  results: IArticle[];
}

export interface ICategory {
  id: number;
  is_active: boolean;
  is_main: boolean;
  seo_description: string;
  seo_title: string;
  slug: string;
  title: string;
}

export interface IVideoCover {
  platform: string;
  id: string;
}

export type Reactionitem = {
  [key: string]: {
    code: string;
    value: number;
  };
};
export interface IReactions {
  items: Reactionitem;
  meta: {
    app_label: string;
    instance_id: number;
    model_name: string;
  };
}

export interface ArticleListPageProps extends AppProps {
  article: IArticleResponce;
  label: string;
  currentPage?: string | number;
  setCurrentPage?: any;
  queryParams: {
    page: string | number;
    per_page: number;
    type: string;
    search?: string;
  };
}
