import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigationRoot from './src/navigation';
import {CartProvider} from './src/context/cart/CartProvider';
import {ProductProvider} from './src/context/product/ProductProvider';
import {UserProvider} from './src/context/user/UserProvider';

const App = () => {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <NavigationContainer>
            <NavigationRoot />
          </NavigationContainer>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  );
};

export default App;
