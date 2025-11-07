import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand me-2 d-flex align-items-center" to="/">
          <img
            src="logoCMS.webp"
            height="30"
            alt="Logo"
            loading="lazy"
            style={{ marginTop: "-2px" }}
          />
        </Link>

        {/* Contenido colapsable */}
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Publcidad CMS
              </Link>
            </li>
          </ul>

          {/* Botones a la derecha */}
          <div className="d-flex align-items-center gap-2">
            <Link to="/header" className="btn btn-outline-primary px-3">
              Inicio
            </Link>
              <Link to="/login" className="btn btn-outline-primary px-3">
               Inicio de sesion
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
