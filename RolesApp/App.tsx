import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import { AuthProvider } from './src/contexts/AuthContext';
import StackNavigator from './src/navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return(
    <AuthProvider>
      <NavigationContainer>
      <StackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}