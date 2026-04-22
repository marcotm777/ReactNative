// componentes/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; 
import { theme } from '../src/styles/theme'; 

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Estados do Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccessAction, setIsSuccessAction] = useState(false);

  const showModal = (title, message, isSuccess = false) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsSuccessAction(isSuccess);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    if (isSuccessAction) {
      navigation.navigate('Login');
    }
  };

  const handleRegister = () => {
    if (nome === '' || email === '' || senha === '') {
      showModal('Atenção', 'Por favor, preencha todos os campos!');
      return;
    }

    if (senha.length < 6) {
      showModal('Atenção', 'A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        showModal('Sucesso!', 'Sua conta foi criada com sucesso.', true);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          showModal('Erro', 'Este e-mail já está em uso.');
        } else {
          showModal('Erro no Registro', error.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      
      <TextInput style={styles.input} placeholder="Nome Completo" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Senha (mínimo 6 caracteres)" secureTextEntry={true} value={senha} onChangeText={setSenha} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 20 }}>
        <Text style={{ color: theme.colors.primary, textAlign: 'center', fontSize: 16 }}>
          Já tem uma conta? Entre aqui.
        </Text>
      </TouchableOpacity>

      {/* Componente do Modal Customizado */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={[styles.modalTitle, { color: isSuccessAction ? '#28a745' : theme.colors.primary }]}>
              {modalTitle}
            </Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: theme.colors.background, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 30, textAlign: 'center' },
  input: { backgroundColor: theme.colors.white, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 15, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: theme.colors.primary, padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: theme.colors.white, fontSize: 18, fontWeight: 'bold' },
  
  // Estilos do Modal
  modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { width: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 20, alignItems: 'center', elevation: 5 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  modalMessage: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#333' },
  modalButton: { backgroundColor: theme.colors.primary, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8 },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});