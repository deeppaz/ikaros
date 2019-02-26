import { FETCH_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from '../actionTypes';

export const fetchProducts = () => ({
  type: FETCH_PRODUCTS
});

export const fetchProductsSuccess = (products, Yiyecekler, Icecekler) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  products,
  Yiyecekler, 
  Icecekler
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  error
});