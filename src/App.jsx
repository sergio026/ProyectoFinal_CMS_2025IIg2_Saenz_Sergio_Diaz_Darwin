import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseApp from "./firebase/credenciales";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/credenciales";


import NavBar from "./Components/NavBar/NavBar";
import AdminNavBar from "./Components/MenuAdmin/MenuAdmin";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Panel from "./pages/Panel/Panel";
// import Home from "./Components/Header/Header";
import Noticia from "./Components/Noticia/Noticia";
import HomePublic from "./Components/HomePublic/HomePublic";
import NoticiaDetalle from "./Components/NoticiaDetalle/NoticiaDetalle";

import "./index.css";

const auth = getAuth(firebaseApp);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (usuariofirebase) => {
    if (usuariofirebase) {
      try {
        const docRef = doc(db, "usuarios", usuariofirebase.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser({ ...usuariofirebase, rol: docSnap.data().rol });
        } else {
          setUser({ ...usuariofirebase, rol: "reportero" }); 
        }
      } catch (error) {
        console.error("Error obteniendo rol:", error);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);

const handleLogout = async () => {
  try {
    await signOut(auth);
    setUser(null);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};


  if (loading) return <p style={{ color: "white" }}>Cargando...</p>;

  return (
    <>
      {user ? <AdminNavBar onLogout={handleLogout} /> : <NavBar />}

      <main className="App">
        <Routes>
            {/* Sitio público */}
  <Route path="/" element={<HomePublic />} />
  <Route path="/noticia/:id" element={<NoticiaDetalle />} />

          {/* <Route path="/header" element={<Home />} /> */}
          <Route path="/login"  element={ user ? <Navigate to="/panel" /> : <Login onLogin={(userData) => setUser(userData)} />  }/>
          <Route path="/registrar" element={<Register />} />
          <Route path="/panel" element={user ? <Panel user={user} /> : <Navigate to="/login" />} />
          <Route path="/panel/noticias" element={user ? <Noticia user={user} /> : <Navigate to="/login" />} />
          {/* Redirección temporal */}
  <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
