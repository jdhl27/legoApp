import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {useUser} from '../../context/user/UserProvider';
import {getCurrentTheme} from '../../../constants/themes';
import DolarImage from '../../../assets/images/dollar.png';
import {sharedStyles} from '../../../constants/sharedStyles';
import {useCart} from '../../context/cart/CartProvider';

const HeaderComponent = ({onPressCart, onPressBack, onPressLogout, isCart}) => {
  const {credit, isDarkTheme} = useUser();
  const {cart} = useCart();
  const currentTheme = getCurrentTheme(isDarkTheme);

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {onPressBack ? (
          <TouchableOpacity onPress={() => onPressBack()}>
            <Icon name="left" size={25} color={currentTheme.reverseColor} />
          </TouchableOpacity>
        ) : null}

        {onPressLogout ? (
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => onPressLogout()}>
            <Icon
              name="banckward"
              size={20}
              color={currentTheme.reverseColor}
            />
          </TouchableOpacity>
        ) : null}

        <Image source={DolarImage} style={styles.image} resizeMode="contain" />
        <Text style={styles.title(currentTheme)}>{credit}</Text>
      </View>
      {!isCart ? (
        <TouchableOpacity onPress={() => onPressCart()}>
          <Icon
            name="shoppingcart"
            size={25}
            color={currentTheme.reverseColor}
          />
          {cart?.length > 0 ? (
            <View style={styles.containerTotalCart(currentTheme)}>
              <Text style={styles.totalCart(currentTheme)}>{cart?.length}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: 23,
    height: 23,
    marginRight: 5,
  },
  title: currentTheme => ({
    ...sharedStyles.textMedium(currentTheme),
  }),
  totalCart: currentTheme => ({
    ...sharedStyles.textMedium(currentTheme),
    fontSize: 11,
    color: currentTheme?.secondaryText,
  }),
  containerTotalCart: currentTheme => ({
    backgroundColor: currentTheme?.error,
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 100,
  }),
});

export default HeaderComponent;
