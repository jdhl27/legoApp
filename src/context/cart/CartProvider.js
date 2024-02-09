import React, {useContext, useReducer} from 'react';

import CartReducer from './CartReducer';
import CartContext from './CartContext';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
} from '../types';

const CartProvider = ({children}) => {
  const [state, dispatch] = useReducer(CartReducer, {cart: []});

  const addToCart = product => {
    dispatch({type: ADD_TO_CART, payload: product});
  };

  const removeFromCart = product => {
    dispatch({type: REMOVE_FROM_CART, payload: product});
  };

  const updateCartItemQuantity = product => {
    dispatch({type: UPDATE_CART_ITEM_QUANTITY, payload: product});
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
      }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
};

export {CartProvider, useCart};
