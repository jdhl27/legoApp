import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Counter from '../../components/counter';
import {useCart} from '../../context/cart/CartProvider';
import {useProduct} from '../../context/product/ProductProvider';
import {makeRequest} from '../../api/api';
import {useUser} from '../../context/user/UserProvider';
import {getCurrentTheme} from '../../../constants/themes';
import ButtonComponent from '../../components/button';
import {sharedStyles} from '../../../constants/sharedStyles';
import HeaderComponent from '../../components/header';
import LoadingComponent from '../../components/loading';

const ProductDetailsView = ({navigation, route}) => {
  const {product} = route.params;
  const {products, updateProductQuantity} = useProduct();
  const {addToCart} = useCart();
  const {isDarkTheme} = useUser();
  const currentTheme = getCurrentTheme(isDarkTheme);

  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const [productDetails, setProductDetails] = useState(null);

  const stock = products.find(element => element.id === product.id)?.stock;

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await makeRequest('GET', `detail/${product.id}`);
      setProductDetails(response);
      setIsLoading(false);
    };

    getData();
  }, [product.id]);

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };
  const navigateToBack = () => {
    navigation.goBack();
  };

  return (
    <LoadingComponent loading={isLoading}>
      <SafeAreaView style={styles.container(currentTheme)}>
        <HeaderComponent
          onPressCart={navigateToCart}
          onPressBack={navigateToBack}
        />
        <View style={styles.containerPadding}>
          <Image source={{uri: product.image}} style={styles.productImage} />
          <Text style={styles.name(currentTheme)}>{product.name}</Text>
          <Text style={styles.price(currentTheme)}>${product.unit_price}</Text>

          {stock > 0 ? (
            <>
              <Text style={styles.price(currentTheme)}>Stock: {stock}</Text>
              <Counter
                value={quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />

              <ButtonComponent
                style={styles.button}
                styleText={styles.textButton}
                text={'Add to cart'}
                onPress={() => {
                  addToCart({...product, quantity});
                  updateProductQuantity(product.id, stock - quantity);
                  setQuantity(1);
                }}
                currentTheme={currentTheme}
              />
            </>
          ) : (
            <Text style={styles.noStockText}>No hay Stock</Text>
          )}

          <Text style={styles.description(currentTheme)}>
            {productDetails?.description}
          </Text>
        </View>
      </SafeAreaView>
    </LoadingComponent>
  );
};

const styles = StyleSheet.create({
  container: currentTheme => ({
    flex: 1,
    padding: 16,
    backgroundColor: currentTheme.background,
  }),
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  name: currentTheme => ({
    ...sharedStyles.textBold(currentTheme),
    fontSize: 30,
  }),
  price: currentTheme => ({
    ...sharedStyles.textRegular(currentTheme),
    marginVertical: 10,
  }),
  description: currentTheme => ({
    ...sharedStyles.textMedium(currentTheme),
    marginVertical: 20,
  }),
  containerPadding: {
    paddingHorizontal: 18,
    marginTop: 20,
    alignItems: 'center',
  },
  noStockText: {
    marginTop: 20,
    color: 'red',
    fontSize: 16,
  },
  button: {
    paddingVertical: 7,
    width: '70%',
    marginTop: 10,
  },
});

export default ProductDetailsView;
