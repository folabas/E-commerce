import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, FlatList, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../Footer';
import { useNavigation } from '@react-navigation/core';
import { useWishlist } from '../contexts/WishlistContext';
import Toast from 'react-native-toast-message';

const brands = [
  { name: 'NFD', image: require('../images/nike.png') },
  { name: 'RAPTOR', image: require('../images/adidas.png') },
  { name: 'FBA', image: require('../images/puma.png') },
  { name: 'COMPLEX', image: require('../images/gucci.png') },
  { name: 'RAVE', image: require('../images/reebok.jpeg') },
  // Additional brands if needed...
];

const products = [
  { 
    id: 1, 
    name: 'Flannel Shirt', 
    brand: 'Adidas', 
    price: 34.96, 
    rating: 4.8, 
    stock: 5, 
    image: require('../images/nfd3.jpg'),
    colors: ['red', 'blue', 'green'], // Example colors
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'This flannel shirt is made from high-quality materials to provide comfort and style.',
    reviews: [
      {
        author: 'John Doe',
        text: 'Great shirt! Very comfortable and stylish.',
        rating: 5,
      },
      {
        author: 'Jane Smith',
        text: 'Good quality but a bit too large.',
        rating: 4,
      },
    ],
  },
  { 
    id: 2, 
    name: 'Henley Shirt', 
    brand: 'Reebok', 
    price: 34.96, 
    rating: 3.7, 
    stock: 5, 
    image: require('../images/henley.jpg'), 
    colors: ['red', 'blue', 'green'], // Example colors
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'This henley shirt is perfect for casual outings and provides a relaxed fit.',
    reviews: [
      {
        author: 'Alice Johnson',
        text: 'Nice shirt, but the color faded after washing.',
        rating: 3,
      },
      {
        author: 'Bob Brown',
        text: 'Perfect fit and very comfortable.',
        rating: 4,
      },
    ],
  },
  { 
    id: 3, 
    name: 'Flannel Shirt', 
    brand: 'Adidas', 
    price: 34.96, 
    rating: 4.8, 
    stock: 5, 
    image: require('../images/flannel.jpg'), 
    colors: ['red', 'blue', 'green'], // Example colors
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'This flannel shirt is made from high-quality materials to provide comfort and style.',
    reviews: [
      {
        author: 'John Doe',
        text: 'Great shirt! Very comfortable and stylish.',
        rating: 5,
      },
      {
        author: 'Jane Smith',
        text: 'Good quality but a bit too large.',
        rating: 4,
      },
    ],
  },
  { 
    id: 4, 
    name: 'Henley Shirt', 
    brand: 'Reebok', 
    price: 34.96, 
    rating: 3.7, 
    stock: 5, 
    image: require('../images/henley.jpg'), 
    colors: ['red', 'blue', 'green'], // Example colors
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'This henley shirt is perfect for casual outings and provides a relaxed fit.',
    reviews: [
      {
        author: 'Alice Johnson',
        text: 'Nice shirt, but the color faded after washing.',
        rating: 3,
      },
      {
        author: 'Bob Brown',
        text: 'Perfect fit and very comfortable.',
        rating: 4,
      },
    ],
  },
];


const Home = () => {
  const [userName, setUserName] = useState('There'); // Default name
  const [selectedBrand, setSelectedBrand] = useState(null); // Initially no brand selected
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        if (name) {
          setUserName(name);
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, []);

  const isProductInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const handleWishlistToggle = (product) => {
    if (isProductInWishlist(product.id)) {
      removeFromWishlist(product.id);
      Toast.show({
        type: 'success',
        text1: 'Removed from Wishlist',
        text2: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      Toast.show({
        type: 'success',
        text1: 'Added to Wishlist',
        text2: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const handleProductClick = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const { width } = Dimensions.get('window');
  const itemWidth = 100; // Width of each brand item

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerTopRow}>
          <TouchableOpacity>
            <Icon name="menu-outline" size={24} color="#000" style={styles.menuIcon} accessibilityLabel="Menu" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hi {userName}</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <Icon name="notifications-outline" size={24} color="#000" style={styles.notificationIcon} accessibilityLabel="Notifications" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <Icon name="search-outline" size={24} color="#000" style={styles.searchIcon} accessibilityLabel="Search" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.bannerContainer}>
          <View style={styles.bannerContent}>
            <View style={styles.textButtonContainer}>
              <Text style={styles.bannerText}>A look at the outfits of the month.</Text>
              <TouchableOpacity style={styles.bannerButton} accessibilityLabel="Buy Now">
                <Text style={styles.bannerButtonText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
            <Image source={require('../images/banner.jpg')} style={styles.bannerImage} />
          </View>
        </View>
        <View style={styles.popularBrandContainer}>
          <Text style={styles.popularBrandTitle}>Popular Brand</Text>
          <FlatList
            ref={flatListRef}
            data={brands}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.brandsContainer}
            showsHorizontalScrollIndicator={false}
            snapToInterval={itemWidth}
            decelerationRate="fast"
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.brandContainer,
                  { width: itemWidth },
                ]}
                onPress={() => setSelectedBrand(item.name)}
              >
                <View style={[
                  styles.logoContainer,
                  selectedBrand === item.name && styles.selectedLogo
                ]}>
                  <Image source={item.image} style={styles.logo} />
                </View>
                <Text style={styles.brandName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.mostPopularContainer}>
          <View style={styles.mostPopularHeader}>
            <Text style={styles.mostPopularTitle}>Most Popular</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Products')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {products.map((product) => (
            <TouchableOpacity key={product.id} onPress={() => handleProductClick(product)}>
              <View style={styles.card}>
                <Image source={product.image} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{product.name}</Text>
                    <TouchableOpacity onPress={() => handleWishlistToggle(product)}>
                      <Icon
                        name={isProductInWishlist(product.id) ? "heart" : "heart-outline"}
                        size={24}
                        color={isProductInWishlist(product.id) ? "#ff6347" : "#000"}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.cardBrand}>{product.brand}</Text>
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardPrice}>${product.price}</Text>
                    <View style={styles.ratingContainer}>
                      <Icon name="star" size={14} color="#FFA500" />
                      <Text style={styles.cardRating}>{product.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.cardStock}>{product.stock} in stock</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 80, // Adjusted to ensure content does not go under the footer
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 25,
    zIndex: 10,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    marginRight: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  bannerContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20
  },
  bannerContent: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  textButtonContainer: {
    flex: 1,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bannerButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 110
  },
  bannerButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  bannerImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  popularBrandContainer: {
    marginHorizontal: 20,
    marginBottom: 30
  },
  popularBrandTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  brandsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  brandContainer: {
    marginRight: 10,
    alignItems: "center",
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  selectedLogo: {
    borderColor: "#000",
    borderWidth: 2,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  brandName: {
    marginTop: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  mostPopularContainer: {
    marginHorizontal: 20,
  },
  mostPopularHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  mostPopularTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewAll: {
    fontSize: 16,
    color: "#0000ff",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cardImage: {
    width: 90,
    height: 110,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardBrand: {
    color: "#888",
    marginTop: 5,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardRating: {
    marginLeft: 5,
    fontSize: 14,
  },
  cardStock: {
    marginTop: 5,
    color: "#888",
  },
});

export default Home;
