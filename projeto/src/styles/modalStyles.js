// src/styles/modalStyles.js
import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro e transparente para dar destaque ao modal
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    elevation: 5, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    minWidth: 150,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    color: theme.colors.text,
  }
});