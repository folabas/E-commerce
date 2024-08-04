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
import placeholderImage from "../images/T-shirt.jpg";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { useWishlist } from "../contexts/WishlistContext";

const ProductDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { product } = route.params || {};
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] || product?.image || placeholderImage
  );
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
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

  const isProductInWishlist = (productId) => wishlist.some((item) => item.id === productId);

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
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

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
        <TouchableOpacity style={styles.goBackIcon} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.heartIcon} onPress={handleWishlistToggle}>
          <Icon
            name={isProductInWishlist(product.id) ? "heart" : "heart-outline"}
            size={24}
            color={isProductInWishlist(product.id) ? "#ff6347" : "#000"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        {renderImage(selectedImage)}
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <FlatList
          data={product.images || []}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.thumbnailContainer}
              onPress={() => setSelectedImage(item)}
            >
              {renderImage(item)}
            </TouchableOpacity>
          )}
          style={styles.thumbnailList}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.productDetails}>
          <View style={styles.row}>
            <Text style={styles.rating}>
              ★ {product.rating.toFixed(1)} (199)
            </Text>
            <Icon name="share-social-outline" size={24} color="#000" />
          </View>
          <View style={styles.row}>
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>78% OFF</Text>
            </View>
            <Text style={styles.productPrice}>{price}</Text>
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
                <Text>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
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

const renderImage = (uri) => {
  const imageUri =
    typeof uri === "string" && uri.trim() !== "" ? uri : placeholderImage;

  return (
    <Image
      source={typeof uri === "string" ? { uri: imageUri } : imageUri}
      style={styles.productImage}
      resizeMode="cover"
      onError={(error) =>
        console.error(`Image failed to load from ${imageUri}:`, error)
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  fixedHeader: {
    position: "absolute",
    top: 40,
    width: "100%",
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  goBackIcon: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  heartIcon: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    paddingBottom: 100,
  },
  thumbnailList: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  thumbnailContainer: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  productDetails: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: "#ffa500",
  },
  discountTag: {
    backgroundColor: "#ff6347",
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  discountText: {
    color: "#fff",
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff6347",
  },
  productName: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  productBrand: {
    fontSize: 16,
    color: "#666",
  },
  productStock: {
    fontSize: 16,
    color: "#888",
  },
  inStock: {
    fontWeight: "bold",
    color: "#4caf50",
  },
  inBrand: {
    fontWeight: "bold",
    color: "#4caf50",
  },
  colorContainer: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  colorCircles: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedCircle: {
    borderWidth: 2,
    borderColor: "#000",
  },
  sizeContainer: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  sizeButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sizeButton: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  selectedSizeButton: {
    backgroundColor: "#ff6347",
    borderColor: "#ff6347",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 18,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#ff6347",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
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
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default ProductDetails;
