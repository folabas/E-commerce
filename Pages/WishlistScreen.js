import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useWishlist } from '../contexts/WishlistContext';
import Footer from '../Footer';
import Toast from 'react-native-toast-message';

const WishlistScreen = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
      position: 'bottom',
      visibilityTime: 4000,
      autoHide: true,
    });
  };

  const handleRemoveFromWishlist = (item) => {
    removeFromWishlist(item.id);
    showToast('success', 'Removed from Wishlist', `${item.name} has been removed from your wishlist.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your wishlist is empty.</Text>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productContent}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productBrand}>{item.brand}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
                <Text style={styles.productRating}>Rating: {item.rating}</Text>
                <Text style={styles.productStock}>Stock: {item.stock}</Text>
                <TouchableOpacity onPress={() => handleRemoveFromWishlist(item)} style={styles.heartButton}>
                  <Icon name="trash-outline" size={24} color="#ff6347" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={styles.wishlistContainer}
        />
      )}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
    backgroundColor: '#f8f8f8',
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#aaa',
  },
  wishlistContainer: {
    paddingBottom: 20,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  productImage: {
    width: 100,
    height: 140,
    borderRadius: 10,
    marginRight: 10,
  },
  productContent: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productBrand: {
    fontSize: 14,
    color: '#555',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  productRating: {
    fontSize: 14,
    color: '#888',
  },
  productStock: {
    fontSize: 14,
    color: '#888',
  },
  heartButton: {
    padding: 10,
  },
  productsContainer: {
    marginTop: 20,
  },
  productsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  productDetails: {
    flex: 1,
  },
});

export default WishlistScreen;
