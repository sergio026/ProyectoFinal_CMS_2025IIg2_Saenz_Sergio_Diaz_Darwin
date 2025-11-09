
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/credenciales";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./ListaNoticia.css";

const ListaNoticia = ({ rol, user }) => {
  const [noticias, setNoticias] = useState([]);
  const [reporteros, setReporteros] = useState([]);
  const [filtroAutor, setFiltroAutor] = useState("Todos");

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const noticiasCollection = collection(db, "Noticia");
        let snapshot;

        if (rol === "reportero") {
          const q = query(noticiasCollection, where("autor", "==", user.email));
          snapshot = await getDocs(q);
        } else if (rol === "editor") {
          snapshot = await getDocs(noticiasCollection);
        }

        const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setNoticias(lista);

        // Para el filtro de reporteros
        const autores = [...new Set(lista.map((n) => n.autor))];
        setReporteros(autores);

      } catch (error) {
        console.error("Error al obtener noticias:", error);
      }
    };

    fetchNoticias();
  }, [rol, user]);

  const noticiasFiltradas =
    rol === "editor" && filtroAutor !== "Todos"
      ? noticias.filter((n) => n.autor === filtroAutor)
      : noticias;

  return (
    <div className="lista-noticia-container">
      <h3 className="lista-noticia-title">Lista de Noticias</h3>

      {rol === "editor" && (
        <div className="filtro-autor">
          <label>Filtrar por reportero: </label>
          <select
            value={filtroAutor}
            onChange={(e) => setFiltroAutor(e.target.value)}
          >
            <option value="Todos">Todos</option>
            {reporteros.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      )}

      {noticiasFiltradas.length === 0 ? (
        <p className="sin-noticias">No hay noticias para mostrar.</p>
      ) : (
        <div className="noticias-grid">
          {noticiasFiltradas.map((n) => (
            <div className="card" key={n.id}>
              {n.imagenURL && (
                <img
                  src={n.imagenURL}
                  className="card-img-top"
                  alt={n.titulo}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{n.titulo}</h5>
                <p className="card-text">{n.subtitulo || n.contenido}</p>
                <div className="card-info">
                  <small>Autor: {n.autor}</small>
                  <small>Estado: {n.estado}</small>
                </div>
                <button className="btn-editar" onClick={() => console.log("Editar:", n)}>
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaNoticia;
