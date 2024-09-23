import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BusinessInfo from "../components/BusinessInfo";
import ValidationInfo from "../components/ValidationInfo";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";



export default function SellerSignUp() {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  // State for business and validation info
  const [businessInfo, setBusinessInfo] = useState({
    businessName: "",
    businessEmail: "",
    userEmail: "",
    yearInBusiness: new Date(),
    phoneNumber: "",
    businessDescription: "",
  });

  const [validationInfo, setValidationInfo] = useState({
    nin: "",
    socialMedia: "",
  });

  const checkTokenValidity = (token) => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000; // Convert to seconds
      return decoded.exp > now; // true if the token is not expired
    } catch (error) {
      console.error("Error decoding token:", error);
      return false; // Token is invalid or cannot be decoded
    }
  };

  const refreshAccessToken = async () => {
    try {
      // Retrieve the refresh token from AsyncStorage or a similar storage solution
      const refreshToken = await AsyncStorage.getItem('refreshToken');
  
      if (!refreshToken) {
        console.log("Refresh token not found. User needs to log in again.");
        Alert.alert("Error", "Session expired. Please log in again.");
        return null;
      }
  
      // Send the refresh token to the server to get a new access token
      const response = await axios.post('http://192.168.115.32:5000/api/auth/refresh-token', {
        refreshToken, // Include the refresh token in the request body
      });
  
      const { token } = response.data;
      
      // Save the new access token and update the AsyncStorage
      await AsyncStorage.setItem('authToken', token);
      console.log("New token received:", token);
  
      return token;
    } catch (error) {
      // Improved error handling with detailed logging
      console.error("Error refreshing token:", error.response?.data || error.message);
      Alert.alert("Error", "Unable to refresh token. Please log in again.");
      return null;
    }
  };
  

  const fetchUserEmail = async () => {
    try {
      let token = await AsyncStorage.getItem('authToken');
      console.log("Current token being sent:", token); // Log token

      // Check if the token is valid
      if (!checkTokenValidity(token)) {
        console.log("Token is invalid or expired. Refreshing token..."); // Log token validity check
        token = await refreshAccessToken(); // Try to refresh the token
        if (!token) return; // If refresh fails, exit
      } else {
        console.log("Token is valid."); // Log if token is valid
      }

      const response = await axios.get('http://192.168.115.32:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { email } = response.data;
      setBusinessInfo(prevInfo => ({
        ...prevInfo,
        userEmail: email,
      }));
    } catch (error) {
      console.error("Error fetching user email:", error.response?.data?.message || error.message);
      Alert.alert("Error", error.response ? error.response.data.message : error.message);
    }
  };

  useEffect(() => {
    fetchUserEmail();
  }, []);

  // Handle account creation
  const handleCreateAccount = async () => {
    if (!businessInfo.businessEmail || businessInfo.businessEmail.trim() === "") {
      Alert.alert("Error", "Email is required and cannot be empty.");
      return;
    }
    try {
      console.log("Posting data:", { ...businessInfo, ...validationInfo });
      const response = await axios.post("http://192.168.115.32:5000/api/sellers", {
        ...businessInfo,
        ...validationInfo,
      });
  
      Alert.alert("Success", response.data.message);
      // Save seller status to the backend
      await axios.post("http://192.168.115.32:5000/api/sellers/status", { isSeller: true });
      navigation.navigate('Profile');
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", error.response?.data?.message || "An error occurred while creating your account.");
    }
  };
  

  // Conditional rendering of BusinessInfo and ValidationInfo components
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.wrapper}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.illustrationContainer}>
          <Image
            source={require("../images/Credit.png")}
            style={styles.illustration}
            resizeMode="contain"
          />
          <Text style={styles.header}>Set up Seller's Account</Text>
        </View>

        {index === 0 ? (
          <BusinessInfo
            businessInfo={businessInfo}
            setBusinessInfo={setBusinessInfo}
            onNext={() => setIndex(1)}
          />
        ) : (
          <ValidationInfo
            validationInfo={validationInfo}
            setValidationInfo={setValidationInfo}
            onCreateAccount={handleCreateAccount}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  illustrationContainer: {
    alignItems: "center",
    padding: 20,
  },
  illustration: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
