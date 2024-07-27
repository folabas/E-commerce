import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Footer from '../Footer';

const Cart = () => {
    return (
      <View style={styles.container}>
        <Text>Cart Screen</Text>
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
  
  export default Cart;
  