import React from "react";

const ListaNoticia = ({ noticias = [] }) => {
  // 👆 Esto asegura que si no llega 'noticias', sea un array vacío

  if (noticias.length === 0) {
    return <p>No hay noticias aún.</p>;
  }

  return (
    <div className="lista-noticia">
      <h2>Listado de Noticias</h2>
      <ul>
        {noticias.map((noticia) => (
          <li key={noticia.id}>
            <h3>{noticia.titulo}</h3>
            <p>{noticia.subtitulo}</p>
            <small>
              {noticia.categoria} | {noticia.fechaCreacion}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaNoticia;
