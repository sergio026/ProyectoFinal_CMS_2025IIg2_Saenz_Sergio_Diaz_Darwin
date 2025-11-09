import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./Components/NavBar/NavBar";
import AdminNavBar from "./Components/MenuAdmin/MenuAdmin";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Panel/Panel";
import Home from "./Components/Header/Header";
import Noticia from "./Components/Noticia/Noticia";
import Noticias from "./pages/Noticias/Noticias";
import "./index.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "./firebase/credenciales";
const auth = getAuth(firebaseApp);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  
  onAuthStateChanged(auth, (usuariofirebase) => {
    if (usuariofirebase) {
      setUser(usuariofirebase);
    } else {
      setUser(null);
    }
  });         
  return (
    <>
      {isLoggedIn ? <AdminNavBar onLogout={handleLogout} /> : <NavBar />}

      <main className="App">
        <Routes>
          <Route path="/header" element={<Home />} />
          <Route path="/login"  element={  isLoggedIn ? ( <Navigate to="/panel" />) : (<Login onLogin={handleLogin} />) } />
          <Route path="/registrar" element={<Register />} />
          <Route path="/panel"  element={ isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}/>
          {/* <Route path="/panel/noticias" element={<Noticia />} /> */}
          <Route path="/panel/noticias" element={<Noticias />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
