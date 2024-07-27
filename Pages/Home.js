import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../Footer'; // Ensure this path is correct
import { useNavigation } from '@react-navigation/core';

const brands = [
  { name: 'Nike', image: require('../images/nike.png') },
  { name: 'Adidas', image: require('../images/adidas.png') },
  { name: 'Puma', image: require('../images/puma.png') },
  { name: 'Gucci', image: require('../images/gucci.png') },
  { name: 'Reebok', image: require('../images/reebok.jpeg') },
  { name: 'Nike', image: require('../images/nike.png') },
  { name: 'Adidas', image: require('../images/adidas.png') },
  { name: 'Puma', image: require('../images/puma.png') },
  { name: 'Gucci', image: require('../images/gucci.png') },
  { name: 'Nike', image: require('../images/nike.png') },
  { name: 'Adidas', image: require('../images/adidas.png') },
  { name: 'Puma', image: require('../images/puma.png') },
  { name: 'Gucci', image: require('../images/gucci.png') },
];

const Home = () => {
  const [userName, setUserName] = useState('There'); // Default name
  const [selectedBrand, setSelectedBrand] = useState(null); // Initially no brand selected
  const navigation = useNavigation();
  const flatListRef = useRef(null);

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
      <View style={styles.content}>
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
      </View>
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
    fontSize: 20,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    marginRight: 15,
  },
  searchIcon: {
    marginRight: 8,
  },
  content: {
    flex: 1,
  },
  bannerContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    margin: 20,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: 'relative',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
    paddingTop: 0,
    marginTop: 20,
  },
  textButtonContainer: {
    flex: 1,
  },
  bannerText: {
    color: "#333",
    fontSize: 20,
    fontWeight: "900",
  },
  bannerButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '60%',
    marginTop: 10,
  },
  bannerButtonText: {
    color: "#fff",
    textAlign: 'center',
  },
  bannerImage: {
    width: '20%',
    height: '100%',
    resizeMode: 'cover',
  },
  popularBrandContainer: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  popularBrandTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  brandsContainer: {
    flexDirection: 'row', // Ensures items are in a row
    alignItems: 'center',
  },
  brandContainer: {
    alignItems: 'center',
    paddingLeft: -30,
  },
  logoContainer: {
    alignItems: 'center',
    padding: 10,
  },
  selectedLogo: {
    backgroundColor: '#333',
    borderRadius: 50,
    padding: 10,
  },
  logo: {
    width: 25,
    height: 25,
  },
  brandName: {
    marginTop: 10,
    fontSize: 14,
  },
});

export default Home;
