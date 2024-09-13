import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds user data or null if not logged in

  // Load user data from AsyncStorage when the context initializes
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    };

    loadUserFromStorage();
  }, []);

  // Save user data to AsyncStorage whenever it changes
  const saveUserToStorage = async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  useEffect(() => {
    if (user) {
      saveUserToStorage(user);
    }
  }, [user]);

  const login = async (credentials) => {
    // Implement login logic here
    // On success:
    const loggedInUser = {}; // Replace with actual user data
    setUser(loggedInUser);
  };

  const logout = async () => {
    // Implement logout logic here
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
