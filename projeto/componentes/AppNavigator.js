// componentes/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import FormScreen from './FormScreen';
import ListScreen from './ListScreen';

// Telas da prática anterior
import HomeScreen from '../src/screens/HomeScreen';
import ModalTabsNavigator from '../src/navigation/ModalTabsNavigator';
import ScrollTabsNavigator from '../src/navigation/ScrollTabsNavigator';

import { theme } from '../src/styles/theme';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Menu Lateral (Drawer) com as telas de aluguer integradas
function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: '#fff',
        drawerActiveTintColor: theme.colors.primary,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Drawer.Screen name="Cadastrar Aluguel" component={FormScreen} />
      <Drawer.Screen name="Modais " component={ModalTabsNavigator} />
      <Drawer.Screen name="Listas " component={ScrollTabsNavigator} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={MainDrawer} />
    </Stack.Navigator>
  );
}