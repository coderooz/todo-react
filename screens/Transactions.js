import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddTransaction from './AddTransaction';

const STORAGE_KEY = '@transactions';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadTransactions = async () => {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setTransactions(JSON.parse(jsonValue));
      }
    };

    loadTransactions();
  }, []);

  const addTransaction = async (transaction) => {
    const newTransactions = [...transactions, transaction];
    setTransactions(newTransactions);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTransactions));
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text>{item.type} - {item.note} - ${item.amount}</Text>
          </View>
        )}
      />
      <Button title="Add Transaction" onPress={() => setModalVisible(true)} />
      {modalVisible && (
        <AddTransaction
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          addTransaction={addTransaction}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8EAED',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  transactionItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
});
