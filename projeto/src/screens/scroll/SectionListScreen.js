// src/screens/scroll/SectionListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../../componentes/firebase';
import { theme } from '../../styles/theme';

export default function SectionListScreen() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "alugueis"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // Agrupa os aluguéis pela data
      const groupedData = {};
      querySnapshot.forEach((doc) => {
        const item = { id: doc.id, ...doc.data() };
        const dataKey = item.data || 'Sem data';
        
        if (!groupedData[dataKey]) {
          groupedData[dataKey] = [];
        }
        groupedData[dataKey].push(item);
      });

      // Transforma o objeto agrupado no formato exigido pelo SectionList
      const formattedSections = Object.keys(groupedData).map(date => ({
        title: `Data do Aluguel: ${date}`,
        data: groupedData[date]
      }));

      setSections(formattedSections);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista com SectionList (Agrupada)</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.carName}>{item.carro}</Text>
            <Text>Cliente: {item.cliente} | Valor: R$ {item.valor}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: theme.colors.background },
  title: { fontSize: 22, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 15, textAlign: 'center' },
  header: { fontSize: 16, fontWeight: 'bold', backgroundColor: '#eee', padding: 5, marginTop: 10, borderRadius: 5 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 5, marginTop: 5, elevation: 1 },
  carName: { fontSize: 18, fontWeight: 'bold', color: theme.colors.primary }
});