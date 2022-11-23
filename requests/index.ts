import axios, { axiosV1 } from './axios';

export const getArticle = async (query?: string) => {
  try {
    const { data } = await axios(`/articles/${query || ''}`);
    return data;
  } catch (error) {
    console.log('ERROR: ', error);
    return {};
  }
};

export const getCategory = async (query?: string) => {
  try {
    const { data } = await axios(`/categories/${query || ''}`);
    return data;
  } catch (error) {
    console.log('ERROR: ', error);
    return {};
  }
};

export const getMainPageArticles = async (query = '', target = 'articles') => {
  try {
    const { data } = await axios(
      `/articles/main_page/${target}/${query || ''}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getNextArticle = async (slug: string, query = '') => {
  try {
    const { data } = await axios(`/articles/${slug}/before/${query}`);
    return data;
  } catch (error) {
    console.log('ERROR: ', error);
    return {};
  }
};

export const getSimilarArticle = async (slug: string, query = '') => {
  try {
    const { data } = await axios(`/articles/${slug}/similar/${query}`);
    return data;
  } catch (error) {
    console.log('ERROR: ', error);
    return {};
  }
};

export const increaseRaiting = async (payload: any) => {
  try {
    const { data } = await axios.post(`/reactions/`, payload);
    return data;
  } catch (error) {
    console.log('ERROR ', error);
  }
};

export const getAuthors = async (query = '') => {
  try {
    const { data } = await axiosV1(`/users/${query}`);
    return data;
  } catch (error) {
    console.log('ERROR: ', error);
    return {};
  }
};

export const getCachedTags = async (query = '') => {
  try {
    const { data } = await axios(`/tags/cached/${query}`);
    if (!data) return [];
    return data;
  } catch (error) {
    console.log('ERROR: ', error);
    return [];
  }
};

export const getCategoriesHeader = async () => {
  try {
    const { data } = await axios(`/categories/header`);
    return data;
  } catch (error) {
    console.log('ERROR: ', error);
    return {};
  }
};
