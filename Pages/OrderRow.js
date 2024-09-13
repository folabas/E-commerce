// Pages/OrderRow.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const OrderRow = ({ order }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.cell}>{order.id}</Text>
      <Text style={styles.cell}>{order.details}</Text>
      <Text style={styles.cell}>{order.category}</Text>
      <Text style={styles.cell}>{order.clientName}</Text>
      <Text style={styles.cell}>{order.clientEmail}</Text>
      <Text style={styles.cell}>{order.date}</Text>
      <Text style={styles.cell}>{order.price}</Text>
      <Text style={styles.cell}>{order.status}</Text>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionText}>View</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cell: {
    flex: 1,
    padding: 5,
  },
  actionButton: {
    padding: 5,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  actionText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default OrderRow;
