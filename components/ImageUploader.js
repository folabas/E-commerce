import React, { useState } from 'react';
import { View, Button, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { uploadImageAsync } from '../Pages/uploadService'; // Adjust import path as needed
import axios from 'axios'; // Make sure to install axios for making API requests

const ImageUploader = () => {
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null); // Store the image URI
  const [imageUrl, setImageUrl] = useState(''); // Store the Firebase URL

  const handleUpload = async () => {
    if (!imageUri) {
      console.error('No image selected');
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        // Upload image and get download URL
        const downloadURL = await uploadImageAsync(imageUri);
        console.log('Image uploaded successfully:', downloadURL);
        setImageUrl(downloadURL);

        // Now save the product details with image URL to MongoDB
        const productData = {
          productName: 'Your Product Name',
          price: 100,
          sku: 'SKU001',
          description: 'Your product description',
          weight: 1,
          currency: 'USD',
          category: 'Clothing',
          variants: [
            {
              size: 'M',
              color: 'Red',
              stock: 10,
              image: downloadURL, // Use the image URL from Firebase
            },
          ],
          images: [
            {
              url: downloadURL,
              altText: 'Product Image',
            },
          ],
        };

        // Send the data to your server API to save in MongoDB
        const response = await axios.post('http://192.168.115.32:5000/api/products', productData);
        console.log('Product saved successfully:', response.data);
      } catch (error) {
        console.error('Error uploading image or saving product:', error.message);
      } finally {
        setLoading(false);
      }
    }, 3000); // 3-second delay
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Upload Image" onPress={handleUpload} />
          {/* Add code here to select an image and update `setImageUri` */}
          <Text>Selected Image URI: {imageUri}</Text>
          <Text>Uploaded Image URL: {imageUrl}</Text> {/* Show uploaded URL */}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageUploader;
