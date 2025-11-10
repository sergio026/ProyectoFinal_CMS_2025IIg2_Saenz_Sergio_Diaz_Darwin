import React, { useEffect, useState } from "react";
import { db } from "../../firebase/credenciales";
// import { collection, getDocs, query, where } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

// import "./ListaNoticia.css";

const ListaNoticia = ({ rol, user, onEditarNoticia }) => {
  const [noticias, setNoticias] = useState([]);
  const [reporteros, setReporteros] = useState([]);
  const [filtroAutor, setFiltroAutor] = useState("Todos");
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noticiaAEliminar, setNoticiaAEliminar] = useState(null);

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

        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNoticias(lista);

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
  const handleEliminar = (n) => {
    setNoticiaAEliminar(n);
    setShowDeleteModal(true);
  };

  const confirmarEliminacion = async () => {
    if (noticiaAEliminar) {
      try {
        await deleteDoc(doc(db, "Noticia", noticiaAEliminar.id));
        setNoticias((prev) => prev.filter((x) => x.id !== noticiaAEliminar.id));
      } catch (error) {
        console.error("Error al eliminar noticia:", error);
      }
    }
    setShowDeleteModal(false);
    setNoticiaAEliminar(null);
  };

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
            <div
              className="card"
              key={n.id}
              onClick={() => setNoticiaSeleccionada(n)}
            >
              <div className="card-wrapper">
                {n.imagenURL && (
                  <div className="card-icon">
                    <div className="icon-image-box">
                      <img src={n.imagenURL} alt={n.titulo} />
                    </div>
                  </div>
                )}
                <div className="card-content">
                  <div className="card-title-wrapper">
                    <span className="card-title">{n.titulo}</span>
                  </div>
                  <div className="card-category">
                    {n.seccionNombre || "Sin categoría"}
                  </div>
                  <div className="card-text">
                    {n.subtitulo || n.contenido?.slice(0, 120) + "..."}
                  </div>
                  <div className="card-info">
                    <small>Autor: {n.autor}</small>
                    <small>Estado: {n.estado}</small>
                  </div>
                  <div className="card-actions">
                    <button
                      className="btn-editar"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditarNoticia(n);
                      }}
                    >
                      Editar
                    </button>

                    <button
                      className="btn-eliminar"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEliminar(n);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showDeleteModal && (
        <div
          className="modal-eliminar-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="modal-eliminar" onClick={(e) => e.stopPropagation()}>
            <h3>¿Eliminar noticia?</h3>
            <p>
              Esta acción eliminará permanentemente la noticia seleccionada.
            </p>
            <div className="modal-eliminar-buttons">
              <button
                className="btn-cancelar"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
              <button className="btn-confirmar" onClick={confirmarEliminacion}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {noticiaSeleccionada && (
        <div
          className="modal-overlay"
          onClick={() => setNoticiaSeleccionada(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setNoticiaSeleccionada(null)}
            >
              ✖
            </button>

            <img
              src={
                noticiaSeleccionada.imagenURL ||
                "https://via.placeholder.com/600x400"
              }
              alt={noticiaSeleccionada.titulo}
              className="modal-image"
            />

            <h2>{noticiaSeleccionada.titulo}</h2>
            <h4>{noticiaSeleccionada.subtitulo}</h4>
            <p className="modal-contenido">{noticiaSeleccionada.contenido}</p>

            <div className="modal-info">
              <span>
                <b>Autor:</b> {noticiaSeleccionada.autor}
              </span>
              <span>
                <b>Estado:</b> {noticiaSeleccionada.estado}
              </span>
            </div>

            <button
              className="btn-editar-modal"
              onClick={() => {
                onEditarNoticia(noticiaSeleccionada);
                setNoticiaSeleccionada(null);
              }}
            >
              Editar Noticia
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaNoticia;
