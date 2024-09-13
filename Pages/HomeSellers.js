import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LineChart, ProgressChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

const HomeSellers = ({ navigation }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-250)); // Initial value for slide animation
  const [isProductsDropdownVisible, setProductsDropdownVisible] = useState(false); // State for dropdown
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Failed to load userId:', error);
      }
    };

    getUserId();
  }, []);

  const handleLogout = () => {
    console.log("Logged out");
    navigation.navigate("SellerAuth");
  };

  const toggleSidebar = () => {
    if (isSidebarVisible) {
      // Slide sidebar out
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setSidebarVisible(false);
      });
    } else {
      setSidebarVisible(true);
      // Slide sidebar in
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleProductsDropdownToggle = () => {
    setProductsDropdownVisible(!isProductsDropdownVisible);
  };

  const handleNavigation = (route) => {
    navigation.navigate(route);
    setProductsDropdownVisible(false); // Close dropdown on navigation
  };

  const handleChatNavigation = () => {
    if (userId) {
      navigation.navigate("ChatScreen", {
        productId: "someProductId", 
        userId,                   // Use the retrieved userId
        sellerId: "someSellerId", 
      });
    } else {
      console.error('UserId is not available');
    }
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [150, 100, 150, 200, 250, 300, 350, 400, 450, 500, 250, 600],
      },
    ],
  };

  const purchaseData = {
    labels: [
      "Vendor Rejected Rate",
      "Return to Vendor Costs",
      "Spend Under Management",
      "Emergency Purchase Ratio",
    ],
    data: [0.042, 0.156, 0.742, 0.065],
  };

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Ionicons name="menu-outline" size={28} color="#333" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Ionicons
              name="person-outline"
              size={19}
              color="#333"
              style={styles.profileIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Dashboard</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Pending PRs</Text>
            <Text style={styles.cardValue}>165</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ongoing PRs</Text>
            <Text style={styles.cardValue}>78</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Move To Purchase</Text>
            <Text style={styles.cardValue}>145</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total PRs</Text>
            <Text style={styles.cardValue}>526</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ready to ship</Text>
            <Text style={styles.cardValue}>526</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}></Text>
            <Text style={styles.cardValue}>526</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Spend Under Management</Text>
          <ScrollView horizontal>
            <LineChart
              data={data}
              width={screenWidth * 2}
              height={220}
              chartConfig={chartConfig}
              bezier
            />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Purchase Ratio</Text>
          <ScrollView horizontal contentContainerStyle={styles.scrollView}>
            <ProgressChart
              data={purchaseData}
              width={screenWidth * 2.5}
              height={220}
              chartConfig={chartConfig}
              hideLegend={false}
            />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Orders by People</Text>
          <ScrollView horizontal>
            <BarChart
              data={barChartData}
              width={screenWidth * 1}
              height={220}
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
          </ScrollView>
        </View>
      </ScrollView>

      {/* Sidebar Modal */}
      {isSidebarVisible && (
        <Modal
          animationType="none"
          transparent={true}
          visible={isSidebarVisible}
          onRequestClose={toggleSidebar}
        >
          <Pressable style={styles.overlay} onPress={toggleSidebar}>
            <Animated.View style={[styles.sidebar, { left: slideAnim }]}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Dashboard")}
              >
                <Ionicons name="grid-outline" size={24} color="white" />
                <Text style={styles.menuText}>Dashboard</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleProductsDropdownToggle}
              >
                <Ionicons name="cube-outline" size={24} color="white" />
                <Text style={styles.menuText}>Products</Text>
                <Ionicons
                  name={
                    isProductsDropdownVisible
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={16}
                  color="white"
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>

              {isProductsDropdownVisible && (
                <View style={styles.dropdownMenu}>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleNavigation("AddProducts")}
                  >
                    <Text style={styles.dropdownText}>Add Product</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleNavigation("MyProducts")}
                  >
                    <Text style={styles.dropdownText}>View Products</Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("OrdersPage")}
              >
                <Ionicons name="receipt-outline" size={24} color="white" />
                <Text style={styles.menuText}>Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Discount")}
              >
                <Ionicons name="pricetags-outline" size={24} color="white" />
                <Text style={styles.menuText}>Discount</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Account")}
              >
                <Ionicons name="person-outline" size={24} color="white" />
                <Text style={styles.menuText}>Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Notification")}
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="white"
                />
                <Text style={styles.menuText}>Notifications</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleChatNavigation}
              >
                <Ionicons name="chatbubble-outline" size={24} color="white" />
                <Text style={styles.menuText}>Chats</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={24} color="white" />
                <Text style={styles.menuText}>Logout</Text>
              </TouchableOpacity>
            </Animated.View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 35,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 19,
    fontWeight: "600",
    color: "#333",
    marginLeft: 10,
  },
  profileIcon: {
    marginRight: 0,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    flexBasis: "30%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 12,
    color: "#555",
    marginBottom: 10,
    fontWeight: "600",
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  scrollView: {
    marginLeft: -250,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  sidebar: {
    width: 250,
    height: "100%",
    backgroundColor: "#0A2540",
    padding: 20,
    justifyContent: "center",
    position: "absolute",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  menuText: {
    color: "white",
    marginLeft: 15,
    fontSize: 16,
  },
  dropdownIcon: {
    marginLeft: "auto",
  },
  dropdownMenu: {
    marginLeft: 40,
    marginTop: 0,
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  dropdownText: {
    color: "white",
    fontSize: 14,
  },
});

export default HomeSellers;
