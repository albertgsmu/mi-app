// Importar las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// ⚙️ Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDBU6OnM2RvNYGwETM9NXwTFtvzZZFFjFU",
  authDomain: "mi-app-a1f48.firebaseapp.com",
  projectId: "mi-app-a1f48",
  storageBucket: "mi-app-a1f48.appspot.com", // ✅ corregido
  messagingSenderId: "552466856051",
  appId: "1:552466856051:web:f65801de3fdd84f13d5206",
  measurementId: "G-JY211TDZGG",
};

// 🚀 Inicializar Firebase
const app = initializeApp(firebaseConfig);

// 📊 Inicializar Analytics (opcional)
const analytics = getAnalytics(app);

// 💾 Conectar Firestore (base de datos)
const db = getFirestore(app);

// ✅ Exportar para usar en toda la app
export { db, analytics };
