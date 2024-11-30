import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Pressable, TextInput, StyleSheet, Text, View, Keyboard, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure AsyncStorage is imported
import Task from './components/Task'; // Ensure this component is compatible with web

const STORAGE_KEY = '@tasks'; // Define a storage key for AsyncStorage

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          setTaskItems(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Failed to load tasks', e);
      }
    };

    loadTasks();
  }, []);

  const handleTasks = async () => {
    Keyboard.dismiss();
    if (task) {
      const newTasks = [...taskItems, task];
      setTaskItems(newTasks);
      setTask('');
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks)); // Save tasks
    }
  };

  const completeTask = async (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(itemsCopy)); // Update tasks
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>
          Tasks List ({taskItems.length} {taskItems.length === 1 ? 'task' : 'tasks'} left)
        </Text>
        <View style={styles.items}>
          {taskItems.length === 0 ? (
            <Text style={styles.noTasksText}>No tasks saved</Text>
          ) : (
            taskItems.map((item, index) => (
              <Pressable key={index} onPress={() => completeTask(index)}>
                <Task text={item} keyValue={index + 1} />
              </Pressable>
            ))
          )}
        </View>
      </View>

      <View style={styles.writerWrapper}>
        <TextInput
          placeholder='Enter Task...'
          style={styles.input}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <Pressable onPress={handleTasks}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
    flex: 1,
  },
  noTasksText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  writerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#C0C0C0',
    backgroundColor: '#fff',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: '70%',
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});

// import React from 'react';
// // import { View, Text, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from './screens/Home';
// import TodoList from './screens/TodoList';
// import Transactions from './screens/Transactions';
// import Settings from './screens/Settings';
// import About from './screens/About';
// import { DrawerContent } from './components/SideMenu';

// const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
//         <Drawer.Screen name="Home" component={Home} />
//         <Drawer.Screen name="TodoList" component={TodoList} />
//         <Drawer.Screen name="Transactions" component={Transactions} />
//         <Drawer.Screen name="Settings" component={Settings} />
//         <Drawer.Screen name="About" component={About} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }
