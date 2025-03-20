import './styles.css';
import { getAuth } from "firebase/auth";
import { useState, useEffect } from 'react';
import { app } from '../Credentials';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

const db = getFirestore(app);
const auth = getAuth(app);

export default function RutasAsignadas() {
    const [rutas, setRutas] = useState([]);
    const [error, setError] = useState("");
    const [filtro, setFiltro] = useState("");
    const [criterio, setCriterio] = useState("");

    useEffect(() => {
        const fetchRutas = async () => {
            try {
                const user = auth.currentUser;
                if (!user) {
                    setError("No se encontró un usuario autenticado.");
                    return;
                }

                const guiaName = user.displayName;

                const rutasQuery = query(collection(db, "routes"), where("guia", "==", guiaName));
                const querySnapshot = await getDocs(rutasQuery);
                const rutasList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setRutas(rutasList);
            } catch (error) {
                console.error("Error al obtener las rutas:", error.message);
                setError("Ocurrió un error al obtener las rutas.");
            }
        };

        fetchRutas();
    }, []);

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleCriterioChange = (e) => {
        setCriterio(e.target.value);
    };

    const filtrarRutas = () => {
        let rutasFiltradas = [...rutas];

        if (filtro === "fecha") {
            rutasFiltradas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        } else if (filtro === "tipo") {
            rutasFiltradas = rutasFiltradas.filter(ruta => ruta.tipo === criterio);
        }

        return rutasFiltradas;
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-4 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gray-100 rounded-xl p-2 text-center">Rutas Asignadas</h1>
            {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 w-full max-w-4xl" role="alert">{error}</div>}
            <div className="mb-6 flex flex-col md:flex-row items-center bg-white p-4 rounded-xl shadow-lg w-full max-w-4xl gap-4">
                <select value={filtro} onChange={handleFiltroChange} className="p-2 border rounded w-full md:w-auto">
                    <option value="">Selecciona un filtro</option>
                    <option value="fecha">Fecha</option>
                    <option value="tipo">Tipo</option>
                </select>
                {filtro && filtro !== "fecha" && (
                    <input
                        type="text"
                        value={criterio}
                        onChange={handleCriterioChange}
                        placeholder={`Introduce el ${filtro}`}
                        className="p-2 border rounded w-full md:w-auto"
                    />
                )}
                <button
                    className="bg-blue-500 text-white p-2 rounded-lg shadow-lg w-full md:w-auto"
                    onClick={filtrarRutas}
                >
                    Filtrar
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {filtrarRutas().map(ruta => (
                    <div key={ruta.id} className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">{ruta.destino}</h2>
                        <p className="text-lg mb-2"><span className="font-semibold">Tipo:</span> {ruta.tipo}</p>
                        <p className="text-lg mb-2"><span className="font-semibold">Fecha:</span> {ruta.fecha}</p>
                        <p className="text-lg mb-2"><span className="font-semibold">Guía:</span> {ruta.guia}</p>
                        <p className="text-lg mb-2"><span className="font-semibold">Estudiantes Suscritos:</span> {ruta.estudiantesSuscritos ? "Sí" : "No"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}