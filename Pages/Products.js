import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

// Sample product data (dummy data)
const sampleProducts = [
  {
    id: 1,
    name: "Flannel Shirt",
    brand: "Adidas",
    price: 34.96,
    rating: 4.8,
    stock: 5,
    image: require("../images/nfd3.jpg"),
    colors: ["red", "blue", "green"], // Example colors
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
    colors: ["red", "blue", "green"], // Example colors
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
    colors: ["red", "blue", "green"], // Example colors
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
    colors: ["red", "blue", "green"], // Example colors
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
    id: 5,
    name: "Flannel Shirt",
    brand: "Adidas",
    price: 34.96,
    rating: 4.8,
    stock: 5,
    image: require("../images/nfd3.jpg"),
    colors: ["red", "blue", "green"], // Example colors
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
    id: 6,
    name: "Henley Shirt",
    brand: "Reebok",
    price: 34.96,
    rating: 3.7,
    stock: 5,
    image: require("../images/henley.jpg"),
    colors: ["red", "blue", "green"], // Example colors
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
    id: 7,
    name: "Flannel Shirt",
    brand: "Adidas",
    price: 34.96,
    rating: 4.8,
    stock: 5,
    image: require("../images/flannel.jpg"),
    colors: ["red", "blue", "green"], // Example colors
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
    id: 8,
    name: "Henley Shirt",
    brand: "Reebok",
    price: 34.96,
    rating: 3.7,
    stock: 5,
    image: require("../images/henley.jpg"),
    colors: ["red", "blue", "green"], // Example colors
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

const generateProducts = () => {
  let products = [];
  for (let i = 0; i < 50; i++) {
    const baseProduct = sampleProducts[i % sampleProducts.length];
    const randomPrice = (Math.random() * (60 - 20) + 20).toFixed(2); // Random price between 20 and 60
    products.push({
      ...baseProduct,
      id: i + 1,
      price: parseFloat(randomPrice),
    });
  }
  return products;
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <View style={styles.pagination}>
      <TouchableOpacity
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon
          name="chevron-back"
          size={24}
          color={currentPage === 1 ? "#ccc" : "#000"}
        />
      </TouchableOpacity>

      {pages.map((page) => (
        <TouchableOpacity
          key={page}
          onPress={() => onPageChange(page)}
          style={[
            styles.pageNumber,
            currentPage === page && styles.pageNumberActive,
          ]}
        >
          <Text style={styles.pageNumberText}>{page}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Icon
          name="chevron-forward"
          size={24}
          color={currentPage === totalPages ? "#ccc" : "#000"}
        />
      </TouchableOpacity>
    </View>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPagination, setShowPagination] = useState(false); // State for pagination visibility
  const productsPerPage = 25;
  const navigation = useNavigation();
  const scrollY = new Animated.Value(0); // Animated value to track scroll position

  useEffect(() => {
    setProducts(generateProducts());
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginateProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  };

  const handleProductClick = (product) => {
    navigation.navigate("ProductDetails", { product });
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoToCart = () => {
    navigation.navigate("Cart");
  };

  const handleScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    // Show pagination only if user is at the end
    const contentSizeHeight = event.nativeEvent.contentSize.height;
    const layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height;
    if (contentOffsetY + layoutMeasurementHeight >= contentSizeHeight - 50) {
      setShowPagination(true);
    } else {
      setShowPagination(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity onPress={handleGoBack} style={styles.headerIcon}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <TouchableOpacity onPress={handleGoToCart} style={styles.headerIcon}>
          <Icon name="cart-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={paginateProducts()}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleProductClick(item)}
          >
            <View style={styles.cardImageContainer}>
              <Image source={item.image} style={styles.cardImage} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardBrand}>{item.brand}</Text>
              <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
        onScroll={handleScroll}
        scrollEventThrottle={16} // How often the scroll event is fired (in milliseconds)
      />

      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </View>
  );
};

const { width } = Dimensions.get("window");
const cardWidth = (width - 40) / 2; // Adjusting for margins and padding

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 25,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
    zIndex: 1,
  },
  headerIcon: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: "bold",
  },
  list: {
    marginTop: 90, // Adjust based on header height
    paddingHorizontal: 10,
    paddingBottom: 140, // Ensure space for pagination
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
    width: 'cardWidth',
  },
  cardImageContainer: {
    width: "100%",
    height: 150,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardBrand: {
    color: "#888",
    marginTop: 5,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  pagination: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 10,
    elevation: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pageNumber: {
    marginHorizontal: 5,
  },
  pageNumberText: {
    fontSize: 16,
    color: "#000",
  },
  pageNumberActive: {
    fontWeight: "bold",
    color: "#000",
  },
});

export default Products;