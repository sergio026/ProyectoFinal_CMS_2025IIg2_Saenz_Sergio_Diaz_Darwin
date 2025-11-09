import React, { useEffect, useState } from "react";
import { fetchSecciones, eliminarSeccion } from "../../firebase/firestoreSections";
import SeccionForm from "../Seccion/Seccion";

const SeccionesList = ({ onClose = () => {} }) => {
  const [secciones, setSecciones] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    const list = await fetchSecciones();
    setSecciones(list);
  };

  useEffect(() => { load(); }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar sección? Esto no eliminará noticias relacionadas automáticamente.")) return;
    await eliminarSeccion(id);
    await load();
  };

  const handleGuardado = async () => {
    setShowForm(false);
    setEditingId(null);
    await load();
  };

  return (
    <div className="secciones-panel">
      <h3>Secciones</h3>
      <button onClick={() => { setEditingId(null); setShowForm(true); }}>Crear nueva sección</button>

      {showForm && <SeccionForm seccionId={editingId} onGuardado={handleGuardado} onCancel={() => setShowForm(false)} />}

      <ul>
        {secciones.map(s => (
          <li key={s.id} >
            <div>
              <strong>{s.nombre}</strong> 
              <div >{s.descripcion}</div>
            </div>
            <div>
              <button onClick={() => { setEditingId(s.id); setShowForm(true); }}>Editar</button>
              <button onClick={() => handleEliminar(s.id)} >Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeccionesList;
