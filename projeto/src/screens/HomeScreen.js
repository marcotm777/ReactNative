import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/globalStyles';
import { theme } from '../styles/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={[globalStyles.container, globalStyles.center]}>
      <Text style={globalStyles.title}>Bem-vindo ao aplicativo!</Text>
      <View style={styles.card}>
        <Text style={globalStyles.text}>
          Utilize o menu lateral (Gaveta) para acessar as demonstrações de 
          <Text style={{fontWeight: 'bold'}}> Modais</Text> e 
          <Text style={{fontWeight: 'bold'}}> Listas com Rolagem</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.l,
    borderRadius: theme.borderRadius,
    elevation: 3, // Sombra para Android
    marginTop: theme.spacing.m,
  }
});