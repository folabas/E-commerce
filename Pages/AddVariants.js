import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, TextInput } from 'react-native';
import { Card } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'; 
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { uploadImageAsync } from "./uploadService";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Request media library permissions
const requestMediaLibraryPermissions = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission required', 'We need access to your media library to select images.');
    return false;
  }
  return true;
};

const AddVariants = ({ route, navigation }) => {
  const { productName, price, sku, description, weight, currency, category } = route.params;

  const [variants, setVariants] = useState([{ size: 'Select Size', color: '', customColor: '', stock: 'Unlimited', image: null }]);

  const addVariant = () => {
    setVariants([...variants, { size: 'Select Size', color: '', customColor: '', stock: 'Unlimited', image: null }]);
  };

  const deleteVariant = (index) => {
    if (index > 0) { 
      const newVariants = variants.filter((_, i) => i !== index);
      setVariants(newVariants);
    } else {
      Alert.alert('Cannot delete', 'The first variant cannot be deleted.');
    }
  };

  const handleVariantChange = (index, key, value) => {
    const newVariants = [...variants];
    newVariants[index][key] = value;
    setVariants(newVariants);
  };

  const pickImage = async (index) => {
    const hasPermission = await requestMediaLibraryPermissions();
    if (!hasPermission) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0]?.uri; // Safe access to uri
      if (imageUri) {
        try {
          const imageUrl = await uploadImageAsync(imageUri);
          console.log('Uploaded Image URL:', imageUrl); // Log the URL for debugging
          const newVariants = [...variants];
          newVariants[index].image = imageUrl;
          setVariants(newVariants);
        } catch (error) {
          Alert.alert('Error', 'Failed to upload image');
          console.error('Image upload error:', error);
        }
      } else {
        Alert.alert('Error', 'Image URI is undefined');
      }
    } else {
      Alert.alert('Image selection was canceled');
    }
  };

  const validateVariants = () => {
    for (const variant of variants) {
      if (
        variant.size === 'Select Size' ||
        (!variant.color && !variant.customColor) ||
        !variant.image
      ) {
        return false;
      }
    }
    return true;
  };

  const handleSaveVariants = async () => {
    if (!validateVariants()) {
      Alert.alert('Error', 'Please fill in all fields for each variant before saving.');
      return;
    }
  
    console.log('Sending data:', {
      productName,
      price,
      sku,
      description,
      weight,
      currency,
      category,
      variants,
    });
  
    // Ensure `variants` array includes image URLs
    const productData = {
      productName,
      price,
      sku,
      description,
      weight,
      currency,
      category,
      variants: variants.map((v) => ({
        size: v.size,
        color: v.color,
        stock: v.stock,
        image: v.image,
      })),
      images: variants.map((v) => ({
        url: v.image,
        altText: 'Product Image',
      })),
    };
  
    try {
      const token = await AsyncStorage.getItem('authToken');
    
      if (!token) {
        Alert.alert('Error', 'No token found. Please log in again.');
        console.log('No token found in AsyncStorage');
        return;
      }
  
      // Log the token for debugging
      console.log('Retrieved token:', token)

      const response = await fetch('http://192.168.115.32:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });
  
      const responseText = await response.text();
  
      console.log('Server Response:', responseText);
  
      try {
        const result = JSON.parse(responseText);
  
        if (response.ok) {
          Alert.alert('Success', result.message);
          navigation.navigate('HomeSellers'); // Navigate to HomeSellers screen
        } else {
          Alert.alert('Error', result.message);
        }
      } catch (jsonError) {
        Alert.alert('Error', `Failed to parse server response: ${responseText}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save product');
      console.error('Error saving product:', error);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Add Product Variants</Text>

        {/* Display the product data for reference */}
        <View style={styles.productDetails}>
          <Text>Product Name: {productName}</Text>
          <Text>Price: {price} {currency}</Text>
          <Text>SKU: {sku}</Text>
          <Text>Category: {category}</Text>
        </View>

        {variants.map((variant, index) => (
          <View key={index} style={styles.variantContainer}>
            <View style={styles.variantHeader}>
              {index > 0 && (
                <TouchableOpacity onPress={() => deleteVariant(index)} style={styles.deleteButton}>
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity style={styles.imageBox} onPress={() => pickImage(index)}>
              {variant.image ? (
                <Image source={{ uri: variant.image }} style={styles.imagePreview} />
              ) : (
                <Text style={styles.browseImageText}>{index + 1}. Browse Image</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.label}>Size</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={variant.size}
                style={styles.picker}
                onValueChange={(value) => handleVariantChange(index, 'size', value)}
              >
                <Picker.Item label="Select Size" value="Select Size" />
                <Picker.Item label="Small" value="Small" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="Large" value="Large" />
                <Picker.Item label="XXL" value="XXL" />
                <Picker.Item label="XXXL" value="XXXL" />
              </Picker>
            </View>

            <Text style={styles.label}>Color</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={variant.color}
                style={styles.picker}
                onValueChange={(value) => handleVariantChange(index, 'color', value)}
              >
                <Picker.Item label="Select Color" value="" />
                <Picker.Item label="Red" value="Red" />
                <Picker.Item label="Blue" value="Blue" />
                <Picker.Item label="Green" value="Green" />
                <Picker.Item label="Black" value="Black" />
                <Picker.Item label="White" value="White" />
                <Picker.Item label="Custom" value="Custom" />
              </Picker>
            </View>

            {/* Custom Color Input */}
            {variant.color === 'Custom' && (
              <TextInput
                style={styles.customColorInput}
                placeholder="Enter custom color"
                value={variant.customColor}
                onChangeText={(text) => handleVariantChange(index, 'customColor', text)}
              />
            )}

            {/* Stock Dropdown */}
            <Text style={styles.label}>Stock</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={variant.stock}
                style={styles.picker}
                onValueChange={(value) => handleVariantChange(index, 'stock', value)}
              >
                <Picker.Item label="Unlimited" value="Unlimited" />
                {[...Array(50).keys()].map(i => (
                  <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
                ))}
              </Picker>
            </View>

            <View style={styles.divider} />
          </View>
        ))}

        {/* Add New Variant */}
        <TouchableOpacity style={styles.addButton} onPress={addVariant}>
          <Text style={styles.addButtonText}>+ Add New Variant</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveVariants}
        >
          <Text style={styles.saveButtonText}>Save Variants</Text>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  card: {
    padding: 20,
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  imageBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  browseImageText: {
    fontSize: 16,
    color: '#555',
  },
  customColorInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  variantContainer: {
    marginBottom: 20,
  },
  variantHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 15,
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  productDetails: {
    marginBottom: 20,
  },
});

export default AddVariants;
