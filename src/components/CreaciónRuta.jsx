import './styles.css'
import { getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { app } from '../Credentials';
import { getFirestore, setDoc, doc } from "firebase/firestore";

const db = getFirestore(app); 
const auth = getAuth(app);

export default function CreaciónRuta() {
    const navigate = useNavigate();
    const [destino, setDestino] = useState("");
    const [tipo, setTipo] = useState("");
    const [fecha, setFecha] = useState("");
    const [error, setError] = useState("");

    const handleCreateRoute = async (e) => {
        e.preventDefault();
        const today = new Date();
        const selectedDate = new Date(fecha);
        
        if (selectedDate <= today) {
            setError("La fecha seleccionada no puede ser hoy ni días anteriores.");
            return;
        }

        if (!destino) {
            setError("Por favor selecciona un destino.");
            return;
        }

        if (!tipo) {
            setError("Por favor selecciona un tipo de actividad.");
            return;
        }

        try {
            const newRouteRef = doc(db, "routes", `${destino}-${Date.now()}`);
            await setDoc(newRouteRef, {
                destino: destino,
                tipo: tipo,
                fecha: fecha,
                createdAt: new Date()
            });
            setDestino("");
            setTipo("");
            setFecha("");
            navigate("/"); 
        } catch (error) {
            console.error("Error al crear la ruta:", error.message);
            setError("Ocurrió un error al crear la ruta.");
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
                    <button className="bg-amber-600 text-white p-2 rounded-lg shadow-lg" type="submit">Crear Ruta</button>
                </form>
            </div>
        </div>
    )
}