import React, { useState } from "react";
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

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }
  
    try {
      console.log('Attempting to login with:', { email, password });
  
      const response = await axios.post('http://192.168.153.32:5000/api/auth/login', {
        email,
        password,
      });
  
      console.log('Login response:', response.data);
  
      const { token } = response.data;
  
      if (token) {
        await AsyncStorage.setItem('authToken', token);
  
        // Fetch user profile after login
        const profileResponse = await axios.get('http://192.168.153.32:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log('Profile response:', profileResponse.data);
  
        const { name, email: userEmail, isSeller } = profileResponse.data;
  
        await AsyncStorage.setItem('userEmail', userEmail);
        await AsyncStorage.setItem('userName', name);
        await AsyncStorage.setItem('isSeller', JSON.stringify(isSeller));
  
        console.log('Login successful:', profileResponse.data);
  
        navigation.navigate('Home');
      } else {
        throw new Error('Token not provided');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
      console.error('Login failed:', errorMessage);
      Alert.alert(
        'Login Failed',
        errorMessage,
        [{ text: 'OK' }]
      );
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
    marginBottom: 20,
  },
  logoMain: {
    width: 80,
    height: 80,
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
