import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useCart } from '../contexts/CartContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart } = useCart();
  const navigation = useNavigation();

  const handleRemoveFromCart = (id, name) => {
    removeFromCart(id);
    Toast.show({
      type: 'success',
      text1: 'Removed from Cart',
      text2: `${name} has been removed from your cart.`,
    });
  };

  const renderCartItem = ({ item }) => {
    const price = parseFloat(item.price) || 0;

    return (
      <View style={styles.cartItem}>
        <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.cartItemImage} />
        <View style={styles.cartItemDetails}>
          <Text style={styles.cartItemName}>{item.name} x{item.quantity}</Text>
          <Text style={styles.cartItemPrice}>{`$${price.toFixed(2)}`}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => decrementQuantity(item.id)} style={styles.quantityButton}>
              <Icon name="remove-circle-outline" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => incrementQuantity(item.id)} style={styles.quantityButton}>
              <Icon name="add-circle-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => handleRemoveFromCart(item.id, item.name)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const calculateTotal = () => {
    let total = 0;
    for (let item of cart) {
      const price = parseFloat(item.price) || 0;
      total += price * item.quantity;
    }
    return total.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <TouchableOpacity style={styles.goBackIcon} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cart</Text>
      </View>
      {cart.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Products')} style={styles.viewProductsButton}>
            <Text style={styles.viewProductsButtonText}>View Available Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCartItem}
            contentContainerStyle={styles.cartList}
          />
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Checkout (${calculateTotal()})</Text>
          </TouchableOpacity>
        </>
      )}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 35,
  },
  fixedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  goBackIcon: {
    position: 'absolute',
    left: 15,
    padding: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartList: {
    padding: 15,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cartItemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 5,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    marginTop: 10,
  },
  removeButtonText: {
    color: '#ff6347',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  viewProductsButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
  },
  viewProductsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;
