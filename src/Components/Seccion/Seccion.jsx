import React, { useState, useEffect } from "react";
import { crearSeccion, actualizarSeccion, getSeccion,} from "../../firebase/firestoreSections";
// import "./Seccion.css";

const Seccion = ({
    seccionId = null,
    onGuardado = () => { },
    onCancel = () => { },
}) => {
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
    });
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        if (!seccionId) return;
        (async () => {
            const s = await getSeccion(seccionId);
            if (s)
                setForm({
                    nombre: s.nombre || "",
                    descripcion: s.descripcion || "",
                });
        })();
    }, [seccionId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "orden" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        try {
            if (seccionId) {
                await actualizarSeccion(seccionId, form);
            } else {
                await crearSeccion(form);
            }
            onGuardado();
        } catch (err) {
            console.error(err);
            alert("Error guardando la sección");
        } finally {
            setCargando(false);
        }
    };

    return (       
        <div className="secciones">
        <form onSubmit={handleSubmit} className="seccion-form">
            <label>Nombre</label>
            <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
            />
            <label>Descripción</label>
            <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
            />
            <div >
                <button type="submit" disabled={cargando}>
                    {cargando ? "Guardando..." : "Guardar"}
                </button>
                <button type="button" onClick={onCancel} >
                    Cancelar
                </button>
            </div>
        </form>
                </div>
    );
};

export default Seccion;
