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
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import sampleProducts from "./sampleProducts";

const generateProducts = () => {
  let products = [];
  for (let i = 0; i < 50; i++) {
    const baseProduct = sampleProducts[i % sampleProducts.length];
    const randomPrice = (Math.random() * (60 - 20) + 20).toFixed(2); 
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
  const route = useRoute();
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPagination, setShowPagination] = useState(false); 
  const productsPerPage = 25;
  const scrollY = new Animated.Value(0);

  const { brand = "", category = "" } = route.params || {}; 

  useEffect(() => {
    // Generate and filter the products based on brand and category
    const allProducts = generateProducts();
    const filteredProducts = allProducts.filter(
      (product) =>
        (brand ? product.brand === brand : true) &&
        (category ? product.category === category : true)
    );
    setProducts(filteredProducts);
  }, [brand, category]);

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

  const handleScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const contentSizeHeight = event.nativeEvent.contentSize.height;
    const layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height;
    if (contentOffsetY + layoutMeasurementHeight >= contentSizeHeight - 50) {
      setShowPagination(true);
    } else {
      setShowPagination(false);
    }
  };
  const navigateToSearch = () => {
    navigation.navigate('SearchScreen', { products });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={styles.headerIcon}>
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
        scrollEventThrottle={16}
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
const cardWidth = (width - 40) / 2;

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
    marginTop: 90, 
    paddingHorizontal: 10,
    paddingBottom: 140, 
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