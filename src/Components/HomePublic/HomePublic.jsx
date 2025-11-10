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

        setSecciones(seccionesSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setNoticias(noticiasSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.error("Error al obtener datos públicos:", error);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <>

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
                  <Link
                    key={n.id}
                    to={`/noticia/${n.id}`}
                    className="card-publica"
                  >
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

    </>
  );
};

export default HomePublic;
