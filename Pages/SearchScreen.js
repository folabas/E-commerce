import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useDebounce } from 'use-debounce'; 
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import sampleProducts from './sampleProducts'; 

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (debouncedQuery) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        const filteredResults = sampleProducts.filter(item =>
          item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
        setResults(filteredResults);
        if (debouncedQuery) {
          setHistory(prev => [...new Set([debouncedQuery, ...prev])]);
        }
      }, 1000);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemPress = (item) => {
    navigation.navigate('ProductDetails', { product: item });
  };

  const renderSearchHistory = () => (
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>Search History</Text>
      {history.length === 0 ? (
        <Text style={styles.noHistory}>No search history available.</Text>
      ) : (
        history.map((item, index) => (
          <TouchableOpacity key={index} style={styles.historyItem} onPress={() => setQuery(item)}>
            <Text style={styles.historyText}>{item}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for products..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        accessibilityLabel="Search bar"
        accessibilityHint="Enter text to search for products"
      />
      {loading && <ActivityIndicator size="large" color="#000" />}
      
      {debouncedQuery && results.length === 0 && !loading && (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResults}>No results found.</Text>
          {renderSearchHistory()}
        </View>
      )}

      {debouncedQuery && results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
          ListFooterComponent={renderSearchHistory()}
        />
      )}
      
      {!debouncedQuery && !loading && renderSearchHistory()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    marginTop: 10,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  searchInput: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    fontSize: 16,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#777',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResults: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  historyContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  historyItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  historyText: {
    fontSize: 14,
    color: '#555',
  },
  noHistory: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
});

export default SearchScreen;
