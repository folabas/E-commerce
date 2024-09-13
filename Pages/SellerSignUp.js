import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BusinessInfo from "../components/BusinessInfo";
import ValidationInfo from "../components/ValidationInfo";

export default function SellerSignUp() {
  const [index, setIndex] = useState(0);

  // State for business and validation info
  const [businessInfo, setBusinessInfo] = useState({
    businessName: "",
    businessEmail: "",
    userEmail: "", // Add this field
    yearInBusiness: new Date(),
    phoneNumber: "",
    businessDescription: "",
  });

  const [validationInfo, setValidationInfo] = useState({
    nin: "",
    socialMedia: "",
  });

  // Handle account creation
  const handleCreateAccount = async () => {
    if (!businessInfo.businessEmail || businessInfo.businessEmail.trim() === "") {
      Alert.alert("Error", "Email is required and cannot be empty.");
      return;
    }
    try {
      console.log("Posting data:", { ...businessInfo, ...validationInfo });
      const response = await fetch("http://192.168.37.32:5000/api/sellers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...businessInfo,
          ...validationInfo,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('isSeller', JSON.stringify(true));
        Alert.alert("Success", result.message);
        
        // Save the isSeller status to AsyncStorage
        await AsyncStorage.setItem('isSeller', JSON.stringify(true));
        console.log('Saved isSeller:', true);

      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while creating your account.");
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
