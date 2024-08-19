
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window'); 

const BannerCarousel = () => {
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollViewRef.current.scrollTo({
        x: (scrollViewRef.current.scrollX + width) % (width * 3),
        animated: true,
      });
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.bannerContainer}
    >
      <View style={styles.bannerContent}>
        <Image source={require('../images/banner1.jpg')} style={styles.bannerImage} />
        <View style={styles.textButtonContainer}>
          <Text style={styles.bannerText}>A look at the outfits of the month.</Text>
          <TouchableOpacity style={styles.bannerButton} accessibilityLabel="Buy Now">
            <Text style={styles.bannerButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bannerContent}>
        <Image source={require('../images/banner2.jpg')} style={styles.bannerImage} />
        <View style={styles.textButtonContainer}>
          <Text style={styles.bannerText}>New Arrivals Just for You!</Text>
          <TouchableOpacity style={styles.bannerButton} accessibilityLabel="Shop Now">
            <Text style={styles.bannerButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bannerContent}>
        <Image source={require('../images/banner3.jpg')} style={styles.bannerImage} />
        <View style={styles.textButtonContainer}>
          <Text style={styles.bannerText}>Exclusive Offers Available.</Text>
          <TouchableOpacity style={styles.bannerButton} accessibilityLabel="Discover More">
            <Text style={styles.bannerButtonText}>Discover More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    height: 200,
  },
  bannerContent: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 30,
    backgroundColor: '#f5f5f5', 
  },
  textButtonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerText: {
    color: "#333",
    fontSize: 20,
    fontWeight: "900",
  },
  bannerButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  bannerButtonText: {
    color: "#fff",
    textAlign: 'center',
  },
  bannerImage: {
    width: '50%', 
    height: '100%',
    resizeMode: 'cover',
  },
});

export default BannerCarousel;
