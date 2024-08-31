import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeSellers = ({ navigation }) => {
  const handleLogout = () => {
    console.log('Logged out');
    navigation.navigate('SellerAuth');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to Home Sellers</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="white" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.welcomeMessage}>Here are your seller tools and information:</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manage Products</Text>
          <Text style={styles.sectionDescription}>Add, edit, or remove your products.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>View Orders</Text>
          <Text style={styles.sectionDescription}>Check your current and past orders.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manage Account</Text>
          <Text style={styles.sectionDescription}>Update your profile and account details.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  welcomeMessage: {
    fontSize: 18,
    fontWeight: '500',
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  sectionDescription: {
    fontSize: 16,
    color: '#666',
  },
});

export default HomeSellers;
