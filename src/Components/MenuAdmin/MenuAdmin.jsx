import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MenuAdmin.css";

const MenuAdmin = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <Link to="/panel" className="admin-logo">
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
              <Link to="/login"className="btn btn-outline-primary custom-btn" onClick={onLogout}>
              ✖ Salir
              </Link>
            </li>            
          </ul>
        </div>
    </nav>
  );
};

export default MenuAdmin;
