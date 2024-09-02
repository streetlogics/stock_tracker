import crudProvider from 'ra-data-nestjsx-crud/lib';
import CustomFetch from './CustomFetch';

export const IS_DEV = process.env.NODE_ENV === 'development';
export const API_ROOT = IS_DEV
  ? process.env.REACT_APP_IS_TEST
    ? 'http://localhost:4002'
    : 'http://localhost:4001'
  : '/api';
export const ADMIN_API_ROOT = `${API_ROOT}`;

export const dataProvider = crudProvider(ADMIN_API_ROOT, CustomFetch);
export const regularDataProvider = crudProvider(API_ROOT);

export const CustomDataProvider = {
  ...dataProvider,
};
