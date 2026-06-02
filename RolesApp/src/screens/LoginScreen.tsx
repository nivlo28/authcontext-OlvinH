import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import React from 'react';

export default function LoginScreen() {

  const [role, setRole] = useState<'admin' | 'common'>('common');

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Seleccione un rol
      </Text>

     <TouchableOpacity
      style={[
      styles.button,
      role === 'admin' ? styles.selectedButton : {} ]}
      onPress={() => setRole('admin')}
      >
        <Text
          style={role === 'admin' ? styles.selectedText : {}}>
          Admin
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          role === 'common' ? styles.selectedButton : {}
        ]}
        onPress={() => setRole('common')}
      >
        <Text
          style={role === 'common' ? styles.selectedText : {}}>
          Common
        </Text>
      </TouchableOpacity>

      <Text style={styles.selected}>
        Rol seleccionado: {role}
      </Text>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>
          Ingresar
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  button: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },

  selected: {
    textAlign: 'center',
    marginVertical: 20,
  },

  loginButton: {
    backgroundColor: '#595382',
    padding: 15,
    borderRadius: 8,
  },

  loginText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  selectedButton: {
    backgroundColor: '#0d323e',
    borderColor: '#a9e0f2',
  },

  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});