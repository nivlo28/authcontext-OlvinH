import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import TabsNavigator from './TabsNavigator';

console.log('TabsNvigator:', TabsNavigator);
console.log('type:', typeof TabsNavigator);
const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    const {isAuthenticated} = useAuth();

    return (
         <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Tabs" component={TabsNavigator} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}