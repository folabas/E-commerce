// Cart.js

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useCart } from '../contexts/CartContext'; // Assuming you have a cart context

const Cart = () => {
  const { cart } = useCart(); // Get cart items from context

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.cartItemName}>{item.name}</Text>
            <Text style={styles.cartItemPrice}>{item.price}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cartItemName: {
    fontSize: 16,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Cart;
