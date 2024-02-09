import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Counter from '../counter';

const ProductItem = ({
  onClickDetail,
  item,
  addToCart,
  updateProductQuantity,
}) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);

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
      style={styles.productItem}
      onPress={() => onClickDetail()}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <Text>{item.name}</Text>
      <Text>${item.unit_price}</Text>

      {item?.stock > 0 ? (
        <>
          <Counter
            value={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              addToCart({...item, quantity});
              updateProductQuantity(item.id, item.stock - quantity);
              setQuantity(1);
            }}>
            <Text style={styles.addToCartButtonText}>Agregar al Carrito</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={{marginTop: 20, color: 'red'}}>No hay Stock</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default ProductItem;
