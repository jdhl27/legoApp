import React, {useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

import {useCart} from '../../context/cart/CartProvider';
import ProductItem from '../../components/productItem';
import {useProduct} from '../../context/product/ProductProvider';
import {useUser} from '../../context/user/UserProvider';
import LoadingComponent from '../../components/loading';
import {makeRequest} from '../../api/api';
import HeaderComponent from '../../components/header';
import {getCurrentTheme} from '../../../constants/themes';
import {styles} from './styles';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeView = ({navigation}) => {
  const {cart, addToCart, removeFromCart} = useCart();
  const {products, addProducts, updateProductQuantity} = useProduct();
  const {user, isDarkTheme, setUserData} = useUser();
  const currentTheme = getCurrentTheme(isDarkTheme);

  useEffect(() => {
    const getData = async () => {
      const response = await makeRequest('GET', 'all-products');
      addProducts(response.products);
    };

    if (products.length === 0) {
      getData();
    }
  }, [addProducts, products.length]);

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  const onPressLogout = async () => {
    await AsyncStorage.removeItem('user');
    setUserData({credit: 3000, isDarkTheme: false});
    cart.forEach(item => {
      removeFromCart(item);
    });
    addProducts([]);

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  };

  const renderProductItem = (item, i) => (
    <ProductItem
      key={i}
      onClickDetail={() =>
        navigation.navigate('ProductDetails', {product: item})
      }
      item={item}
      addToCart={addToCart}
      updateProductQuantity={updateProductQuantity}
    />
  );

  return (
    <LoadingComponent loading={false}>
      <SafeAreaView style={styles.container(currentTheme)}>
        <HeaderComponent
          onPressCart={navigateToCart}
          onPressLogout={onPressLogout}
        />
        <ScrollView style={styles.containerPadding}>
          <Text style={styles.title(currentTheme)}>Welcome, {user?.name}</Text>
          <View style={styles.containerProducts}>
            {products?.map((item, i) => renderProductItem(item, i))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LoadingComponent>
  );
};

export default HomeView;
