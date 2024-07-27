import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from '../Footer';

const StoreScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Store Screen</Text>
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

export default StoreScreen;
