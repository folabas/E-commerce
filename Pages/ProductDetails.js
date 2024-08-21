import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useCart } from "../contexts/CartContext";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { useWishlist } from "../contexts/WishlistContext";


// Import local images
import shirt1 from "../images/shirt1.jpg";
import shirt2 from "../images/shirt2.jpg";
import shirt3 from "../images/shirt3.jpg";
import defaultImage from "../images/T-shirt.jpg";

const imagesArray = [shirt1, shirt2, shirt3, defaultImage];

const ProductDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { product } = route.params || {};
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(
    imagesArray[0] || defaultImage
  );
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || null
  );
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      Toast.show({
        type: "success",
        text1: "Added to Cart",
        text2: `${quantity} x ${product.name} has been added to your cart.`,
      });
    }
  };

  const isProductInWishlist = (productId) =>
    wishlist.some((item) => item.id === productId);

  const handleWishlistToggle = () => {
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

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found.</Text>
      </View>
    );
  }

  const price = product.price || "No price available";

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <TouchableOpacity
          style={styles.goBackIcon}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={handleWishlistToggle}
        >
          <Icon
            name={isProductInWishlist(product.id) ? "heart" : "heart-outline"}
            size={24}
            color={isProductInWishlist(product.id) ? "#ff6347" : "#000"}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={selectedImage}
            style={styles.productImage}
            resizeMode="cover"
          />
          <View style={styles.thumbnailOverlay}>
            <FlatList
              data={imagesArray}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.thumbnailContainer}
                  onPress={() => setSelectedImage(item)}
                >
                  <Image source={item} style={styles.thumbnailImage} />
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={styles.productDetails}>
          <View style={styles.row}>
            <Text style={styles.rating}>
              ★ {product.rating ? product.rating.toFixed(1) : "0.0"} (199){" "}
            </Text>
            <Icon name="share-social-outline" size={24} color="#000" />
          </View>
          <View style={styles.row}>
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>78% OFF</Text>
            </View>
            <Text style={styles.productPrice}>${price}</Text>
          </View>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productBrand}>
            Brand: <Text style={styles.inBrand}> {product.brand}</Text>
          </Text>
          <Text style={styles.productStock}>
            Stock: <Text style={styles.inStock}>{product.stock}</Text>
          </Text>
        </View>
        <View style={styles.colorContainer}>
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.colorCircles}>
            {(product.colors || []).map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorCircle,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedCircle,
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
        </View>
        <View style={styles.sizeContainer}>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeButtons}>
            {(product.sizes || []).map((size, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSizeButton,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={
                    selectedSize === size
                      ? styles.selectedSizeText
                      : styles.sizeText
                  }
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.productDescription}>
            {product.description || "No description available."}
          </Text>
        </View>
        <View style={styles.reviewsContainer}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Reviews(128)</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ReviewsPage")}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {(product.reviews || []).slice(0, 2).map((review, index) => (
            <View key={index} style={styles.reviewCard}>
              <Text style={styles.reviewAuthor}>{review.author}</Text>
              <Text style={styles.reviewText}>{review.text}</Text>
              <Text style={styles.reviewRating}>Rating: {review.rating}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decrementQuantity}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={incrementQuantity}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  fixedHeader: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "#F5F5F5",
    paddingTop: 30,
  },
  goBackIcon: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: "#f5f5f5",
  },
  heartIcon: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: "#f5f5f5",
  },
  imageContainer: {
    marginTop:-10,
    width: "100%",
    aspectRatio: 1,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  thumbnailOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnailContainer: {
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#f5f5f5",
  },
  thumbnailImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 80,
  },
  productDetails: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
  },
  discountTag: {
    backgroundColor: "#ff6347",
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
  },
  discountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productBrand: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inBrand: {
    fontWeight: "normal",
  },
  productStock: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inStock: {
    fontWeight: "normal",
  },
  colorContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  colorCircles: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedCircle: {
    borderWidth: 2,
    borderColor: "#ff6347",
  },
  sizeContainer: {
    marginBottom: 20,
  },
  sizeButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sizeButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginRight: 10,
    marginBottom: 10,
  },
  selectedSizeButton: {
    backgroundColor: "#ff6347",
  },
  sizeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedSizeText: {
    color: "#fff",
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  reviewsContainer: {
    marginBottom: 20,
  },
  viewAllText: {
    color: "#ff6347",
  },
  reviewCard: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 16,
    marginBottom: 5,
  },
  reviewRating: {
    fontSize: 14,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: "#ff6347",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6347",
  },
});

export default ProductDetails;
