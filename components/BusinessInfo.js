import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const BusinessInfo = ({ businessInfo, setBusinessInfo, onNext }) => {
  const { businessName, businessEmail, yourEmail, yearInBusiness, phoneNumber, businessDescription } = businessInfo;

  const validateFields = () => {
    if (!businessName || !businessEmail || !phoneNumber || !businessDescription) {
      Alert.alert("⚠️ Please fill all the fields.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateFields()) {
      onNext();
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>Business Name</Text>
        <TextInput
          style={styles.input}
          value={businessName}
          onChangeText={(text) => setBusinessInfo((prev) => ({ ...prev, businessName: text }))}
          placeholder="Enter your business name"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Business Email</Text>
        <TextInput
          style={styles.input}
          value={businessEmail}
          onChangeText={(text) => setBusinessInfo((prev) => ({ ...prev, businessEmail: text }))}
          placeholder="Enter your business email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Your Email</Text>
        <TextInput
          style={styles.input}
          value={yourEmail}
          editable={false}
          placeholderTextColor="#aaa"
        />

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Year in Business</Text>
            <TextInput
              style={styles.input}
              value={yearInBusiness.toDateString()}
              editable={false}
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.halfWidth}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={(text) => setBusinessInfo((prev) => ({ ...prev, phoneNumber: text }))}
              placeholder="Enter your phone number"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <Text style={styles.label}>Business Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={businessDescription}
          onChangeText={(text) => setBusinessInfo((prev) => ({ ...prev, businessDescription: text }))}
          placeholder="Describe your business"
          placeholderTextColor="#aaa"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 15, 
    justifyContent: "center",
  },
  container: {
    padding: 15, 
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    maxWidth: 350,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  label: {
    fontSize: 14, 
    marginBottom: 5,
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8, 
    borderRadius: 8,
    marginBottom: 10, 
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  textArea: {
    height: 80,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12, 
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BusinessInfo;
