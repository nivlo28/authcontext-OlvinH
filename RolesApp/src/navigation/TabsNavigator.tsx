import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useAuth} from '../contexts/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
    const {role} = useAuth();

    return (
         <Tab.Navigator initialRouteName={role === 'admin' ? 'Settings' : 'Home'}>
      <Tab.Screen name="Home" component={HomeScreen} />

      {role === 'admin' && (
        <Tab.Screen name="Settings" component={SettingsScreen} />
      )}
    </Tab.Navigator>
  );
}