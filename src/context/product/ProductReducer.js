import {ADD_PRODUCTS, UPDATE_PRODUCT_QUANTITY} from '../types';

export default (state, action) => {
  const {type} = action;

  switch (type) {
    case ADD_PRODUCTS:
      return [...action.payload];

    case UPDATE_PRODUCT_QUANTITY:
      const {id, quantity} = action.payload;
      return state.map(item =>
        item.id === id ? {...item, stock: quantity} : item,
      );

    default:
      return state;
  }
};
