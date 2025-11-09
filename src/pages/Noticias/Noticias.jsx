import React, { useState } from "react";
import Noticia from "../../Components/ListaNoticia/ListaNoticia";
import ListaNoticia from "../../Components/Noticia/Noticia";

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);

  const handleSaveNoticia = (nuevaNoticia) => {
    setNoticias([...noticias, { ...nuevaNoticia, id: Date.now() }]);
    console.log("Noticia guardada:", nuevaNoticia);
  };

  return (
    <div className="noticias-page">
      <h2>Gestión de Noticias</h2>
      <Noticia onSave={handleSaveNoticia} />
      <ListaNoticia noticias={noticias} />
    </div>
  );
};

export default Noticias;
