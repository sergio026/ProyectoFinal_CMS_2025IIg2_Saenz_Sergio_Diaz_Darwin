import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
const [isOpen, setIsOpen] = useState(false);

const toggleMenu = () => setIsOpen(!isOpen);
const closeMenu = () => setIsOpen(false);

return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">
    <div className="container">
        <Link
        className="navbar-brand d-flex align-items-center"
        to="/header"
        onClick={closeMenu}>
        <img
            src="logoCMS.webp"
            className="navbar-logo"
            alt="Logo CMS"
            loading="lazy"/>
        </Link>

        <button
        className={`navbar-toggler ${isOpen ? "open" : ""}`}
        type="button"
        onClick={toggleMenu}>
        <span className="navbar-toggler-icon"></span>
        </button>

        <div
        className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
        id="navbarMenu">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center">
            <li className="nav-item">
            <Link className="nav-link" to="/header" onClick={closeMenu}>
                Publicidad CMS
            </Link>
            </li>
        </ul>

        <div className="d-flex align-items-center gap-2 justify-content-center flex-column flex-lg-row">
            <Link
            to="/header"
            className="btn btn-outline-primary custom-btn"
            onClick={closeMenu}>
            Inicio
            </Link>
            <Link
            to="/login"
            className="btn btn-outline-primary custom-btn"
            onClick={closeMenu}>
            Iniciar Sesión
            </Link>
        </div>
        </div>
    </div>
    </nav>
);
};

export default NavBar;
