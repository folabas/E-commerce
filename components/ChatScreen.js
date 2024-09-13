import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.37.32:5000/api/messages';

const ChatScreen = ({ route, navigation }) => {
  console.log(route.params); // Debugging line

  // Destructure parameters with fallback values
  const { productId, sellerId } = route.params || {};

  const [userId, setUserId] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch userId from AsyncStorage
  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          console.error('User ID not found');
        }
      } catch (error) {
        console.error('Error retrieving userId:', error);
      }
    };
    getUserId();
  }, []);

  // Fetch messages once userId and productId are available
  useEffect(() => {
    const fetchMessages = async () => {
      if (userId && productId) {
        try {
          const response = await fetch(`${API_URL}/${productId}/${userId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };
    fetchMessages();
  }, [userId, productId]);

  const handleSend = async () => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: userId,
          receiverId: sellerId,
          productId,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newMessage = await response.json();
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.message}>
      <Text>{item.senderId === userId ? 'You' : 'Seller'}: {item.message}</Text>
    </View>
  );

  // Display error if parameters are missing
  if (!productId || !userId || !sellerId) {
    return (
      <View style={styles.container}>
        <Text>Error: Missing parameters</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  message: {
    marginVertical: 5,
  },
});

export default ChatScreen;
