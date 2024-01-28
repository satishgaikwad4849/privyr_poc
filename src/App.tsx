import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import AccountComponent from './Components/Screens/Account/AccountScreen';
import ActivitiesComponent from './Components/Screens/ActivitiesScreen';
import ClientsComponent from './Components/Screens/Clients/ClientsScreen';
import ContentComponent from './Components/Screens/ContentScreen';
import FollowUpsComponent from './Components/Screens/FollowUpsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
     screenOptions={{
      tabBarLabelStyle: { fontSize: 12, margin: 0, padding: 0 },
      tabBarItemStyle: { width: 100, paddingVertical: 0 },
      tabBarStyle: { height: 80,paddingBottom: 28,paddingVertical:10 },
    }}
      >
        <Tab.Screen name="Clients" component={ClientsComponent} options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="users" size={size} color={color} />
        ),
      }}/>
        <Tab.Screen name="Content" component={ContentComponent} options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="newspaper" size={size} color={color}  />
        ),
      }}/>
        <Tab.Screen name="Activities" component={ActivitiesComponent} options={{
          tabBarLabel: 'Activities',
          tabBarIcon: ({ color, size }) => (
            <Icon name="chart-bar" size={size} color={color} />
          ),
        }}/>
        <Tab.Screen name="FollowUps" component={FollowUpsComponent} options={{
          tabBarLabel: 'FollowUps',
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" size={size} color={color} />
          ),
          tabBarBadge: 3,
        }} />
        <Tab.Screen name="Account" component={AccountComponent} options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
