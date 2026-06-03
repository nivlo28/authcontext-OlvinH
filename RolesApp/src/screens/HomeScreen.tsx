import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen() {
    const {logout} = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>"Home"</Text>
            <TouchableOpacity style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    },
    button: {
    backgroundColor: '#595382',
    padding: 15,
    borderRadius: 8,
    },
    buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    },
});