// App.js
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./components/Onboarding";
import Login from "./components/Login";
import Signup from "./components/Signup";
import useFonts from "./hooks/useFonts";
import ForgotPassword from "./Pages/ForgotPassword";
import PasswordResetConfirmation from "./Pages/PasswordResetConfirmation";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import { TransitionPresets } from "@react-navigation/stack";
import StoreScreen from "./Pages/StoreScreen";
import ProfileScreen from "./Pages/ProfileScreen";
import WishlistScreen from "./Pages/WishlistScreen";
import Footer from "./Footer";
import Cart from "./Pages/Cart";
import { WishlistProvider } from "./contexts/WishlistContext";
import ChangePasswordScreen from "./Pages/ChangePasswordScreen";
import ProductDetails from "./Pages/ProductDetails";
import { CartProvider } from "./contexts/CartContext";
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await useFonts();
        setFontsLoaded(true);
        SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Return null while fonts are loading
  }

  return (
    <CartProvider>
      <WishlistProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Onboarding"
            screenOptions={{
              animationEnabled: false,
            }}
          >
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PasswordResetConfirmation"
              component={PasswordResetConfirmation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{
                headerShown: false,
                ...TransitionPresets.ModalSlideFromBottomIOS,
              }}
            />
            <Stack.Screen
              name="Store"
              component={StoreScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Wishlist"
              component={WishlistScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePasswordScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Footer" component={Footer} />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
        <Toast />
      </WishlistProvider>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
