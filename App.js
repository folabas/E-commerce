import { Platform, StatusBar, StyleSheet } from "react-native";
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
import { TransitionPresets } from "@react-navigation/stack";
import SearchScreen from "./Pages/SearchScreen";
import StoreScreen from "./Pages/StoreScreen";
import ProfileScreen from "./Pages/ProfileScreen";
import WishlistScreen from "./Pages/WishlistScreen";
import Footer from "./Footer";
import Cart from "./Pages/Cart";
import { WishlistProvider } from "./contexts/WishlistContext";
import ChangePasswordScreen from "./Pages/ChangePasswordScreen";
import ProductDetails from "./Pages/ProductDetails";
import { CartProvider } from "./contexts/CartContext";
import Toast from "react-native-toast-message";
import Products from "./Pages/Products";
import ReviewsScreen from "./Pages/ReviewsScreen";
import AddNewAddress from "./Pages/AddNewAddress";
import NotificationScreen from "./components/NotificationScreen";
import Reviews from "./Pages/Reviews";
import SellerSignUp from "./Pages/SellerSignUp";
import BusinessInfo from "./components/BusinessInfo";
import ValidationInfo from "./components/ValidationInfo";
import FacialVerification from "./components/FacialVerification";
import HomeSellers from "./Pages/HomeSellers";
import OrdersPage from "./Pages/OrdersPage";
import MyProducts from "./components/MyProducts";
import AddProducts from "./Pages/AddProducts";
import AddVariants from "./Pages/AddVariants";
import ChatScreen from "./components/ChatScreen.js";

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
              animationEnabled: Platform.OS === 'ios', // Use animation for iOS only
              ...(Platform.OS === 'ios' ? TransitionPresets.ModalSlideFromBottomIOS : {}), // Apply iOS transition
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
              component={SearchScreen}
              options={{
                headerShown: false,
                ...(Platform.OS === 'ios' ? TransitionPresets.ModalSlideFromBottomIOS : {}),
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
            <Stack.Screen
              name="Products"
              component={Products}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ReviewsScreen"
              component={ReviewsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddNewAddress"
              component={AddNewAddress}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NotificationScreen"
              component={NotificationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Reviews"
              component={Reviews}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SellerSignUp"
              component={SellerSignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="BusinessInfo" component={BusinessInfo} />
            <Stack.Screen name="ValidationInfo" component={ValidationInfo} />
            <Stack.Screen
              name="FacialVerification"
              component={FacialVerification}
            />
            <Stack.Screen
              name="HomeSellers"
              component={HomeSellers}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OrdersPage"
              component={OrdersPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="MyProducts" component={MyProducts} />
            <Stack.Screen name="AddProducts" component={AddProducts} />
            <Stack.Screen name="AddVariants" component={AddVariants}/>
            <Stack.Screen name="ChatScreen" component={ChatScreen}/>
          </Stack.Navigator>
          <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
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
