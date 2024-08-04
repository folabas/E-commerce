import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../Footer';

const ProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        const email = await AsyncStorage.getItem('userEmail');
        if (name) {
          setUserName(name);
        }
        if (email) {
          setUserEmail(email);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image
            source={require('../images/Logo.png')} // Replace with your profile image path
            style={styles.profilePicture}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Cart')}>
              <Icon name="cart-outline" size={24} color="#000" />
              <Text style={styles.menuItemText}>My Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ChangePassword')}>
              <Icon name="key-outline" size={24} color="#000" />
              <Text style={styles.menuItemText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Address')}>
              <Icon name="location-outline" size={24} color="#000" />
              <Text style={styles.menuItemText}>Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaymentMethods')}>
              <Icon name="card-outline" size={24} color="#000" />
              <Text style={styles.menuItemText}>Payment Methods</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
              <Icon name="settings-outline" size={24} color="#000" />
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notifications')}>
              <Icon name="notifications-outline" size={24} color="#000" />
              <Text style={styles.menuItemText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Login')}>
              <Icon name="log-out-outline" size={24} color="#000" />
              <Text style={styles.menuItemText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Footer/>
      </ScrollView>
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
});

export default ProfileScreen;
