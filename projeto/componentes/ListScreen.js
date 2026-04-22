// componentes/ListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { theme } from '../src/styles/theme';

export default function ListScreen() {
  const [alugueis, setAlugueis] = useState([]);

  useEffect(() => {
    // Consulta em tempo real ao Firestore ordenando pelo mais recente
    const q = query(collection(db, "alugueis"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setAlugueis(docs);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alugueres Registados</Text>
      <FlatList
        data={alugueis}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.carName}>{item.carro}</Text>
            <Text>Cliente: {item.cliente}</Text>
            <Text>Valor: R$ {item.valor}</Text>
            <Text>Data: {item.data}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: theme.colors.background },
  title: { fontSize: 24, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 3 },
  carName: { fontSize: 18, fontWeight: 'bold', color: theme.colors.primary }
});