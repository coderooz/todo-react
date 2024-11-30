Creating a utility app that combines a to-do list and finance tracking functionality using React and Expo is an exciting project! Here's a step-by-step guide to help you develop this app.

### Step 1: Set Up Your Development Environment

1. **Install Node.js**: Make sure you have Node.js installed on your machine. You can download it from [Node.js official site](https://nodejs.org/).

2. **Install Expo CLI**: Open your terminal and run:
   ```bash
   npm install -g expo-cli
   ```

3. **Create a New Expo Project**:
   ```bash
   expo init UtilityApp
   cd UtilityApp
   ```

4. **Choose a Template**: Select a blank template for simplicity.

### Step 2: Install Required Libraries

You'll need some libraries to handle data management, charting, and file exporting:

```bash
npm install react-native-paper axios xlsx file-saver
```

- **react-native-paper**: For UI components.
- **axios**: For data fetching (if needed).
- **xlsx**: For Excel file operations.
- **file-saver**: To handle file downloads.

### Step 3: Create App Structure

1. **Create Folders**:
   - Inside the `UtilityApp` folder, create `components`, `screens`, and `services` directories.

2. **Set Up Navigation**:
   Install React Navigation:
   ```bash
   npm install @react-navigation/native @react-navigation/native-stack
   npm install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
   ```

3. **Configure Navigation**: Edit `App.js` to set up navigation.

   ```javascript
   import React from 'react';
   import { NavigationContainer } from '@react-navigation/native';
   import { createNativeStackNavigator } from '@react-navigation/native-stack';
   import ToDoScreen from './screens/ToDoScreen';
   import FinanceScreen from './screens/FinanceScreen';

   const Stack = createNativeStackNavigator();

   export default function App() {
     return (
       <NavigationContainer>
         <Stack.Navigator initialRouteName="ToDo">
           <Stack.Screen name="ToDo" component={ToDoScreen} />
           <Stack.Screen name="Finance" component={FinanceScreen} />
         </Stack.Navigator>
       </NavigationContainer>
     );
   }
   ```

### Step 4: Create To-Do List Functionality

1. **ToDoScreen Component**: Create `ToDoScreen.js` in `screens`.

   ```javascript
   import React, { useState } from 'react';
   import { View, TextInput, Button, FlatList, Text } from 'react-native';

   const ToDoScreen = () => {
     const [task, setTask] = useState('');
     const [tasks, setTasks] = useState([]);

     const addTask = () => {
       if (task) {
         setTasks([...tasks, task]);
         setTask('');
       }
     };

     return (
       <View>
         <TextInput
           placeholder="Add a task"
           value={task}
           onChangeText={setTask}
         />
         <Button title="Add Task" onPress={addTask} />
         <FlatList
           data={tasks}
           renderItem={({ item }) => <Text>{item}</Text>}
           keyExtractor={(item, index) => index.toString()}
         />
       </View>
     );
   };

   export default ToDoScreen;
   ```

### Step 5: Create Finance Tracking Functionality

1. **FinanceScreen Component**: Create `FinanceScreen.js` in `screens`.

   ```javascript
   import React, { useState } from 'react';
   import { View, TextInput, Button, FlatList, Text } from 'react-native';

   const FinanceScreen = () => {
     const [expense, setExpense] = useState('');
     const [amount, setAmount] = useState('');
     const [finances, setFinances] = useState([]);

     const addFinance = () => {
       if (expense && amount) {
         setFinances([...finances, { expense, amount }]);
         setExpense('');
         setAmount('');
       }
     };

     return (
       <View>
         <TextInput
           placeholder="Expense"
           value={expense}
           onChangeText={setExpense}
         />
         <TextInput
           placeholder="Amount"
           value={amount}
           onChangeText={setAmount}
           keyboardType="numeric"
         />
         <Button title="Add Expense" onPress={addFinance} />
         <FlatList
           data={finances}
           renderItem={({ item }) => (
             <Text>{item.expense}: ${item.amount}</Text>
           )}
           keyExtractor={(item, index) => index.toString()}
         />
       </View>
     );
   };

   export default FinanceScreen;
   ```

### Step 6: Implement Data Importing/Exporting

1. **Add Import/Export Functions**:
   - In both screens, create functions to import/export data.

   ```javascript
   // In FinanceScreen.js
   const exportData = () => {
     const ws = XLSX.utils.json_to_sheet(finances);
     const wb = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Finances');
     XLSX.writeFile(wb, 'finances.xlsx');
   };

   const importData = async () => {
     // Use FileSystem to read a file and parse it using XLSX
   };
   ```

2. **UI Buttons**: Add buttons to trigger these functions.

### Step 7: Styling the App

1. **Use React Native Paper**: Utilize Material Design components from `react-native-paper` to modernize the UI.

   ```javascript
   import { Provider as PaperProvider, Button, TextInput } from 'react-native-paper';

   return (
     <PaperProvider>
       <TextInput label="Add a task" ... />
       <Button mode="contained" onPress={addTask}>Add Task</Button>
       ...
     </PaperProvider>
   );
   ```

### Step 8: Testing

1. **Test the App**: Use the Expo Go app to test your application on physical devices or simulators.

2. **Debugging**: Use the React Developer Tools and console logs to debug any issues.

### Step 9: Final Touches

1. **Add Navigation Links**: Add buttons to navigate between the To-Do and Finance screens.

2. **Handle Data Persistence**: Consider using AsyncStorage or a database (like SQLite) for data persistence.

3. **Deployment**: Once satisfied, use Expo’s build service to create a production-ready version of your app.

### Conclusion

This guide gives you a solid foundation for building a utility app with to-do and finance tracking features. As you implement each step, feel free to customize and expand upon the functionality to suit your needs! Happy coding!