import './styles.css';
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { app } from '../Credentials';
import { getFirestore, setDoc, doc, query, where, getDocs, collection, updateDoc } from "firebase/firestore";

const db = getFirestore(app);
const auth = getAuth(app);

export default function CreaciónRuta() {
    const navigate = useNavigate();
    const [destino, setDestino] = useState("");
    const [tipo, setTipo] = useState("");
    const [fecha, setFecha] = useState("");
    const [guia, setGuia] = useState("");
    const [guias, setGuias] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchGuias = async () => {
            try {
                const querySnapshot = await getDocs(query(collection(db, "users"), where("type", "==", "guia")));
                const guiasList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setGuias(guiasList);
            } catch (error) {
                console.error("Error al obtener los guías:", error.message);
                setError("Ocurrió un error al obtener los guías.");
            }
        };

        fetchGuias();
    }, []);

    const handleCreateRoute = async (e) => {
        e.preventDefault();
        const today = new Date();
        const selectedDate = new Date(fecha);

        if (!destino) {
            setError("Por favor selecciona un destino.");
            return;
        }

        if (!tipo) {
            setError("Por favor selecciona un tipo de actividad.");
            return;
        }

        if (!guia) {
            setError("Por favor selecciona un guía.");
            return;
        }

        const selectedGuia = guias.find(g => g.id === guia);
        if (!selectedGuia) {
            setError("El guía seleccionado no es válido.");
            return;
        }

        try {
            const rutasRef = collection(db, "routes");
            const q = query(rutasRef, where("destino", "==", destino), where("fecha", "==", fecha));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setError("Ya existe una ruta con el mismo destino y fecha.");
                return;
            }

            const newRouteRef = doc(db, "routes", `${destino}-${Date.now()}`);
            await setDoc(newRouteRef, {
                destino: destino,
                tipo: tipo,
                fecha: fecha,
                guia: selectedGuia.name,
                createdAt: new Date(),
                estudiantesSuscritos: false 
            });
            setDestino("");
            setTipo("");
            setFecha("");
            setGuia("");
            navigate("/");
        } catch (error) {
            console.error("Error al crear la ruta:", error.message);
            setError("Ocurrió un error al crear la ruta.");
        }
    };

    const handleReserveRoute = async (routeId) => {
        try {
            const routeRef = doc(db, "routes", routeId); 
            await updateDoc(routeRef, {
                estudiantesSuscritos: true, 
            });
            console.log("Ruta reservada exitosamente.");
        } catch (error) {
            console.error("Error al reservar la ruta:", error.message);
            setError("Ocurrió un error al reservar la ruta.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-200 p-10 rounded-xl shadow-lg w-96">
                <h1 className="text-3xl font-bold mb-4 text-center">Crear Ruta</h1>
                {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">{error}</div>}
                <form onSubmit={handleCreateRoute} className="flex flex-col">
                    <label className="mb-2 font-bold text-lg" htmlFor="destino">Destino</label>
                    <select
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                        className="p-2 mb-4 border rounded"
                        id="destino"
                    >
                        <option value="">Selecciona un destino</option>
                        <option value="Quebrada Quintero">Quebrada Quintero</option>
                        <option value="Sabas Nieves">Sabas Nieves</option>
                        <option value="Hotel Humboldt">Hotel Humboldt</option>
                        <option value="Pico Naiguatá">Pico Naiguatá</option>
                    </select>
                    <label className="mb-2 font-bold text-lg" htmlFor="tipo">Tipo</label>
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="p-2 mb-4 border rounded"
                        id="tipo"
                    >
                        <option value="">Selecciona un tipo de actividad</option>
                        <option value="Caminata">Caminata</option>
                        <option value="Corrida">Corrida</option>
                        <option value="Acampada">Acampada</option>
                    </select>
                    <label className="mb-2 font-bold text-lg" htmlFor="fecha">Fecha</label>
                    <input
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="p-2 mb-4 border rounded"
                        type="date"
                        id="fecha"
                    />
                    <label className="mb-2 font-bold text-lg" htmlFor="guia">Guía</label>
                    <select
                        value={guia}
                        onChange={(e) => setGuia(e.target.value)}
                        className="p-2 mb-4 border rounded"
                        id="guia"
                    >
                        <option value="">Selecciona un guía</option>
                        {guias.map(guia => (
                            <option key={guia.id} value={guia.id}>
                                {guia.name}
                            </option>
                        ))}
                    </select>
                    <button className="bg-amber-600 text-white p-2 rounded-lg shadow-lg" type="submit">Crear Ruta</button>
                </form>
            </div>
        </div>
    );
}