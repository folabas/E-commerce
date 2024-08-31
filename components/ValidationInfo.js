import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";

const ValidationInfo = ({ validationInfo, setValidationInfo, onCreateAccount }) => {
  const { nin, socialMedia } = validationInfo;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Enter NIN</Text>
      <TextInput
        style={styles.input}
        value={nin}
        onChangeText={(text) => setValidationInfo((prev) => ({ ...prev, nin: text }))}
        placeholder="Enter your NIN"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Enter Social Media Account</Text>
      <TextInput
        style={styles.input}
        value={socialMedia}
        onChangeText={(text) => setValidationInfo((prev) => ({ ...prev, socialMedia: text }))}
        placeholder="Enter your social media account"
        placeholderTextColor="#aaa"
      />

      <View style={styles.facialVerificationContainer}>
        <TouchableOpacity
          style={styles.facialVerificationButton}
          onPress={() => Alert.alert("Facial Verification", "Facial verification initiated...")}
        >
          <Text style={styles.facialVerificationButtonText}>
            Perform Facial Verification
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.createAccountContainer}>
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={onCreateAccount}
        >
          <Text style={styles.createAccountButtonText}>
            Create My Account
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  facialVerificationContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  facialVerificationButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
  },
  facialVerificationButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  createAccountContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  createAccountButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
  },
  createAccountButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ValidationInfo;
