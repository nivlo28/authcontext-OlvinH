import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  return(
    <AuthProvider>
      <LoginScreen />
    </AuthProvider>
  );
}