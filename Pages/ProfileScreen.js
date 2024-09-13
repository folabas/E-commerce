import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Footer from '../Footer';

const ProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newUserName, setNewUserName] = useState(userName);
  const [profileImage, setProfileImage] = useState(require('../images/Logo.png'));
  const [isSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const name = await AsyncStorage.getItem('userName');
        const email = await AsyncStorage.getItem('userEmail');
        const sellerStatus = await AsyncStorage.getItem('isSeller');

        console.log('Fetched values:', { name, email, sellerStatus }); // Log fetched values

        if (name) {
          setUserName(name);
          setNewUserName(name);
        }
        if (email) {
          setUserEmail(email);
        }
        if (sellerStatus !== null) {
          setIsSeller(JSON.parse(sellerStatus));
        }
      } catch (error) {
        setError('Failed to fetch user data.');
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('userName', newUserName);
      setUserName(newUserName);
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleImageChange = () => {
    Alert.alert(
      'Change Profile Image',
      'Choose an option',
      [
        { text: 'Pick from Gallery', onPress: pickImageFromGallery },
        { text: 'Take a Picture', onPress: takePicture },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.uri });
    }
  };

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.uri });
    }
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('isSeller');

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Logout Error', 'Failed to log out. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Image
              source={profileImage}
              style={styles.profilePicture}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userEmail}>{userEmail}</Text>
            </View>
            {isSeller && (
              <TouchableOpacity
                style={styles.createSellerButton}
                onPress={() => navigation.navigate('HomeSellers')}
              >
                <Text style={styles.createSellerButtonText}>Switch To Seller</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={() => setModalVisible(true)}
            >
              <Icon name="create-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.menuContainer}>
            <View style={styles.menu}>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Cart')}>
                <Icon name="cart-outline" size={24} color="#000" />
                <Text style={styles.menuItemText}>My Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('NotificationScreen')}>
                <Icon name="notifications-outline" size={24} color="#000" />
                <Text style={styles.menuItemText}>Notifications</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ChangePassword')}>
                <Icon name="key-outline" size={24} color="#000" />
                <Text style={styles.menuItemText}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AddNewAddress')}>
                <Icon name="location-outline" size={24} color="#000" />
                <Text style={styles.menuItemText}>Address</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaymentMethods')}>
                <Icon name="card-outline" size={24} color="#000" />
                <Text style={styles.menuItemText}>Payment Methods</Text>
              </TouchableOpacity>
              {!isSeller && (
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SellerSignUp')}>
                  <Icon name="settings-outline" size={24} color="#000" />
                  <Text style={styles.menuItemText}>Create Seller's Account</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Icon name="log-out-outline" size={24} color="#000" />
                <Text style={styles.menuItemText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Footer />
        </ScrollView>
      )}

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={handleImageChange}
            >
              <Image
                source={profileImage}
                style={styles.modalProfilePicture}
              />
              <View style={styles.cameraIconWrapper}>
                <TouchableOpacity
                  style={styles.cameraIconContainer}
                  onPress={handleImageChange}
                >
                  <Icon name="camera-outline" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TextInput
              style={styles.modalInput}
              value={newUserName}
              onChangeText={setNewUserName}
              placeholder="Enter new name"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    position: 'relative',
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  editIconContainer: {
    padding: 10,
    position: 'absolute',
    right: 10,
    top: 60,
    backgroundColor: '#f5f5f5',
    borderRadius: 40,
  },
  createSellerButton: {
    padding: 7,
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#888',
    borderRadius: 10,
  },
  createSellerButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -120,
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  modalProfilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconWrapper: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#888',
    borderRadius: 50,
    padding: 5,
    elevation: 5,
  },
  cameraIconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007bff',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
});

export default ProfileScreen;
