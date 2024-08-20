import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import products from "../data/products";


const TabContent = ({ activeTab, styles, handleBrandClick }) => {
    const renderTabContent = () => {
        switch (activeTab) {
          case "NFD":
            return (
              <>
                <View style={styles.productSection}>
                  <TouchableOpacity onPress={() => handleBrandClick("NFD","T-SHIRTS")}>
                    <View style={styles.brandContainer}>
                      <View style={styles.brandHeader}>
                        <Image
                          source={require("../images/nike.png")}
                          style={styles.logo}
                        />
                        <Text style={styles.brand}>T-SHIRTS</Text>
                      </View>
                      <View style={styles.productRow}>
                        <Image
                          source={require("../images/nfd4.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/F.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/nfd5.jpg")}
                          style={styles.productImage}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
    
                <View style={styles.productSection}>
                  <TouchableOpacity onPress={() => handleBrandClick("NFD","SHORTS")}>
                    <View style={styles.brandContainer}>
                      <View style={styles.brandHeader}>
                        <Image
                          source={require("../images/adidas.png")}
                          style={styles.logo}
                        />
                        <Text style={styles.brand}>SHORTS</Text>
                      </View>
                      <View style={styles.productRow}>
                        <Image
                          source={require("../images/nfd3.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/nfd1.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/nfd2.jpg")}
                          style={styles.productImage}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.productSection}>
                  <TouchableOpacity onPress={() => handleBrandClick("NFD","HOODIES")}>
                    <View style={styles.brandContainer}>
                      <View style={styles.brandHeader}>
                        <Image
                          source={require("../images/adidas.png")}
                          style={styles.logo}
                        />
                        <Text style={styles.brand}>HOODIES</Text>
                      </View>
                      <View style={styles.productRow}>
                        <Image
                          source={require("../images/shirt1.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt2.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt3.jpg")}
                          style={styles.productImage}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            );
          case "RAPTOR":
            return (
              <>
                <View style={styles.productSection}>
                  <TouchableOpacity onPress={() => handleBrandClick("RAPTOR","T-SHIRTS")}>
                    <View style={styles.brandContainer}>
                      <View style={styles.brandHeader}>
                        <Image
                          source={require("../images/nike.png")}
                          style={styles.logo}
                        />
                        <Text style={styles.brand}>T-SHIRTS</Text>
                      </View>
                      <View style={styles.productRow}>
                        <Image
                          source={require("../images/shirt1.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt2.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt3.jpg")}
                          style={styles.productImage}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
    
                <View style={styles.productSection}>
                  <TouchableOpacity onPress={() => handleBrandClick("RAPTOR","SHORTS")}>
                    <View style={styles.brandContainer}>
                      <View style={styles.brandHeader}>
                        <Image
                          source={require("../images/adidas.png")}
                          style={styles.logo}
                        />
                        <Text style={styles.brand}>SHORTS</Text>
                      </View>
                      <View style={styles.productRow}>
                        <Image
                          source={require("../images/shirt1.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt2.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt3.jpg")}
                          style={styles.productImage}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.productSection}>
                  <TouchableOpacity onPress={() => handleBrandClick("RAPTOR","HOODIES")}>
                    <View style={styles.brandContainer}>
                      <View style={styles.brandHeader}>
                        <Image
                          source={require("../images/adidas.png")}
                          style={styles.logo}
                        />
                        <Text style={styles.brand}>HOODIES</Text>
                      </View>
                      <View style={styles.productRow}>
                        <Image
                          source={require("../images/shirt1.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt2.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt3.jpg")}
                          style={styles.productImage}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            );
          case "FBA":
            return (
              <>
                <View style={styles.productSection}>
                  <TouchableOpacity onPress={() => handleBrandClick("FBA","T-SHIRTS")}>
                    <View style={styles.brandContainer}>
                      <View style={styles.brandHeader}>
                        <Image
                          source={require("../images/nike.png")}
                          style={styles.logo}
                        />
                        <Text style={styles.brand}>T-SHIRTS</Text>
                      </View>
                      <View style={styles.productRow}>
                        <Image
                          source={require("../images/shirt1.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt2.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt3.jpg")}
                          style={styles.productImage}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
    
                <View style={styles.productSection}>
                  <TouchableOpacity onPress={() => handleBrandClick("FBA","SHORTS")}>
                    <View style={styles.brandContainer}>
                      <View style={styles.brandHeader}>
                        <Image
                          source={require("../images/adidas.png")}
                          style={styles.logo}
                        />
                        <Text style={styles.brand}>SHORTS</Text>
                      </View>
                      <View style={styles.productRow}>
                        <Image
                          source={require("../images/shirt1.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt2.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt3.jpg")}
                          style={styles.productImage}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.productSection}>
                  <TouchableOpacity onPress={() => handleBrandClick("FBA","HOODIES")}>
                    <View style={styles.brandContainer}>
                      <View style={styles.brandHeader}>
                        <Image
                          source={require("../images/adidas.png")}
                          style={styles.logo}
                        />
                        <Text style={styles.brand}>HOODIES</Text>
                      </View>
                      <View style={styles.productRow}>
                        <Image
                          source={require("../images/shirt1.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt2.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt3.jpg")}
                          style={styles.productImage}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            );
          case "COMPLEX":
            return (
              <>
                <View style={styles.productSection}>
                  <TouchableOpacity onPress={() => handleBrandClick("COMPLEX","T-SHIRTS")}>
                    <View style={styles.brandContainer}>
                      <View style={styles.brandHeader}>
                        <Image
                          source={require("../images/nike.png")}
                          style={styles.logo}
                        />
                        <Text style={styles.brand}>T-SHIRTS</Text>
                      </View>
                      <View style={styles.productRow}>
                        <Image
                          source={require("../images/shirt1.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt2.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt3.jpg")}
                          style={styles.productImage}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
    
                <View style={styles.productSection}>
                  <TouchableOpacity onPress={() => handleBrandClick("COMPLEX","SHORTS")}>
                    <View style={styles.brandContainer}>
                      <View style={styles.brandHeader}>
                        <Image
                          source={require("../images/adidas.png")}
                          style={styles.logo}
                        />
                        <Text style={styles.brand}>SHORTS</Text>
                      </View>
                      <View style={styles.productRow}>
                        <Image
                          source={require("../images/shirt1.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt2.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt3.jpg")}
                          style={styles.productImage}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.productSection}>
                  <TouchableOpacity onPress={() => handleBrandClick("COMPLEX","HOODIES")}>
                    <View style={styles.brandContainer}>
                      <View style={styles.brandHeader}>
                        <Image
                          source={require("../images/adidas.png")}
                          style={styles.logo}
                        />
                        <Text style={styles.brand}>HOODIES</Text>
                      </View>
                      <View style={styles.productRow}>
                        <Image
                          source={require("../images/shirt1.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt2.jpg")}
                          style={styles.productImage}
                        />
                        <Image
                          source={require("../images/shirt3.jpg")}
                          style={styles.productImage}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            );
          default:
            return null;
        }
      };

  return renderTabContent();
};

export default TabContent;
