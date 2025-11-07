import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">📰 Noticias 360</div>
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/politica">Política</Link></li>
        <li><Link to="/tecnologia">Tecnología</Link></li>
        <li><Link to="/deportes">Deportes</Link></li>
        <li><Link to="/loguin">Iniciar sesión</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar