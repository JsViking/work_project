import type { ParsedUrlQuery } from 'querystring';

export interface ITag {
  created_at: string;
  id: number;
  is_active: boolean;
  is_regional: boolean;
  seo_description: string;
  seo_title: string;
  slug: string;
  title: string;
}

export interface IAuthor {
  avatar: string | null;
  email: string;
  first_name: string;
  id: number;
  is_active: boolean;
  is_staff: boolean;
  last_name: string;
  post: string;
}

export interface IResponse {
  count: number;
  next: string;
  previous: string;
}

export interface IGetStaticParams extends ParsedUrlQuery {
  slug: string;
}

export interface IGetStaticQuery extends ParsedUrlQuery {
  page?: string;
  search?: string;
}

export type Device = 'mobile' | 'tablet' | 'desktop';
