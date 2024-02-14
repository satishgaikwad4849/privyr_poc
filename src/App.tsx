// ... (other imports)

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AccountComponent from './Components/Screens/Account/AccountScreen';
import ActivitiesComponent from './Components/Screens/ActivitiesScreen';
import LeadsComponent from './Components/Screens/Lead/LeadsScreen';
import ContentComponent from './Components/Screens/ContentScreen';
import FollowUpsComponent from './Components/Screens/FollowUpsScreen';
import LeadsDetailsStackScreen from './Components/Screens/Lead/leadDetails';
import LeadsEditStackScreen from './Components/Screens/Lead/editDetails';
import messaging from '@react-native-firebase/messaging';
import LeadsAddStackScreen from './Components/Screens/Lead/leadAddDetails';

import { PaperProvider } from 'react-native-paper';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }


  const getFirebaseToken = async () => {
    const firebaseToken = await messaging().getToken();
    console.log(firebaseToken, "firebase tokeeen")
  }


  useEffect(() => {
    requestUserPermission();
    getFirebaseToken();
  })

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Leads"
        component={LeadsComponent}
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
            name="StackLeadDetails"
            component={LeadsDetailsStackScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StackLeadEdit"
            component={LeadsEditStackScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StackLeadAdd"
            component={LeadsAddStackScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
