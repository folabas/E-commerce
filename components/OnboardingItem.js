import {
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
  } from "react-native";
  import React from "react";
  
  const OnboardingItem = ({ item }) => {
    const { width } = useWindowDimensions();
  
    return (
      <View style={[styles.container, { width }]}>
        <Image
          source={item.image}
          style={[styles.image, { width, resizeMode: "contain" }]}
        />
        <View style={{ flex: 0.3 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text>{item.next}</Text>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      flex: 0.7,
      justifyContent: "center",
    },
    title: {
      fontWeight: "800",
      fontSize: 28,
      marginBottom: 10,
      color: "gray",
      textAlign: "center",
    },
    description: {
      fontWeight: "300",
      marginBottom: 10,
      color: "#62656b",
      textAlign: "center",
      paddingHorizontal: 64,
    },
  });
  
  export default OnboardingItem;
  