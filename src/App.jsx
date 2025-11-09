// import React, { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import NavBar from "./Components/NavBar/NavBar";
// import AdminNavBar from "./Components/MenuAdmin/MenuAdmin";
// import Login from "./pages/Login/Login";
// import Register from "./pages/Register/Register";
// import Dashboard from "./pages/Panel/Panel";
// import Home from "./Components/Header/Header";
// import Noticia from "./Components/Noticia/Noticia";
// import Noticias from "./pages/Noticias/Noticias";
// import "./index.css";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import firebaseApp from "./firebase/credenciales";
// const auth = getAuth(firebaseApp);

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   const handleLogin = () => setIsLoggedIn(true);
//   const handleLogout = () => setIsLoggedIn(false);

//   onAuthStateChanged(auth, (usuariofirebase) => {
//     if (usuariofirebase) {
//       setUser(usuariofirebase);
//     } else {
//       setUser(null);
//     }
//   });
//   return (
//     <>
//       {isLoggedIn ? <AdminNavBar  onLogout={handleLogout} /> : <NavBar />}

//       <main className="App">
//         <Routes>
//           <Route path="/header" element={<Home />} />
//           <Route path="/login"  element={  isLoggedIn ? ( <Navigate to="/panel" />) : (<Login onLogin={handleLogin} />) } />
//           <Route path="/registrar" element={<Register />} />
//           <Route path="/panel"  element={ isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}/>
//           {/* <Route path="/panel/noticias" element={<Noticia />} /> */}
//           <Route path="/panel/noticias" element={<Noticias />} />
//         </Routes>
//       </main>
//     </>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseApp from "./firebase/credenciales";

import NavBar from "./Components/NavBar/NavBar";
import AdminNavBar from "./Components/MenuAdmin/MenuAdmin";
import Login from "./pages/Login/Login";
import PanelGestion from "./Components/PanelGestion/PanelGestion";
import Register from "./pages/Register/Register";
import Panel from "./pages/Panel/Panel";
import Home from "./Components/Header/Header";
import Noticia from "./Components/Noticia/Noticia";
import "./index.css";

const auth = getAuth(firebaseApp);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Detectar usuario autenticado una sola vez
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      setUser(usuarioFirebase || null);
      setLoading(false);
    });
    return () => unsubscribe(); // limpiar el listener
  }, []);

  // 🔹 Cerrar sesión
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (loading) return <p style={{ color: "white" }}>Cargando...</p>;

  return (
    <>
      {user ? <AdminNavBar onLogout={handleLogout} /> : <NavBar />}

      <main className="App">
        <Routes>
          <Route path="/header" element={<Home />} />

          <Route
            path="/login"
            element={
              user ? <Navigate to="/panel" /> : <Login onLogin={() => {}} />
            }
          />

          <Route path="/registrar" element={<Register />} />

        
          <Route
            path="/panel"
            element={user ? <Panel /> : <Navigate to="/login" />}
          />

          <Route
            path="/panel/noticias"
            element={user ? <Noticia /> : <Navigate to="/login" />}
          />
        </Routes>
        {/* <Route
          path="/panel"
          element={isLoggedIn ? <PanelGestion /> : <Navigate to="/login" />}
        /> */}
      </main>
    </>
  );
}

export default App;
