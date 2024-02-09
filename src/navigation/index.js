import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoadingComponent from '../components/loading';
import LoginView from '../views/login';
import RegisterView from '../views/register';
import HomeView from '../views/home';
import ProductDetailsView from '../views/productDetails';
import CartView from '../views/cart';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function NavigationRoot() {
  const [loading_, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(res => {
      if (res != null) {
        setUserId(res);
        setLoading(false);
      } else {
        setUserId(null);
        setLoading(false);
      }
    });
  }, []);

  return (
    <LoadingComponent loading={loading_}>
      <Stack.Navigator initialRouteName={userId ? 'Home' : 'Login'}>
        <Stack.Screen
          name="Login"
          component={LoginView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterView}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsView} />
        <Stack.Screen name="Cart" component={CartView} />
      </Stack.Navigator>
    </LoadingComponent>
  );
}

export default NavigationRoot;
