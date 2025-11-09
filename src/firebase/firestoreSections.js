// helpers/firestoreSections.js (opcional)
import { db } from "../firebase/credenciales";
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from "firebase/firestore";

const seccionesCol = collection(db, "Secciones");

export const fetchSecciones = async () => {
  const q = query(seccionesCol, orderBy("orden", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getSeccion = async (id) => {
  const ref = doc(db, "Secciones", id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const crearSeccion = async (payload) => {
  return await addDoc(seccionesCol, { ...payload, fechaCreacion: serverTimestamp() });
};

export const actualizarSeccion = async (id, payload) => {
  const ref = doc(db, "Secciones", id);
  await updateDoc(ref, { ...payload, fechaActualizacion: serverTimestamp() });
};

export const eliminarSeccion = async (id) => {
  const ref = doc(db, "Secciones", id);
  await deleteDoc(ref);
};
