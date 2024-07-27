import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const getIconStyle = (screenName) => {
    return route.name === screenName ? styles.activeIcon : styles.icon;
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="home-outline" size={26} style={getIconStyle("Home")} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("Cart")}
      >
        <Icon name="cart-outline" size={26} style={getIconStyle("Cart")} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("Store")}
      >
        <Icon name="storefront-outline" size={26} style={getIconStyle("Store")} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("Wishlist")}
      >
        <Icon name="heart-outline" size={26} style={getIconStyle("Wishlist")} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon name="person-outline" size={26} style={getIconStyle("Profile")} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 5, // For Android shadow
    shadowColor: "#666", // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.1, // For iOS shadow
    shadowRadius: 3, // For iOS shadow
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "#666",
  },
  activeIcon: {
    color: "#000", // Change to your preferred active color
    backgroundColor: "#e0e0e0", // Change to your preferred background color
    borderRadius: 20, // To make the icon background round
    padding: 6,
  },
});

export default Footer;
