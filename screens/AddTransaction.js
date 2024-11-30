import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

const AddTransaction = ({ modalVisible, setModalVisible, addTransaction }) => {
  const [type, setType] = useState('income');
  const [account, setAccount] = useState('Cash');
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddTransaction = () => {
    const transaction = {
      type,
      account,
      note,
      amount: parseFloat(amount),
    };
    addTransaction(transaction);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Add Transaction</Text>
        
        <Picker selectedValue={type} onValueChange={(itemValue) => setType(itemValue)}>
          <Picker.Item label="Income" value="income" />
          <Picker.Item label="Expense" value="expense" />
          <Picker.Item label="Transfer" value="transfer" />
        </Picker>

        <Picker selectedValue={account} onValueChange={(itemValue) => setAccount(itemValue)}>
          <Picker.Item label="Cash" value="Cash" />
          {/* You can add more accounts dynamically here */}
        </Picker>

        <TextInput
          placeholder="Note"
          value={note}
          onChangeText={setNote}
          style={styles.input}
        />
        
        <TextInput
          placeholder="Amount"
          value={amount}
          keyboardType="numeric"
          onChangeText={setAmount}
          style={styles.input}
        />

        <Button title="Add" onPress={handleAddTransaction} />
        <Button title="Cancel" onPress={() => setModalVisible(false)} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#E8EAED',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
});

export default AddTransaction;
