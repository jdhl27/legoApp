import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';

import {useCart} from '../../context/cart/CartProvider';
import {useProduct} from '../../context/product/ProductProvider';
import {useUser} from '../../context/user/UserProvider';
import {makeRequest} from '../../api/api';
import HeaderComponent from '../../components/header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getCurrentTheme} from '../../../constants/themes';
import ButtonComponent from '../../components/button';
import LottieView from 'lottie-react-native';
import {styles} from './styles';

const CartView = ({navigation}) => {
  const {cart, removeFromCart} = useCart();
  const {addProducts, updateProductQuantity} = useProduct();
  const {credit, updateCredit, isDarkTheme} = useUser();
  const currentTheme = getCurrentTheme(isDarkTheme);

  const [isLoading, setIsLoading] = useState(false);

  const calculateSubtotal = item => {
    return item.unit_price * item.quantity;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const handleBuy = async () => {
    if (credit < calculateTotal()) {
      Alert.alert(
        'Poor Credit',
        'You do not have enough credit to make the purchase.',
      );
      return;
    }

    setIsLoading(true);

    const response = await makeRequest('POST', 'buy');
    if (response) {
      addProducts(response.products);

      updateCredit(credit - calculateTotal());

      cart.forEach(item => {
        removeFromCart(item);
      });
      setIsLoading(false);
      navigation.navigate('Home');
    }

    if (credit === 0) {
      Alert.alert('You ran out of funds', "Sorry, you can't buy without funds");
    } else {
      Alert.alert('Successful purchase', 'Thanks for your purchase!');
    }
  };
  const rightButtons = item => {
    return [
      <TouchableOpacity
        onPress={() => {
          updateProductQuantity(item.id, item.stock);
          removeFromCart(item);
        }}
        style={styles.containerSwipeIcocn}>
        <Icon name="trash" size={20} color="white" style={styles.iconDelete} />
      </TouchableOpacity>,
    ];
  };

  const navigateToBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container(currentTheme)}>
      <HeaderComponent onPressBack={navigateToBack} isCart={true} />
      <View style={styles.containerPadding}>
        <Text style={styles.title(currentTheme)}>Shopping cart</Text>
        {cart.length > 0 ? (
          <>
            <FlatList
              data={cart}
              style={{height: '60%'}}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <Swipeable rightButtons={rightButtons(item)}>
                  <View style={styles.productItemCart}>
                    <Image
                      source={{uri: item.image}}
                      style={styles.productImage}
                    />
                    <View style={styles.productInfo}>
                      <Text style={styles.name(currentTheme)}>{item.name}</Text>

                      <Text style={styles.price(currentTheme)}>
                        Amount: {item.quantity}
                      </Text>
                      <Text style={styles.price(currentTheme)}>
                        ${calculateSubtotal(item)}
                      </Text>
                    </View>
                  </View>
                </Swipeable>
              )}
            />

            <View style={styles.containerTotal}>
              <Text style={styles.total(currentTheme)}>
                Total: ${calculateTotal()}
              </Text>

              <ButtonComponent
                disabled={isLoading}
                style={styles.buttonLogin}
                text={isLoading ? 'Processing...' : 'Buy now'}
                onPress={handleBuy}
                currentTheme={currentTheme}
              />
            </View>
          </>
        ) : (
          <View style={styles.containerAnimation}>
            <LottieView
              source={require('../../../assets/animations/empty.json')}
              style={styles.emptyAnimation}
              autoPlay
              loop
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CartView;
