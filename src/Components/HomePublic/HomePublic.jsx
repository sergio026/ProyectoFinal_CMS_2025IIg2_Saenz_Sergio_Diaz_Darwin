import React, { useEffect, useState } from "react";
import { db } from "../../firebase/credenciales";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./HomePublic.css";

const HomePublic = () => {
  const [secciones, setSecciones] = useState([]);
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const seccionesSnap = await getDocs(collection(db, "Secciones"));
        const noticiasSnap = await getDocs(
          query(collection(db, "Noticia"), where("estado", "==", "Publicado"))
        );

        const seccionesData = seccionesSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        const noticiasData = noticiasSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

        setSecciones(seccionesData);
        setNoticias(noticiasData);
      } catch (error) {
        console.error("Error al obtener datos públicos:", error);
      }
    };

    obtenerDatos();
  }, []);

  const noticiaPrincipal = noticias[0];

  return (
    <div className="home-wrapper">

      {noticiaPrincipal && (
        <Link to={`/noticia/${noticiaPrincipal.id}`} className="hero-container">
          <img
            src={noticiaPrincipal.imagenURL}
            alt="Hero"
            className="hero-img"
          />
          <div className="hero-overlay">
            <h1>{noticiaPrincipal.titulo}</h1>
            <p>{noticiaPrincipal.subtitulo || noticiaPrincipal.contenido.slice(0, 120) + "..."}</p>
          </div>
        </Link>
      )}

      <div className="home-container">
        {secciones.map((sec) => {
          const noticiasDeSeccion = noticias.filter(
            (n) => n.seccionId === sec.id
          );

          if (noticiasDeSeccion.length === 0) return null;

          return (
            <section key={sec.id} className="seccion-home">
              <h2 className="seccion-title">{sec.nombre}</h2>

              <div className="noticias-grid">
                {noticiasDeSeccion.map((n) => (
                  <Link key={n.id} to={`/noticia/${n.id}`} className="card-publica">
                    <img
                      src={
                        n.imagenURL ||
                        "https://via.placeholder.com/400x250?text=Sin+Imagen"
                      }
                      alt={n.titulo}
                    />
                    <div className="card-content">
                      <h3>{n.titulo}</h3>
                      <p>{n.subtitulo || n.contenido.slice(0, 80) + "..."}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

    </div>
  );
};

export default HomePublic;
