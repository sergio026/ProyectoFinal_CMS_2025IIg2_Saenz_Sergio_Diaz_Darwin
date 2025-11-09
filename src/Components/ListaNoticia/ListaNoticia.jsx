// import React, { useEffect, useState } from "react";
// import { db } from "../../firebase/credenciales";
// import { collection, getDocs, query, where } from "firebase/firestore";

// const ListaNoticia = ({ rol, user }) => {
//   const [noticias, setNoticias] = useState([]);
  
// useEffect(() => {
//   const fetchNoticias = async () => {
//     try {
//       const noticiasCollection = collection(db, "Noticia");
//       let snapshot;

//       if (rol === "reportero") {
//         const q = query(noticiasCollection, where("autor", "==", user.email));
//         snapshot = await getDocs(q);
//       } else if (rol === "editor") {
//         snapshot = await getDocs(noticiasCollection); // <- todos
//       }

//       const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setNoticias(lista);
//     } catch (error) {
//       console.error("Error al obtener noticias:", error);
//     }
//   };

//   fetchNoticias();
// }, [rol, user]);

//   const handleEditar = (noticia) => {
//     console.log("Editar noticia:", noticia);
//     // Aquí podrías cambiar la vista en Panel para editar esta noticia
//   };

//   return (
//     <div>
//       <h3>Lista de Noticias</h3>
//       {noticias.length === 0 ? (
//         <p>No hay noticias para mostrar.</p>
//       ) : (
//         <ul>
//           {noticias.map((n) => (
//             <li key={n.id}>
//               <strong>{n.titulo}</strong> - {n.estado} <br />
//               <small>{n.autor}</small>
//               <br />
//               <button onClick={() => handleEditar(n)}>Editar</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ListaNoticia;

import React, { useEffect, useState } from "react";
import { db } from "../../firebase/credenciales";
import { collection, getDocs, query, where } from "firebase/firestore";

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
          snapshot = await getDocs(noticiasCollection); // trae todas
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

  // Noticias filtradas según el filtro del editor
  const noticiasFiltradas =
    rol === "editor" && filtroAutor !== "Todos"
      ? noticias.filter((n) => n.autor === filtroAutor)
      : noticias;

  return (
    <div>
      <h3>Lista de Noticias</h3>

      {rol === "editor" && (
        <div style={{ marginBottom: "1rem" }}>
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
        <p>No hay noticias para mostrar.</p>
      ) : (
        <ul>
          {noticiasFiltradas.map((n) => (
            <li key={n.id}>
              <strong>{n.titulo}</strong> - {n.estado} <br />
              <small>{n.autor}</small>
              <br />
              <button onClick={() => console.log("Editar:", n)}>Editar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaNoticia;
