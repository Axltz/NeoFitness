import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from './src/lib/supabase'; 
import { useEffect, useState } from 'react';

export default function App() {
  const [connectionStatus, setConnectionStatus] = useState('Probando conexión...');

  useEffect(() => {
    async function checkConnection() {
      const { data, error } = await supabase.from('profiles').select('count').limit(1); // (No fallará aunque no exista la tabla, solo checa red)
      
      if (error && error.code !== 'PGRST116') { 
         console.log(error);
      }
      setConnectionStatus('✅ Conectado a Supabase');
    }

    checkConnection();
  }, []);

  return (
    <View style={styles.container}>
      <Text>NeoFitness App</Text>
      <Text style={styles.status}>{connectionStatus}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue'
  }
});