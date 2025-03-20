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

    return (
        <div className="flex justify-center items-center min-h-screen p-4 md:p-8 ">
            <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg w-full max-w-lg">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Crear Ruta</h1>
                {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">{error}</div>}
                <form onSubmit={handleCreateRoute} className="flex flex-col">
                    <label className="mb-2 font-bold text-sm md:text-base" htmlFor="destino">Destino</label>
                    <select
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                        className="p-2 mb-4 border rounded text-sm md:text-base"
                        id="destino"
                    >
                        <option value="">Selecciona un destino</option>
                        <option value="Quebrada Quintero">Quebrada Quintero</option>
                        <option value="Sabas Nieves">Sabas Nieves</option>
                        <option value="Hotel Humboldt">Hotel Humboldt</option>
                        <option value="Pico Naiguatá">Pico Naiguatá</option>
                    </select>
                    <label className="mb-2 font-bold text-sm md:text-base" htmlFor="tipo">Tipo</label>
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="p-2 mb-4 border rounded text-sm md:text-base"
                        id="tipo"
                    >
                        <option value="">Selecciona un tipo de actividad</option>
                        <option value="Caminata">Caminata</option>
                        <option value="Corrida">Corrida</option>
                        <option value="Acampada">Acampada</option>
                    </select>
                    <label className="mb-2 font-bold text-sm md:text-base" htmlFor="fecha">Fecha</label>
                    <input
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="p-2 mb-4 border rounded text-sm md:text-base"
                        type="date"
                        id="fecha"
                    />
                    <label className="mb-2 font-bold text-sm md:text-base" htmlFor="guia">Guía</label>
                    <select
                        value={guia}
                        onChange={(e) => setGuia(e.target.value)}
                        className="p-2 mb-4 border rounded text-sm md:text-base"
                        id="guia"
                    >
                        <option value="">Selecciona un guía</option>
                        {guias.map(guia => (
                            <option key={guia.id} value={guia.id}>
                                {guia.name}
                            </option>
                        ))}
                    </select>
                    <button className="bg-amber-600 text-white p-2 rounded-lg shadow-lg text-sm md:text-base" type="submit">Crear Ruta</button>
                </form>
            </div>
        </div>
    );
}