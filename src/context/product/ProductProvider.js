// ProductContext.js
import React, {createContext, useReducer, useContext} from 'react';
import productReducer from './ProductReducer';
import {ADD_PRODUCTS, UPDATE_PRODUCT_QUANTITY} from '../types';

const ProductContext = createContext();

const ProductProvider = ({children}) => {
  const initialProducts = [];
  const [products, dispatch] = useReducer(productReducer, initialProducts);

  const addProducts = newProducts => {
    dispatch({type: ADD_PRODUCTS, payload: newProducts});
  };

  const updateProductQuantity = (productId, newQuantity) => {
    dispatch({
      type: UPDATE_PRODUCT_QUANTITY,
      payload: {id: productId, quantity: newQuantity},
    });
  };

  return (
    <ProductContext.Provider
      value={{products, addProducts, updateProductQuantity}}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      'useProduct debe ser utilizado dentro de un ProductProvider',
    );
  }
  return context;
};

export {ProductProvider, useProduct};
