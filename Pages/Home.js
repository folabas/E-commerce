import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../Footer";
import { useNavigation } from "@react-navigation/core";
import { useWishlist } from "../contexts/WishlistContext";
import Toast from "react-native-toast-message";

const brands = [
  { name: "NFD", image: require("../images/nike.png") },
  { name: "RAPTOR", image: require("../images/adidas.png") },
  { name: "FBA", image: require("../images/puma.png") },
  { name: "COMPLEX", image: require("../images/gucci.png") },
  { name: "RAVE", image: require("../images/reebok.jpeg") },
];

const products = [
  {
    id: 1,
    name: "Flannel Shirt",
    brand: "Adidas",
    price: 34.96,
    rating: 4.8,
    stock: 5,
    image: require("../images/nfd3.jpg"),
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "This flannel shirt is made from high-quality materials to provide comfort and style.",
    reviews: [
      {
        author: "John Doe",
        text: "Great shirt! Very comfortable and stylish.",
        rating: 5,
      },
      {
        author: "Jane Smith",
        text: "Good quality but a bit too large.",
        rating: 4,
      },
    ],
  },
  {
    id: 2,
    name: "Henley Shirt",
    brand: "Reebok",
    price: 34.96,
    rating: 3.7,
    stock: 5,
    image: require("../images/henley.jpg"),
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "This henley shirt is perfect for casual outings and provides a relaxed fit.",
    reviews: [
      {
        author: "Alice Johnson",
        text: "Nice shirt, but the color faded after washing.",
        rating: 3,
      },
      {
        author: "Bob Brown",
        text: "Perfect fit and very comfortable.",
        rating: 4,
      },
    ],
  },
  {
    id: 3,
    name: "Flannel Shirt",
    brand: "Adidas",
    price: 34.96,
    rating: 4.8,
    stock: 5,
    image: require("../images/flannel.jpg"),
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "This flannel shirt is made from high-quality materials to provide comfort and style.",
    reviews: [
      {
        author: "John Doe",
        text: "Great shirt! Very comfortable and stylish.",
        rating: 5,
      },
      {
        author: "Jane Smith",
        text: "Good quality but a bit too large.",
        rating: 4,
      },
    ],
  },
  {
    id: 4,
    name: "Henley Shirt",
    brand: "Reebok",
    price: 34.96,
    rating: 3.7,
    stock: 5,
    image: require("../images/henley.jpg"),
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "This henley shirt is perfect for casual outings and provides a relaxed fit.",
    reviews: [
      {
        author: "Alice Johnson",
        text: "Nice shirt, but the color faded after washing.",
        rating: 3,
      },
      {
        author: "Bob Brown",
        text: "Perfect fit and very comfortable.",
        rating: 4,
      },
    ],
  },
];

const banners = [
  {
    image: require("../images/banner1.jpg"),
    title: "Exclusive Summer Collection",
    buttonLabel: "Shop Now",
  },
  {
    image: require("../images/banner2.jpg"),
    title: "Trending Footwear",
    buttonLabel: "Explore",
  },
  {
    image: require("../images/banner3.jpg"),
    title: "New Arrivals",
    buttonLabel: "Discover",
  },
];

const Home = () => {
  const [userName, setUserName] = useState("There");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerListRef = useRef(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        if (name) {
          setUserName(name);
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      bannerListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [currentIndex]);

  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const handleWishlistToggle = (product) => {
    if (isProductInWishlist(product.id)) {
      removeFromWishlist(product.id);
      Toast.show({
        type: "success",
        text1: "Removed from Wishlist",
        text2: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      Toast.show({
        type: "success",
        text1: "Added to Wishlist",
        text2: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const handleProductClick = (product) => {
    navigation.navigate("ProductDetails", { product });
  };

  const handleBrandClick = (brand) => {
    navigation.navigate("Products", { brand });
  };
  const handleViewAll = () => {
    navigation.navigate("Products", { brand: null });
  };

  const { width } = Dimensions.get("window");
  const itemWidth = 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerTopRow}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={require("../images/Logo.png")}
              style={styles.profileImage}
              accessibilityLabel="Profile"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hi, {userName}</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => navigation.navigate("NotificationScreen")}
            >
              <Icon
                name="notifications-outline"
                size={24}
                color="#000"
                style={styles.notificationIcon}
                accessibilityLabel="Notifications"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <Icon
                name="search-outline"
                size={24}
                color="#000"
                style={styles.searchIcon}
                accessibilityLabel="Search"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bannerContainer}>
          <FlatList
            ref={bannerListRef}
            data={banners}
            horizontal
            pagingEnabled
            snapToInterval={width + 20}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={[styles.bannerContent, { width }]}>
                <View style={styles.textButtonContainer}>
                  <Text style={styles.bannerText}>{item.title}</Text>
                  <TouchableOpacity
                    style={styles.bannerButton}
                    onPress={handleViewAll}
                  >
                    <Text style={styles.bannerButtonText}>
                      {item.buttonLabel}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Image source={item.image} style={styles.bannerImage} />
              </View>
            )}
          />
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
                style={[styles.brandContainer, { width: itemWidth }]}
                onPress={() => handleBrandClick(item.name)}
              >
                <View
                  style={[
                    styles.logoContainer,
                    selectedBrand === item.name && styles.selectedLogo,
                  ]}
                >
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
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={handleViewAll}
            >
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              onPress={() => handleProductClick(product)}
            >
              <View style={styles.card}>
                <Image source={product.image} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{product.name}</Text>
                    <TouchableOpacity
                      onPress={() => handleWishlistToggle(product)}
                    >
                      <Icon
                        name={
                          isProductInWishlist(product.id)
                            ? "heart"
                            : "heart-outline"
                        }
                        size={24}
                        color={
                          isProductInWishlist(product.id) ? "#ff6347" : "#000"
                        }
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
    paddingBottom: 80,
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 15,
    zIndex: 10,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  headerTitle: {
    marginLeft: -110,
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 55,
    marginBottom: -15,
    marginLeft: 5,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  notificationIcon: {
    marginRight: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  bannerContainer: {
    marginHorizontal: 20,
    marginTop: 13,
    marginBottom: 20,
    marginRight: -10,
    marginLeft: -10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  bannerContent: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    padding: 10,
    paddingLeft: 20,
    marginRight: 20,
    alignItems: "center",
    overflow: "hidden",
  },
  textButtonContainer: {
    flex: 1,
    maxWidth: "60%",
  },
  bannerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  bannerButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "flex-start",
  },
  bannerButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bannerImage: {
    width: 140,
    height: 140,
    borderRadius: 20,
    marginRight: 15,
  },
  popularBrandContainer: {
    marginBottom: 20,
  },
  popularBrandTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 10,
  },
  brandsContainer: {
    paddingHorizontal: 10,
  },
  brandContainer: {
    marginRight: 10,
  },
  logoContainer: {
    width: 75,
    height: 75,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  brandName: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
  },
  mostPopularContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  mostPopularHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  mostPopularTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAllButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#000",
    borderRadius: 5,
  },
  viewAll: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    padding: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardBrand: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    color: "#888",
  },
  cardStock: {
    marginTop: 5,
    fontSize: 12,
    color: "#888",
  },
});

export default Home;
