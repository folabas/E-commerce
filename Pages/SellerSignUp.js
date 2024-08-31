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
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import BusinessInfo from "../components/BusinessInfo";
import ValidationInfo from "../components/ValidationInfo";

export default function SellerSignUp() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "businessInfo", title: "Business Info" },
    { key: "validationInfo", title: "Validation Info" },
  ]);

  const [businessInfo, setBusinessInfo] = useState({
    businessName: "",
    businessEmail: "",
    yearInBusiness: new Date(),
    phoneNumber: "",
    businessDescription: "",
  });

  const [validationInfo, setValidationInfo] = useState({
    nin: "",
    socialMedia: "",
  });

  const handleCreateAccount = async () => {
    try {
      console.log("Posting data:", { ...businessInfo, ...validationInfo });
      const response = await fetch("http://192.168.153.32:5000/api/sellers", {
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
        Alert.alert("Success", result.message);
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while creating your account.");
    }
  };

  const renderScene = SceneMap({
    businessInfo: () => (
      <BusinessInfo
        businessInfo={businessInfo}
        setBusinessInfo={setBusinessInfo}
        onNext={() => setIndex(1)}
      />
    ),
    validationInfo: () => (
      <ValidationInfo
        validationInfo={validationInfo}
        setValidationInfo={setValidationInfo}
        onCreateAccount={handleCreateAccount}
      />
    ),
  });

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

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          swipeEnabled={false}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: "#007bff" }}
              style={{ backgroundColor: "white" }}
              labelStyle={{ color: "#333", fontWeight: "bold" }}
            />
          )}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const initialLayout = { width: Dimensions.get("window").width };

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
