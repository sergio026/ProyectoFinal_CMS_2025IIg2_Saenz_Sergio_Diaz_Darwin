// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login/Login";
// import Register from "./pages/Register/Register";
// import Menu from "./Components/NavBar/NavBar";
// import "./index.css";

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="App">
//         <Menu />
//         <main>
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/registrar" element={<Register />} />
//           </Routes>
//         </main>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;



import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./Components/NavBar/NavBar";
import AdminNavBar from "./Components/MenuAdmin/MenuAdmin";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Panel/Panel";
import Home from "./Components/Header/Header";
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
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/registrar" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
