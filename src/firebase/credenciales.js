// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyBpasINyvT2tlOQMjZSgkwZnzyqxGeI82Q",
  authDomain: "proyecto-final-cms-2025iig2.firebaseapp.com",
  projectId: "proyecto-final-cms-2025iig2",
  storageBucket: "proyecto-final-cms-2025iig2.firebasestorage.app",
  messagingSenderId: "104228391005",
  appId: "1:104228391005:web:ae20a06d96e5053ee9e5b4",
  measurementId: "G-NEP2V5B424"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
