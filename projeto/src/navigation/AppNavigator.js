// src/navigation/AppNavigator.js
import React from 'react';
// Importamos a função que cria a navegação em formato de gaveta (menu lateral)
import { createDrawerNavigator } from '@react-navigation/drawer';

// Importamos as telas e navegadores que já criamos
import HomeScreen from '../screens/HomeScreen';
import ModalTabsNavigator from './ModalTabsNavigator';
// Em breve, criaremos e importaremos o ScrollTabsNavigator para as listas:
// import ScrollTabsNavigator from './ScrollTabsNavigator';

// Importamos o nosso tema para manter as cores padronizadas
import { theme } from '../styles/theme';

// Instanciamos o criador da gaveta
const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    // O Drawer.Navigator é o contêiner principal do menu lateral
    <Drawer.Navigator
      screenOptions={{
        // Estilização do cabeçalho superior (onde fica o botão de abrir a gaveta)
        headerStyle: {
          backgroundColor: theme.colors.primary, // Usa o Azul UNIPAM do nosso tema
        },
        headerTintColor: theme.colors.white, // Deixa o título e o ícone do menu brancos
        
        // Estilização dos itens dentro da gaveta
        drawerActiveTintColor: theme.colors.primary, // Cor do texto quando o item está selecionado
        drawerInactiveTintColor: theme.colors.gray, // Cor do texto quando não está selecionado
      }}
    >
      {/* 1ª OPÇÃO DA GAVETA: Tela Inicial */}
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Início' }} 
      />

      {/* 2ª OPÇÃO DA GAVETA: Navegação de Modais (Aqui conectamos com as Abas!) */}
      <Drawer.Screen 
        name="Modais" 
        component={ModalTabsNavigator} 
        options={{ title: 'Exemplos de Modais' }} 
      />

      {/* 3ª OPÇÃO DA GAVETA: Navegação de Listas */}
      {/* Vou deixar comentado por enquanto, até criarmos o arquivo ScrollTabsNavigator */}
      {/* <Drawer.Screen 
        name="Listas" 
        component={ScrollTabsNavigator} 
        options={{ title: 'Listas com Rolagem' }} 
      /> 
      */}
    </Drawer.Navigator>
  );
}