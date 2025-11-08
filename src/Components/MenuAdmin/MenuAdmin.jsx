import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MenuAdmin.css";

const MenuAdmin = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <Link to="/dashboard" className="admin-logo">
          CMS<span>Panel</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span className="hamburger"></span>
        </button>

        
          <ul className={`admin-nav-links ${menuOpen ? "active" : ""}`}>
            <li>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                🏠 Inicio
              </Link>
            </li>
            <li>
              <Link to="/dashboard/noticias" onClick={() => setMenuOpen(false)}>
                📰 Noticias
              </Link>
            </li>
            <li>
              <Link to="/dashboard/usuarios" onClick={() => setMenuOpen(false)}>
                👥 Usuarios
              </Link>
            </li>
            <li>
              <Link to="/dashboard/config" onClick={() => setMenuOpen(false)}>
                ⚙️ Configuración
              </Link>
            </li>
            <li>
              <button className="logout-btn" onClick={onLogout}>
                🚪 Salir
              </button>
            </li>
          </ul>
        </div>
    </nav>
  );
};

export default MenuAdmin;
