// ProductDetails.js

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const ProductDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;

  const handleAddToCart = () => {
    // Add product to cart logic here (e.g., using a context or Redux)
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productBrand}>{product.brand}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Text style={styles.productStock}>{product.stock} in stock</Text>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productBrand: {
    fontSize: 18,
    color: '#666',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productStock: {
    fontSize: 16,
    color: '#888',
    marginVertical: 10,
  },
  addToCartButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 5,
    marginTop: 20,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ProductDetails;
