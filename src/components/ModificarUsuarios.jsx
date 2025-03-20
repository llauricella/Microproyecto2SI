import './styles.css';
import { getAuth } from "firebase/auth";
import { useState, useEffect } from 'react';
import { app } from '../Credentials';
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

const db = getFirestore(app);
const auth = getAuth(app);

export default function ModificarUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const usersList = querySnapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter(user => user.email !== "admin@gmail.com");
                setUsuarios(usersList);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error.message);
                setError("Ocurrió un error al obtener los usuarios.");
            }
        };

        fetchUsuarios();
    }, []);

    const handleChangeTipo = async (id, newTipo) => {
        try {
            const userDocRef = doc(db, "users", id);
            await updateDoc(userDocRef, { type: newTipo });
            setUsuarios(prevUsuarios => prevUsuarios.map(user => user.id === id ? { ...user, type: newTipo } : user));
        } catch (error) {
            console.error("Error al actualizar el tipo de usuario:", error.message);
            setError("Ocurrió un error al actualizar el tipo de usuario.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen md:p-10">
            <div className="bg-gray-200 p-6 md:p-10 rounded-xl shadow-lg w-full max-w-4xl h-full overflow-y-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Modificar Usuarios</h1>
                {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">{error}</div>}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border-collapse">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-sm md:text-base text-center">Nombre</th>
                                <th className="py-2 px-4 border-b text-sm md:text-base text-center">Correo Electrónico</th>
                                <th className="py-2 px-4 border-b text-sm md:text-base text-center">Tipo</th>
                                <th className="py-2 px-4 border-b text-sm md:text-base text-center">Cambiar tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(usuario => (
                                <tr key={usuario.id}>
                                    <td className="py-2 px-4 border-b text-sm md:text-base text-center">{usuario.name}</td>
                                    <td className="py-2 px-4 border-b text-sm md:text-base text-center">{usuario.email}</td>
                                    <td className="py-2 px-4 border-b text-sm md:text-base text-center">{usuario.type}</td>
                                    <td className="py-2 px-4 border-b text-sm md:text-base text-center">
                                        <select
                                            value={usuario.type}
                                            onChange={(e) => handleChangeTipo(usuario.id, e.target.value)}
                                            className="p-2 border rounded text-sm md:text-base"
                                        >
                                            <option value="cliente">Cliente</option>
                                            <option value="guia">Guía</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}