import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Counter from '../counter';
import {useUser} from '../../context/user/UserProvider';
import {getCurrentTheme} from '../../../constants/themes';
import {sharedStyles} from '../../../constants/sharedStyles';
import ButtonComponent from '../button';

const ProductItem = ({
  onClickDetail,
  item,
  addToCart,
  updateProductQuantity,
}) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const {isDarkTheme} = useUser();
  const currentTheme = getCurrentTheme(isDarkTheme);

  const handleIncrease = () => {
    if (quantity < item.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <TouchableOpacity
      style={styles.productItem(currentTheme)}
      onPress={() => onClickDetail()}>
      <View style={styles.containerImageText}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <Text style={styles.name(currentTheme)}>{item.name}</Text>
      </View>
      <Text style={styles.price(currentTheme)}>${item.unit_price}</Text>

      {item?.stock > 0 ? (
        <>
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
              addToCart({...item, quantity});
              updateProductQuantity(item.id, item.stock - quantity);
              setQuantity(1);
            }}
            currentTheme={currentTheme}
          />
        </>
      ) : (
        <Text style={styles.noStock(currentTheme)}>No stock</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productItem: currentTheme => ({
    width: '46%',
    margin: 7,
    padding: 10,
    borderWidth: 1,
    borderColor: currentTheme?.background,
    backgroundColor: currentTheme?.background,
    borderRadius: 8,
    alignItems: 'center',
    ...currentTheme.shadow,
  }),
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'center',
    alignSelf: 'center',
    marginBottom: 8,
  },
  containerImageText: {
    height: 145,
  },
  name: currentTheme => ({
    ...sharedStyles.textBold(currentTheme),
  }),
  price: currentTheme => ({
    ...sharedStyles.textRegular(currentTheme),
    marginVertical: 10,
  }),
  button: {
    paddingVertical: 7,
    width: '70%',
    marginTop: 10,
  },
  textButton: {
    fontSize: 12,
  },
  noStock: currentTheme => ({
    ...sharedStyles.textRegular(currentTheme),
    marginVertical: 10,
    color: currentTheme?.error,
  }),
});

export default ProductItem;
