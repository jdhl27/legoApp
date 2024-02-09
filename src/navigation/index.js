import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoadingComponent from '../components/loading';
import LoginView from '../views/login';
import RegisterView from '../views/register';
import HomeView from '../views/home';
import ProductDetailsView from '../views/productDetails';
import CartView from '../views/cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../context/user/UserProvider';

const Stack = createNativeStackNavigator();

function NavigationRoot() {
  const {user, setUserData} = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user.id) {
      AsyncStorage.getItem('user')
        .then(userString => {
          if (userString) {
            const userLogin = JSON.parse(userString);
            setUserData({...userLogin});
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [setUserData, user]);

  return (
    <LoadingComponent loading={isLoading}>
      <Stack.Navigator initialRouteName={user?.id ? 'Home' : 'Login'}>
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
        <Stack.Screen
          name="Home"
          component={HomeView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={CartView}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </LoadingComponent>
  );
}

export default NavigationRoot;
