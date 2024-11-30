import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DrawerContent = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
        <Text style={styles.menuItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('TodoList')}>
        <Text style={styles.menuItem}>To-Do List</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Transactions')}>
        <Text style={styles.menuItem}>Transactions</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Settings')}>
        <Text style={styles.menuItem}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('About')}>
        <Text style={styles.menuItem}>About</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8EAED',
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default DrawerContent;
