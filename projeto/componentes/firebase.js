// componentes/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Faltava isso!
import { getFirestore } from "firebase/firestore"; // Faltava isso!

const firebaseConfig = {
  apiKey: "AIzaSyBcbbupkvRaZ5lVv61bGb7uMw765sWQltw",
  authDomain: "pratica02-df5cf.firebaseapp.com",
  projectId: "pratica02-df5cf",
  storageBucket: "pratica02-df5cf.firebasestorage.app",
  messagingSenderId: "371811902870",
  appId: "1:371811902870:web:dc5ab989708ca281a7e9b7"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// EXPORTAÇÕES OBRIGATÓRIAS PARA O LOGIN E FORMULÁRIO FUNCIONAREM:
export const auth = getAuth(app);
export const db = getFirestore(app);