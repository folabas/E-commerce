import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'; 

const AddProducts = ({ navigation }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [category, setCategory] = useState('');

  const handleNext = () => {
    // Passing product details to AddVariants screen
    navigation.navigate('AddVariants', {
      productName,
      price,
      sku,
      description,
      weight,
      currency,
      category,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Add New Product</Text>

        {/* Product Name Input */}
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter product name"
          value={productName}
          onChangeText={setProductName}
        />

        {/* Price with Embedded Currency Picker */}
        <Text style={styles.label}>Price</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.inputFlex]}
            placeholder="Enter price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={currency}
              style={styles.picker}
              onValueChange={(itemValue) => setCurrency(itemValue)}
            >
              <Picker.Item label="NGN" value="NGN" />
              <Picker.Item label="EUR" value="EUR" />
              <Picker.Item label="GBP" value="GBP" />
            </Picker>
          </View>
        </View>

        {/* SKU Input */}
        <Text style={styles.label}>SKU</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter SKU"
          value={sku}
          onChangeText={setSku}
        />

        {/* Category Dropdown */}
        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerContainer}>
        <ScrollView>
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Select category" value="" />
            <Picker.Item label="Customized T-shirt" value="Customized T-shirt" />
            <Picker.Item label="Plain T-shirts" value="Plain T-shirts" />
            <Picker.Item label="Sweatshirt" value="Sweatshirt" />
            <Picker.Item label="Hoodie" value="Hoodie" />
            <Picker.Item label="Shorts" value="Shorts" />
            <Picker.Item label="Jersey" value="Jersey" />
            <Picker.Item label="Pants" value="Pants" />
            <Picker.Item label="Cargo Pants" value="Cargo Pants" />
            <Picker.Item label="Trucker Hat" value="Trucker Hats" />
            <Picker.Item label="Socks" value="Socks" />
            <Picker.Item label="Varsity Jacket" value="Varsity Jacket" />
            <Picker.Item label="Ties" value="Ties" />
          </Picker>
          </ScrollView>
        </View>

        {/* Weight Input */}
        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter weight (kg)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />

        {/* Description Input */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.inputLarge}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={5}
        />

        {/* Next Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleNext}>
          <Text style={styles.saveButtonText}>Next</Text>
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  inputLarge: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputFlex: {
    flex: 1,
  },
  pickerContainer: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#0A2540',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddProducts;
