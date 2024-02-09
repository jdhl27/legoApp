import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Counter from '../../components/counter';
import {useCart} from '../../context/cart/CartProvider';
import {useProduct} from '../../context/product/ProductProvider';

const ProductDetailsView = ({route}) => {
  const {product} = route.params;

  const {addToCart} = useCart();
  const {products, updateProductQuantity} = useProduct();

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
    axios
      .get(
        `https://1be9db56-c889-466d-9c12-cba178414901.mock.pstmn.io/detail/${product.id}`,
      )
      .then(response => {
        setProductDetails(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [product.id]);

  if (!productDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando detalles del producto...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: product.image}} style={styles.productImage} />
      <Text>{product.name}</Text>
      <Text>${product.unit_price}</Text>
      {stock > 0 ? (
        <>
          <Text>Stock: {stock}</Text>
          <Counter
            value={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              addToCart({...product, quantity});
              updateProductQuantity(product.id, stock - quantity);
              setQuantity(1);
            }}>
            <Text style={styles.addToCartButtonText}>Agregar al Carrito</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={{marginTop: 20, color: 'red'}}>No hay Stock</Text>
      )}

      <Text>{productDetails.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
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
});

export default ProductDetailsView;
