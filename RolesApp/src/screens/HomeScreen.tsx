import React, { useState } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Image,Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';

export default function HomeScreen() {
  const { logout } = useAuth();

  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});

    if (!result.canceled) {
      setFileName(result.assets[0].name);
      setFileUri(result.assets[0].uri);
    }
  };

  const uploadFiles = async () => {
  try {
    setLoading(true);

    if (!image) {
      Alert.alert('Error', 'Seleccione una imagen');
      return;
    }

    const response = await fetch(image);
    const arrayBuffer = await response.arrayBuffer();

    const fileExt = image.split('.').pop() || 'jpg';
    const fileName = `image_${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(fileName, arrayBuffer, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    console.log('DATA:', data);
    console.log('ERROR:', error);

    if (error) {
      throw error;
    }

    Alert.alert('Éxito', 'Imagen subida correctamente');
  } catch (error: any) {
    console.log('ERROR COMPLETO:', error);
    Alert.alert('Error', JSON.stringify(error));
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 200,
            height: 200,
            marginVertical: 20,
            borderRadius: 10,
          }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={pickDocument}>
        <Text style={styles.buttonText}>Seleccionar Archivo</Text>
      </TouchableOpacity>

      {fileName ? (
        <Text style={{ marginTop: 10 }}>
          Archivo: {fileName}
        </Text>
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={uploadFiles}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Subiendo...' : 'Subir al Servicio'}
        </Text>
      </TouchableOpacity>

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
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});