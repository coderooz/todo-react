import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Pressable, TextInput, StyleSheet, Text, View, Keyboard, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from '../components/Task';

const STORAGE_KEY = '@tasks';

export default function TodoList() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setTaskItems(JSON.parse(jsonValue));
      }
    };

    loadTasks();
  }, []);

  const handleTasks = async () => {
    Keyboard.dismiss();
    if (task) {
      const newTasks = [...taskItems, { text: task, completed: false, time: new Date().toLocaleString() }];
      setTaskItems(newTasks);
      setTask('');
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    }
  };

  const completeTask = async (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].completed = true; // Mark as completed
    setTaskItems(itemsCopy);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(itemsCopy));
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
                <Task text={item.text} keyValue={index + 1} completed={item.completed} />
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
  // Rest of your styles remain the same...
});
