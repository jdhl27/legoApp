import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';
import {useCart} from '../../context/cart/CartProvider';
import ProductItem from '../../components/productItem';
import {useProduct} from '../../context/product/ProductProvider';
import {useUser} from '../../context/user/UserProvider';

const HomeView = ({navigation}) => {
  const {addToCart} = useCart();
  const {products, addProducts, updateProductQuantity} = useProduct();
  const {credit} = useUser();

  useEffect(() => {
    // Solo cargar los productos si la lista está vacía
    if (products.length === 0) {
      axios
        .get(
          'https://1be9db56-c889-466d-9c12-cba178414901.mock.pstmn.io/all-products',
        )
        .then(response => {
          addProducts(response.data.products);
        })
        .catch(error => console.error('Error fetching products:', error));
    }
  }, [addProducts, products]);

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  const renderProductItem = ({item}) => (
    <ProductItem
      onClickDetail={() =>
        navigation.navigate('ProductDetails', {product: item})
      }
      item={item}
      addToCart={addToCart}
      updateProductQuantity={updateProductQuantity}
    />
  );

  if (!products) {
    return (
      <View style={{flex: 1}}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>${credit}</Text>
      <TouchableOpacity style={styles.cartButton} onPress={navigateToCart}>
        <Text style={styles.cartButtonText}>Carrito</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProductItem}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productItem: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  addToCartButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: 'green',
    borderRadius: 4,
  },
  addToCartButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  cartButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 4,
    marginBottom: 16,
    alignSelf: 'flex-end',
  },
  cartButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default HomeView;
