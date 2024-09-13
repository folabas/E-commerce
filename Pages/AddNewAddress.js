import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList, Dimensions, Alert, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNewAddress = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      if (!token) {
        Alert.alert('Authentication Error', 'You need to be logged in to fetch addresses');
        return;
      }

      const response = await fetch('http://192.168.37.32:5000/api/address', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add token to Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }

      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error('Error fetching addresses:', error.message);
      Alert.alert('Error', 'Failed to fetch addresses');
    }
  };

  const handleSaveAddress = async () => {
    if (!name || !phoneNumber || !street || !postalCode || !city || !state || !country) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }
  
    setLoading(true);
    Keyboard.dismiss();
  
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        Alert.alert('Authentication Error', 'You need to be logged in to save an address');
        setLoading(false);
        return;
      }
  
      const response = await fetch('http://192.168.37.32:5000/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          phoneNumber,
          street,
          postalCode,
          city,
          state,
          country,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save address');
      }
  
      const data = await response.json();
      setAddresses(prevAddresses => [...prevAddresses, data.address]);
      resetForm();
  
      // Show success message
      Alert.alert('Success', 'Your address has been saved');
  
      console.log('Address saved:', data);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving address:', error.message);
      Alert.alert('Error', 'Failed to save address');
    } finally {
      setLoading(false);
    }
  };
  

  const resetForm = () => {
    setName('');
    setPhoneNumber('');
    setStreet('');
    setPostalCode('');
    setCity('');
    setState('');
    setCountry('');
  };

  const handleDeleteAddress = async (id) => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      if (!token) {
        Alert.alert('Authentication Error', 'You need to be logged in to delete an address');
        return;
      }

      const response = await fetch(`http://192.168.37.32:5000/api/address/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete address');
      }

      setAddresses(prevAddresses => prevAddresses.filter(address => address._id !== id));
      Alert.alert('Success', 'Address deleted successfully');
    } catch (error) {
      console.error('Error deleting address:', error.message);
      Alert.alert('Error', 'Failed to delete address');
    }
  };

  const renderAddressItem = ({ item }) => (
    <View style={styles.addressItem}>
      <Text style={styles.addressText}>{item.name}, {item.street}, {item.city}, {item.state}, {item.country}</Text>
      <View style={styles.addressActions}>
        <TouchableOpacity onPress={() => handleDeleteAddress(item._id)}>
          <Icon name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }}>
          <Icon name="create-outline" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.goBackIcon} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add new Address</Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="person-outline" size={20} color="#888" style={styles.iconStyle} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="call-outline" size={20} color="#888" style={styles.iconStyle} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputContainerHalf}>
          <Icon name="home-outline" size={20} color="#888" style={styles.iconStyle} />
          <TextInput
            style={styles.input}
            placeholder="Street"
            value={street}
            onChangeText={setStreet}
          />
        </View>
        <View style={styles.inputContainerHalf}>
          <Icon name="mail-outline" size={20} color="#888" style={styles.iconStyle} />
          <TextInput
            style={styles.input}
            placeholder="Postal Code"
            value={postalCode}
            onChangeText={setPostalCode}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputContainerHalf}>
          <Icon name="location-outline" size={20} color="#888" style={styles.iconStyle} />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
        </View>
        <View style={styles.inputContainerHalf}>
          <Icon name="map-outline" size={20} color="#888" style={styles.iconStyle} />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={state}
            onChangeText={setState}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="globe-outline" size={20} color="#888" style={styles.iconStyle} />
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress} disabled={loading}>
        <Text style={styles.saveButtonText}>{loading ? 'Saving...' : 'Save'}</Text>
      </TouchableOpacity>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item._id}
        renderItem={renderAddressItem}
        contentContainerStyle={styles.addressList}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 20,
    position: 'relative',
  },
  goBackIcon: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#e5e5e5',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputContainerHalf: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#e5e5e5',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 48,
    width: (width - 60) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconStyle: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#0066FF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  addressList: {
    marginTop: 20,
  },
  addressItem: {
    backgroundColor: '#fff',
    borderColor: '#e5e5e5',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressText: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  addressActions: {
    flexDirection: 'row',
  },
});

export default AddNewAddress;
