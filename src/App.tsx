// ... (other imports)

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AccountComponent from './Components/Screens/Account/AccountScreen';
import ActivitiesComponent from './Components/Screens/ActivitiesScreen';
import ClientsComponent from './Components/Screens/Clients/ClientsScreen';
import ContentComponent from './Components/Screens/ContentScreen';
import FollowUpsComponent from './Components/Screens/FollowUpsScreen';
import ClientDetailsStackScreen from './Components/Screens/Clients/clientDetails';
import ClientEditStackScreen from './Components/Screens/Clients/editDetails'
import { PaperProvider } from 'react-native-paper';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Clients"
        component={ClientsComponent}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="users" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Content"
        component={ContentComponent}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="newspaper" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Activities"
        component={ActivitiesComponent}
        options={{
          tabBarLabel: 'Activities',
          tabBarIcon: ({ color, size }) => (
            <Icon name="chart-bar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FollowUps"
        component={FollowUpsComponent}
        options={{
          tabBarLabel: 'FollowUps',
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" size={size} color={color} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountComponent}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StackClientDetails"
          component={ClientDetailsStackScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StackClientEdit"
          component={ClientEditStackScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
