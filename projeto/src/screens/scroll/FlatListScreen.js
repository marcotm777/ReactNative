// src/screens/scroll/FlatListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../../componentes/firebase';
import { theme } from '../../styles/theme';

export default function FlatListScreen() {
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

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.carName}>{item.carro}</Text>
      <Text>Cliente: {item.cliente}</Text>
      <Text>Valor: R$ {item.valor}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista com FlatList</Text>
      <FlatList
        data={alugueis}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: theme.colors.background },
  title: { fontSize: 22, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 15, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  carName: { fontSize: 18, fontWeight: 'bold', color: theme.colors.primary }
});