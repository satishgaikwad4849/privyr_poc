import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ClientsStackScreenComponent = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Stack Screen Component</Text>
      {/* Add your screen content here */}
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
});

const Stack = createNativeStackNavigator();

// Define the stack navigator
const ClientDetailsStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StackScreenName"
        component={ClientsStackScreenComponent}
        options={{ headerShown: false }}
      />
      {/* Add more screens to the stack if needed */}
    </Stack.Navigator>
  );
};

export default ClientDetailsStackScreen;
