import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword || !name || !surname) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://192.168.115.32:5000/api/auth/signup",
        {
          email,
          password,
          name,
          surname,
          emailUser: "folabas2@gmail.com", // Use actual credentials if needed
          emailPass: "fakvkwcqqzwkagim", // Use actual credentials if needed
        }
      );
  
      if (response.status === 201) {
        Alert.alert("Success", "Account created successfully!");
        await AsyncStorage.setItem("userName", name);
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", response.data.message || "An error occurred during signup.");
      }
    } catch (error) {
      console.error("Signup error:", error.response ? error.response.data : error.message);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../images/Logo.png")} style={styles.logoMain} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.paragraph}>
          Join us and explore a world of limitless choices.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Surname"
          style={styles.input}
          value={surname}
          onChangeText={(text) => setSurname(text)}
        />
        <TextInput
          placeholder="E-Mail"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignup}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.socialLoginContainer}>
        <Text style={styles.orText}>Or Sign Up With</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../images/google-icon.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../images/facebook-icon.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.signInText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoMain: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "ArchivoBlack-Regular",
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  signUpButton: {
    backgroundColor: "#191d21",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  signUpText: {
    color: "#FFF",
    fontSize: 16,
  },
  socialLoginContainer: {
    alignItems: "center",
  },
  orText: {
    marginBottom: 10,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  socialButton: {
    padding: 10,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  signInButton: {
    marginTop: 20,
  },
  signInText: {
    color: "#007BFF",
    fontSize: 14,
  },
});

export default Signup;
