import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import Toast from "react-native-toast-message";
import { useWishlist } from "../contexts/WishlistContext";
import Footer from "../Footer";
import products from "../data/products"; // Ensure you have a similar data file or adapt accordingly

const StoreScreen = () => {
  const navigation = useNavigation();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState("NFD");

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

  const renderTabContent = () => {
    switch (activeTab) {
      case "NFD":
        return (
          <>
            <View style={styles.productSection}>
              <TouchableOpacity onPress={() => handleBrandClick("T-SHIRTS")}>
                <View style={styles.brandContainer}>
                  <View style={styles.brandHeader}>
                    <Image
                      source={require("../images/nike.png")}
                      style={styles.logo}
                    />
                    <Text style={styles.brand}>T-SHIRTS</Text>
                  </View>
                  <View style={styles.productRow}>
                    <Image
                      source={require("../images/shirt1.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt2.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt3.jpg")}
                      style={styles.productImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.productSection}>
              <TouchableOpacity onPress={() => handleBrandClick("SHORTS")}>
                <View style={styles.brandContainer}>
                  <View style={styles.brandHeader}>
                    <Image
                      source={require("../images/adidas.png")}
                      style={styles.logo}
                    />
                    <Text style={styles.brand}>SHORTS</Text>
                  </View>
                  <View style={styles.productRow}>
                    <Image
                      source={require("../images/shirt1.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt2.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt3.jpg")}
                      style={styles.productImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.productSection}>
              <TouchableOpacity onPress={() => handleBrandClick("HOODIES")}>
                <View style={styles.brandContainer}>
                  <View style={styles.brandHeader}>
                    <Image
                      source={require("../images/adidas.png")}
                      style={styles.logo}
                    />
                    <Text style={styles.brand}>HOODIES</Text>
                  </View>
                  <View style={styles.productRow}>
                    <Image
                      source={require("../images/shirt1.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt2.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt3.jpg")}
                      style={styles.productImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </>
        );
      case "RAPTOR":
        return (
          <>
            <View style={styles.productSection}>
              <TouchableOpacity onPress={() => handleBrandClick("T-SHIRTS")}>
                <View style={styles.brandContainer}>
                  <View style={styles.brandHeader}>
                    <Image
                      source={require("../images/nike.png")}
                      style={styles.logo}
                    />
                    <Text style={styles.brand}>T-SHIRTS</Text>
                  </View>
                  <View style={styles.productRow}>
                    <Image
                      source={require("../images/shirt1.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt2.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt3.jpg")}
                      style={styles.productImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.productSection}>
              <TouchableOpacity onPress={() => handleBrandClick("SHORTS")}>
                <View style={styles.brandContainer}>
                  <View style={styles.brandHeader}>
                    <Image
                      source={require("../images/adidas.png")}
                      style={styles.logo}
                    />
                    <Text style={styles.brand}>SHORTS</Text>
                  </View>
                  <View style={styles.productRow}>
                    <Image
                      source={require("../images/shirt1.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt2.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt3.jpg")}
                      style={styles.productImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.productSection}>
              <TouchableOpacity onPress={() => handleBrandClick("HOODIES")}>
                <View style={styles.brandContainer}>
                  <View style={styles.brandHeader}>
                    <Image
                      source={require("../images/adidas.png")}
                      style={styles.logo}
                    />
                    <Text style={styles.brand}>HOODIES</Text>
                  </View>
                  <View style={styles.productRow}>
                    <Image
                      source={require("../images/shirt1.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt2.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt3.jpg")}
                      style={styles.productImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </>
        );
      case "FBA":
        return (
          <>
            <View style={styles.productSection}>
              <TouchableOpacity onPress={() => handleBrandClick("T-SHIRTS")}>
                <View style={styles.brandContainer}>
                  <View style={styles.brandHeader}>
                    <Image
                      source={require("../images/nike.png")}
                      style={styles.logo}
                    />
                    <Text style={styles.brand}>T-SHIRTS</Text>
                  </View>
                  <View style={styles.productRow}>
                    <Image
                      source={require("../images/shirt1.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt2.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt3.jpg")}
                      style={styles.productImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.productSection}>
              <TouchableOpacity onPress={() => handleBrandClick("SHORTS")}>
                <View style={styles.brandContainer}>
                  <View style={styles.brandHeader}>
                    <Image
                      source={require("../images/adidas.png")}
                      style={styles.logo}
                    />
                    <Text style={styles.brand}>SHORTS</Text>
                  </View>
                  <View style={styles.productRow}>
                    <Image
                      source={require("../images/shirt1.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt2.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt3.jpg")}
                      style={styles.productImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.productSection}>
              <TouchableOpacity onPress={() => handleBrandClick("HOODIES")}>
                <View style={styles.brandContainer}>
                  <View style={styles.brandHeader}>
                    <Image
                      source={require("../images/adidas.png")}
                      style={styles.logo}
                    />
                    <Text style={styles.brand}>HOODIES</Text>
                  </View>
                  <View style={styles.productRow}>
                    <Image
                      source={require("../images/shirt1.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt2.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt3.jpg")}
                      style={styles.productImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </>
        );
      case "COMPLEX":
        return (
          <>
            <View style={styles.productSection}>
              <TouchableOpacity onPress={() => handleBrandClick("T-SHIRTS")}>
                <View style={styles.brandContainer}>
                  <View style={styles.brandHeader}>
                    <Image
                      source={require("../images/nike.png")}
                      style={styles.logo}
                    />
                    <Text style={styles.brand}>T-SHIRTS</Text>
                  </View>
                  <View style={styles.productRow}>
                    <Image
                      source={require("../images/shirt1.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt2.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt3.jpg")}
                      style={styles.productImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.productSection}>
              <TouchableOpacity onPress={() => handleBrandClick("SHORTS")}>
                <View style={styles.brandContainer}>
                  <View style={styles.brandHeader}>
                    <Image
                      source={require("../images/adidas.png")}
                      style={styles.logo}
                    />
                    <Text style={styles.brand}>SHORTS</Text>
                  </View>
                  <View style={styles.productRow}>
                    <Image
                      source={require("../images/shirt1.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt2.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt3.jpg")}
                      style={styles.productImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.productSection}>
              <TouchableOpacity onPress={() => handleBrandClick("HOODIES")}>
                <View style={styles.brandContainer}>
                  <View style={styles.brandHeader}>
                    <Image
                      source={require("../images/adidas.png")}
                      style={styles.logo}
                    />
                    <Text style={styles.brand}>HOODIES</Text>
                  </View>
                  <View style={styles.productRow}>
                    <Image
                      source={require("../images/shirt1.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt2.jpg")}
                      style={styles.productImage}
                    />
                    <Image
                      source={require("../images/shirt3.jpg")}
                      style={styles.productImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Store</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab("NFD")}>
            <Text style={[styles.tab, activeTab === "NFD" && styles.activeTab]}>
              NFD
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab("RAPTOR")}>
            <Text
              style={[styles.tab, activeTab === "RAPTOR" && styles.activeTab]}
            >
              RAPTOR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab("FBA")}>
            <Text style={[styles.tab, activeTab === "FBA" && styles.activeTab]}>
              FBA
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab("COMPLEX")}>
            <Text
              style={[styles.tab, activeTab === "COMPLEX" && styles.activeTab]}
            >
              COMPLEX
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderTabContent()}
        <View style={styles.recommendedSection}>
          <Text style={styles.recommendedHeader}>You might like</Text>
          <View style={styles.productGrid}>
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
                    <Text style={styles.cardStock}>
                      {product.stock} in stock
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 1000,
    paddingTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    marginTop: 20,
  },
  tab: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#888",
  },
  activeTab: {
    color: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  scrollContainer: {
    paddingTop: 170, // Adjust according to header and tab height
  },
  productSection: {
    marginVertical: 10,
  },
  brandContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  brandHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  brand: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  recommendedSection: {
    margin: 20,
  },
  recommendedHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    width: "105%", // Two columns
  },
  cardImage: {
    width: "100%",
    height: 140, // Increased height
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    marginTop: 10,
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

export default StoreScreen;
