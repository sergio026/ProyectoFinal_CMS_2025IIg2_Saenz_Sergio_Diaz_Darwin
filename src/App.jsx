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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <>
      {isLoggedIn ? <AdminNavBar onLogout={handleLogout} /> : <NavBar />}

      <main className="App">
        <Routes>
          <Route path="/header" element={<Home />} />
          <Route path="/login" element={  isLoggedIn ? (<Navigate to="/panel" />) : (  <Login onLogin={handleLogin} /> )} />
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
