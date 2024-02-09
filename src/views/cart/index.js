import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import {useCart} from '../../context/cart/CartProvider';
import {useProduct} from '../../context/product/ProductProvider';
import {useUser} from '../../context/user/UserProvider';
import axios from 'axios';

const CartView = () => {
  const {cart, removeFromCart} = useCart();
  const {addProducts, updateProductQuantity} = useProduct();
  const {credit, updateCredit} = useUser();

  const [isProcessing, setIsProcessing] = useState(false);

  const calculateSubtotal = item => {
    return item.unit_price * item.quantity;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const handleBuy = async () => {
    if (credit < calculateTotal()) {
      Alert.alert(
        'Crédito Insuficiente',
        'No tienes suficiente crédito para realizar la compra.',
      );
      return;
    }

    setIsProcessing(true);

    axios
      .post('https://1be9db56-c889-466d-9c12-cba178414901.mock.pstmn.io/buy')
      .then(response => {
        addProducts(response.data.products);
      })
      .catch(err => {
        console.error('Error al realizar la compra:', err);
      });

    updateCredit(credit - calculateTotal());

    cart.forEach(item => {
      removeFromCart(item);
    });
    setIsProcessing(false);

    Alert.alert('Compra Exitosa', '¡Gracias por tu compra!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de compras</Text>

      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.productItemCart}>
            <Image source={{uri: item.image}} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text>{item.name}</Text>
              <Text>${item.unit_price}</Text>
              <Text>Cantidad: {item.quantity}</Text>
              <Text>Subtotal: ${calculateSubtotal(item)}</Text>
            </View>
            <Button
              title="Eliminar"
              onPress={() => {
                updateProductQuantity(item.id, item.stock);
                removeFromCart(item);
              }}
            />
          </View>
        )}
      />

      <Text style={styles.total}>Total: ${calculateTotal()}</Text>

      <Button
        title={isProcessing ? 'Procesando...' : 'Comprar'}
        onPress={handleBuy}
        disabled={isProcessing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productItemCart: {
    flex: 1,
    flexDirection: 'row',
    margin: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
});

export default CartView;
