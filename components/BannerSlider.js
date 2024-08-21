import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");
const bannerWidth = width;

const banners = [
  require("../images/banner1.jpg"),
  require("../images/banner2.jpg"),
  require("../images/banner3.jpg"),
];

const BannerSlider = ({ onBannerClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.floor(e.nativeEvent.contentOffset.x / bannerWidth);
          setCurrentIndex(index);
        }}
      >
        {banners.map((banner, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onBannerClick(banner)}
            style={styles.bannerContainer}
          >
            <Image source={banner} style={styles.bannerImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: 200, overflow: "hidden" },
  bannerContainer: { width: bannerWidth, height: "100%", justifyContent: "center" },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default BannerSlider;
