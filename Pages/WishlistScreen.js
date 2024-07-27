import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from '../Footer';

const WishlistScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Wishlist Screen</Text>
      <Footer />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WishlistScreen;
