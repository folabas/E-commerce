import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const PasswordResetConfirmation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../images/Email-sent.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Password Reset Email Sent</Text>
      <Text style={styles.paragraph}>
        Your Account Security is Our Priority! We've sent you a secure link to
        safely change your password and keep your account protected.
      </Text>
      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resendButton}>
        <Text style={styles.resendButtonText}>Resend Email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    marginBottom: 20,
  },
  doneButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  doneButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  resendButton: {
    backgroundColor: "#EEE",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  resendButtonText: {
    color: "#000",
    fontSize: 16,
  },
});

export default PasswordResetConfirmation;
