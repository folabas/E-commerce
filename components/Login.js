import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import CheckBox from 'react-native-check-box';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  // Fetch saved credentials if "Remember Me" was checked
  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('savedEmail');
        const rememberMeChecked = await AsyncStorage.getItem('rememberMeChecked');

        if (rememberMeChecked === 'true') {
          setEmail(savedEmail || '');
          setChecked(true);
        }
      } catch (error) {
        console.error("Failed to load saved credentials:", error);
      }
    };
    loadCredentials();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }
  
    try {
      console.log('Attempting to login with:', { email, password });
  
      // Make a login request to the backend
      const response = await axios.post('http://192.168.115.32:5000/api/auth/login', {
        email,
        password,
      });
  
      console.log('Login response:', response.data);
      const { accessToken, refreshToken, name, email: userEmail, isSeller } = response.data;
  
      // Check if both tokens are received
      if (!accessToken || !refreshToken) {
        console.error('Access or refresh token is missing');
        throw new Error('Access or refresh token not provided');
      }
  
      // Store both tokens for future use
      await AsyncStorage.setItem('authToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
  
      // Store user information in AsyncStorage
      await AsyncStorage.setItem('userEmail', userEmail);
      await AsyncStorage.setItem('userName', name);
      console.log('Profile response:', response.data);
  
      // Handle "Remember Me" functionality
      if (isChecked) {
        await AsyncStorage.setItem('savedEmail', email);
        await AsyncStorage.setItem('rememberMeChecked', 'true');
      } else {
        await AsyncStorage.removeItem('savedEmail');
        await AsyncStorage.setItem('rememberMeChecked', 'false');
      }
  
      console.log('Login successful:', response.data);
  
      // If needed, use `isSeller` in memory for conditional logic
      if (isSeller) {
        console.log('User is a seller');
      }
  
      // Navigate to the Home screen upon successful login
      navigation.navigate('Home');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Login failed. Please try again.';
      console.error('Login failed:', error);
      Alert.alert('Login Failed', errorMessage, [{ text: 'OK' }]);
    }
  };
  
  
  
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image source={require("../images/Logo.png")} style={styles.logoMain} />
          <Text style={styles.logoText}>ProdigyMart</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome back,</Text>
          <Text style={styles.paragraph}>Discover Limitless Choices and Unmatched Convenience.</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={userName}
            onChangeText={(text) => setUserName(text)}
          />
          <TextInput
            placeholder="E-Mail"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              style={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.optionsContainer}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              isChecked={isChecked}
              onClick={() => setChecked(!isChecked)}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Remember Me</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
        <View style={styles.socialLoginContainer}>
          <Text style={styles.orText}>Or Sign in With</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require("../images/google-icon.png")} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require("../images/facebook-icon.png")} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoMain: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 5,
    color: "#000",
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
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 8,
  },
  label: {
    fontSize: 14,
  },
  forgotPassword: {
    fontSize: 14,
    color: "#007BFF",
  },
  signInButton: {
    backgroundColor: "#191d21",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  signInText: {
    color: "#FFF",
    fontSize: 16,
  },
  createAccountButton: {
    backgroundColor: "#EEE",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  createAccountText: {
    color: "#000",
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
});

export default Login;
