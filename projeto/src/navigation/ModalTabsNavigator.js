import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '../styles/theme';

// Importando as telas que acabamos de criar
import ModalSlideScreen from '../screens/modals/ModalSlideScreen';
import ModalFadeScreen from '../screens/modals/ModalFadeScreen';
import ModalNoneScreen from '../screens/modals/ModalNoneScreen';

const Tab = createBottomTabNavigator();

export default function ModalTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Esconde o cabeçalho padrão de cada aba
        tabBarActiveTintColor: theme.colors.secondary, // Usa o laranja do seu tema quando ativo
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingBottom: 5, height: 60 },
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' }
      }}
    >
      <Tab.Screen name="Slide" component={ModalSlideScreen} />
      <Tab.Screen name="Fade" component={ModalFadeScreen} />
      <Tab.Screen name="None" component={ModalNoneScreen} />
    </Tab.Navigator>
  );
}