import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const OrderSummaryCard = ({ title, count, increase }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.increase}>{increase}% Increase</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    margin: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  count: {
    fontSize: 22,
    marginTop: 8,
    textAlign: 'center',
  },
  increase: {
    fontSize: 13,
    color: 'green',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default OrderSummaryCard;
