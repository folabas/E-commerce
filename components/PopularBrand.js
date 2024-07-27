// PopularBrand.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const brands = [
  { name: 'Nike', image: require('../images/nike.png') },
  { name: 'Adidas', image: require('../images/adidas.png') },
  { name: 'Puma', image: require('../images/puma.png') },
  { name: 'Gucci', image: require('../images/gucci.png') },
  { name: 'Reebok', image: require('../images/reebok.jpeg') },
];

const PopularBrand = () => {
  const [selectedBrand, setSelectedBrand] = React.useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Brand</Text>
      <View style={styles.brandsContainer}>
        {brands.map((brand, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedBrand(brand.name)}
            style={[
              styles.brand,
              selectedBrand === brand.name && styles.selectedBrand,
            ]}
          >
            <Image source={brand.image} style={styles.logo} />
            <Text style={styles.brandName}>{brand.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  brandsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  brand: {
    alignItems: 'center',
    padding: 10,
  },
  selectedBrand: {
    backgroundColor: '#333',
    borderRadius: 50,
    padding: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  brandName: {
    marginTop: 10,
    fontSize: 14,
  },
});

export default PopularBrand;
