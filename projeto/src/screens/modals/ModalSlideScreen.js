import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { modalStyles } from '../../styles/modalStyles';

export default function ModalSlideScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Comportamento: Slide</Text>
      
      <TouchableOpacity style={modalStyles.button} onPress={() => setModalVisible(true)}>
        <Text style={modalStyles.buttonText}>Abrir Modal</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalText}>Este modal apareceu deslizando de baixo para cima!</Text>
            <TouchableOpacity style={modalStyles.button} onPress={() => setModalVisible(false)}>
              <Text style={modalStyles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}