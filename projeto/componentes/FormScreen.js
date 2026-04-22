// componentes/FormScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; 
import { theme } from '../src/styles/theme'; 

export default function FormScreen() {
  const [carro, setCarro] = useState('');
  const [cliente, setCliente] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');

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
      // Limpa os campos após fechar o modal de sucesso
      setCarro(''); setCliente(''); setValor(''); setData('');
    }
  };

  const handleSave = async () => {
    if (!carro || !cliente || !valor || !data) {
      showModal('Atenção', 'Por favor, preencha todos os campos do aluguel!');
      return;
    }

    try {
      await addDoc(collection(db, "alugueis"), {
        carro,
        cliente,
        valor: parseFloat(valor),
        data,
        createdAt: new Date()
      });
      
      showModal('Registrado!', 'O aluguel do carro foi salvo no banco de dados com sucesso.', true);
      
    } catch (e) {
      showModal('Erro ao Salvar', 'Não foi possível registrar o aluguel: ' + e.message);
      console.error("Erro detalhado: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Aluguel de Carro</Text>
      
      <TextInput style={styles.input} placeholder="Modelo do Carro" value={carro} onChangeText={setCarro} />
      <TextInput style={styles.input} placeholder="Nome do Cliente" value={cliente} onChangeText={setCliente} />
      <TextInput style={styles.input} placeholder="Valor do Aluguel (Ex: 150.00)" keyboardType="numeric" value={valor} onChangeText={setValor} />
      <TextInput style={styles.input} placeholder="Data (DD/MM/AAAA)" value={data} onChangeText={setData} />
      
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Registrar Aluguel</Text>
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
  container: { flex: 1, padding: 20, backgroundColor: theme.colors.background },
  title: { fontSize: 24, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 20, textAlign: 'center', marginTop: 20 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ccc', fontSize: 16 },
  button: { backgroundColor: theme.colors.primary, padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  
  // Estilos do Modal
  modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { width: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 20, alignItems: 'center', elevation: 5 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  modalMessage: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#333' },
  modalButton: { backgroundColor: theme.colors.primary, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8 },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});