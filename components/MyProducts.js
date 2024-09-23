import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const API_URL = 'http://192.168.115.32:5000/api/products';

const MyProducts = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showActions, setShowActions] = useState(null);
  const [error, setError] = useState(null);
  const actionMenuRef = useRef(null);

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Token for fetching products:', token); // Log the token
  
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
  
      const data = await response.json();
      console.log('Fetched data:', data);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleActionPress = (id) => {
    setShowActions(showActions === id ? null : id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      Alert.alert('Success', 'Product deleted successfully');
      setProducts(products.filter((product) => product._id !== id));
      setShowActions(null);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleEdit = (id) => {
    navigation.navigate('EditProduct', { id });
  };

  const handleTouchOutside = (event) => {
    if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
      setShowActions(null);
    }
  };

  // Dismiss keyboard when clicking outside the component
  const handlePress = () => {
    Keyboard.dismiss();
    setShowActions(null);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity onPress={fetchProducts} style={styles.retryButton}>
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noProductsText}>No products have been added yet.</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddProducts')}>
          <Text style={styles.addButtonText}>Add a Product</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    console.log('Item:', item);
    const firstVariant = item.variants && item.variants.length > 0 ? item.variants[0] : null;

    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.productRow}>
          {item.images && item.images.length > 0 ? (
            <Image source={{ uri: item.images[0].url }} style={styles.productImage} onError={(error) => console.log('Image load error:', error)} />
          ) : (
            <View style={styles.noImageContainer}>
              <Text>No Image Available</Text>
            </View>
          )}
          <Text style={styles.productText}>{item.productName}</Text>
          <Text style={styles.productText}>{new Date(item.dateCreated).toLocaleDateString()}</Text>
          <Text style={styles.productText}>{item.category}</Text>
          <Text style={styles.productText}>{firstVariant ? firstVariant.size : 'N/A'}</Text>
          <Text style={styles.productText}>{firstVariant ? firstVariant.color : 'N/A'}</Text>
          <View style={styles.productActions}>
            <TouchableOpacity style={styles.actionPress} onPress={() => handleActionPress(item._id)}>
              <MaterialIcons name="more-vert" size={24} color="black" />
            </TouchableOpacity>
            {showActions === item._id && (
              <View style={styles.actionMenu} ref={actionMenuRef}>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleEdit(item._id)}>
                  <MaterialIcons name="edit" size={20} color="blue" />
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(item._id)}>
                  <MaterialIcons name="delete" size={20} color="red" />
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Image</Text>
          <Text style={styles.headerText}>Name</Text>
          <Text style={styles.headerText}>Date</Text>
          <Text style={styles.headerText}>Category</Text>
          <Text style={styles.headerText}>Size</Text>
          <Text style={styles.headerText}>Color</Text>
          <Text style={styles.headerText}>Action</Text>
        </View>

        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => (item._id ? item._id.toString() : Math.random().toString())}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: '600',
    color: '#555',
    width: 100,
    textAlign: 'center',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    paddingHorizontal: 16,
  },
  productText: {
    width: 100,
    fontSize: 14,
    marginLeft: 15,
    paddingLeft: 30,
    color: '#333',
    textAlign: 'center',
  },
  productImage: {
    marginLeft: 18,
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  productActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  actionMenu: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 10,
    zIndex: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  actionPress: {
    marginLeft: 70,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  retryButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  noImageContainer: {
    marginLeft: 18,
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductsText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MyProducts;
