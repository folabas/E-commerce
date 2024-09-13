import React, { useState, useEffect, } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReviewsScreen = ({ route }) => {
  const { cartItems } = route.params;
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');

        if (!token) {
          Alert.alert('Authentication Error', 'You need to be logged in to fetch addresses');
          return;
        }

        const response = await fetch('http://192.168.37.32:5000/api/address', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched addresses:', data);
          if (Array.isArray(data)) {
            setAddresses(data);

            if (data.length > 0) {
              setSelectedAddress(data[0].id || ''); // Ensure a fallback if id is undefined
            }
          } else {
            console.error('Unexpected data structure:', data);
          }
        } else {
          console.error('Failed to fetch addresses:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
        Alert.alert('Error', 'Failed to fetch addresses');
      }
    };

    fetchAddresses();
  }, []);

  const calculateTotal = () => {
    let total = 0;
    for (let item of cartItems) {
      const price = parseFloat(item.price) || 0;
      total += price * item.quantity;
    }
    return total.toFixed(2);
  };

  const calculateTax = () => {
    const subtotal = parseFloat(calculateTotal());
    const tax = subtotal * 0.25;
    return tax.toFixed(2);
  };

  const calculateOrderTotal = () => {
    const subtotal = parseFloat(calculateTotal());
    const shippingFee = 5.00;
    const tax = parseFloat(calculateTax());
    const orderTotal = subtotal + shippingFee + tax;
    return orderTotal.toFixed(2);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem} key={item.id}>
      <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name || ''}</Text>
        <Text style={styles.cartItemPrice}>{`$${(parseFloat(item.price) * item.quantity || 0).toFixed(2)}`}</Text>
        <Text style={styles.cartItemInfo}>Color: {item.colors?.[0] || 'N/A'}  Size: {item.sizes?.[0] || 'N/A'}</Text>
        <Text style={styles.cartItemQuantity}>Quantity: {item.quantity || 0}</Text>
      </View>
    </View>
  );

  const handleChangePaymentMethod = () => {
    console.log('Change payment method');
  };

  const handleChangeShippingAddress = () => {
    setIsModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleAddressSelection = (addressId) => {
    setSelectedAddress(addressId);
  };

  const renderAddressItem = ({ item }) => (
    <TouchableOpacity
      style={styles.addressContainer}
      onPress={() => handleAddressSelection(item.id)}
    >
      <View style={styles.checkboxContainer}>
        <View style={styles.checkbox}>
          {selectedAddress === item.id && (
            <Ionicons name="checkmark-circle" size={24} color="green" />
          )}
        </View>
        <Text style={styles.addressText}>{item.address || 'No address available'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order Review</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {cartItems.map(item => renderCartItem({ item }))}

        <View style={styles.promoCodeContainer}>
          <TextInput style={styles.promoCodeInput} placeholder="Have a promo code? Enter here" />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>${calculateTotal()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping Fee:</Text>
              <Text style={styles.summaryValue}>$5.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax Fee (25%):</Text>
              <Text style={styles.summaryValue}>${calculateTax()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotalLabel}>Order Total:</Text>
              <Text style={styles.summaryTotal}>${calculateOrderTotal()}</Text>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionContent}>
              <View>
                <Text style={styles.sectionTitle}>Payment Method</Text>
                <Text style={styles.sectionDetail}>Paypal</Text>
              </View>
              <TouchableOpacity onPress={handleChangePaymentMethod}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionContent}>
              <View>
                <Text style={styles.sectionTitle}>Shipping Address</Text>
                <Text style={styles.sectionDetail}>
                  {addresses.find(address => address.id === selectedAddress)?.address || 'No address selected'}
                </Text>
              </View>
              <TouchableOpacity onPress={handleChangeShippingAddress}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout (${calculateOrderTotal()})</Text>
      </TouchableOpacity>

      {/* Modal for changing shipping address */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.handleBar} />
            <Text style={styles.modalTitle}>Select Shipping Address</Text>

            {/* List of addresses */}
            <FlatList
              data={addresses}
              keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} // Ensure id is defined
              renderItem={renderAddressItem}
              contentContainerStyle={styles.addressList}
              ListEmptyComponent={<Text>No addresses available</Text>}
            />

            <TouchableOpacity
              style={styles.addAddressButton}
              onPress={() => {
                closeModal();
                navigation.navigate('AddNewAddress');
              }}
            >
              <Text style={styles.addAddressButtonText}>Add New Address</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    elevation: 4,
    zIndex: 1,
    paddingTop: 35,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingTop: 90, 
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  cartItemInfo: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  cartItemQuantity: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  promoCodeInput: {
    flex: 1,
    padding: 10,
  },
  applyButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  applyButtonText: {
    color: '#888',
  },
  detailsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 9,
    padding: 15,
    marginBottom: 20,
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
    color: '#888',
  },
  summaryTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  sectionContainer: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  sectionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionDetail: {
    fontSize: 14,
    color: '#888',
  },
  changeText: {
    fontSize: 14,
    color: '#ff6347',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    borderRadius: 2.5,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalCloseText: {
    fontSize: 16,
    color: '#ff6347',
    textAlign: 'center',
    marginTop: 20,
  },
  addressContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  addressText: {
    fontSize: 16,
  },
  addAddressButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  addAddressButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressList: {
    maxHeight: 300,
  },
});

export default ReviewsScreen;
