// src/screens/scroll/ScrollViewScreen.js
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../../componentes/firebase'; // Voltando as pastas para achar o firebase
import { theme } from '../../styles/theme';

export default function ScrollViewScreen() {
  const [alugueis, setAlugueis] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "alugueis"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }));
      setAlugueis(docs);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lista com ScrollView</Text>
      {alugueis.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.carName}>{item.carro}</Text>
          <Text>Cliente: {item.cliente}</Text>
          <Text>Valor: R$ {item.valor}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: theme.colors.background },
  title: { fontSize: 22, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 15, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  carName: { fontSize: 18, fontWeight: 'bold', color: theme.colors.primary }
});