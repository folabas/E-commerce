import React, { useState, useEffect } from 'react';
import { View, FlatList, ScrollView, Text } from 'react-native';
import OrderSummaryCard from './OrderSummaryCard';
import OrderRow from './OrderRow';
import SearchBar from './SearchBar';
import Menu from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [dateRange, setDateRange] = useState('This Week');

  useEffect(() => {
    // Fetch orders from server
    fetchOrders();
  }, [dateRange]); // Update orders when dateRange changes

  const fetchOrders = async () => {
    // Fetch orders based on the selected date range
    const fetchedOrders = await fetch('your-api-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dateRange }), // Send selected date range to the server
    }).then(res => res.json());
    setOrders(fetchedOrders);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <OrderSummaryCard title="Order in Queue" count={2020} increase={6.7} />
            <OrderSummaryCard title="Order in Shipped" count={2020} increase={6.7} />
            <OrderSummaryCard title="Order Delivered" count={2020} increase={6.7} />
            <OrderSummaryCard title="Order Return" count={2020} increase={6.7} />
          </View>
        </ScrollView>
      </View>
      <SearchBar onSearch={setFilter} />
      
      {/* Date Range Picker */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
        <RNPickerSelect
          onValueChange={(value) => setDateRange(value)}
          items={[
            { label: 'This Week', value: 'This Week' },
            { label: 'This Month', value: 'This Month' },
            { label: 'This Year', value: 'This Year' },
          ]}
          value={dateRange}
          style={{
            inputIOS: { color: 'black', fontSize: 16, padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4 },
            inputAndroid: { color: 'black', fontSize: 16, padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4 },
          }}
          useNativeAndroidPickerStyle={false}
        />
      </View>
      
      <FlatList
        data={orders.filter(order => order.name.includes(filter))}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <OrderRow order={item} />}
      />
    </View>
  );
};

export default OrdersPage;
