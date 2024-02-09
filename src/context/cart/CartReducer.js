import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
} from '../types';

export default (state, action) => {
  const {type} = action;

  switch (type) {
    case ADD_TO_CART:
      const existingProductIndex = state.cart.findIndex(
        item => item.id === action.payload.id,
      );

      if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        const updatedCart = state.cart.map((item, index) =>
          index === existingProductIndex
            ? {...item, quantity: item.quantity + action.payload.quantity}
            : item,
        );

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // Si el producto no está en el carrito, agrégalo
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };

    case UPDATE_CART_ITEM_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? {...item, quantity: action.payload.quantity}
            : item,
        ),
      };

    default:
      return state;
  }
};
