import logoImg from '../assets/logo.png'; 
import './styles.css';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { app } from '../Credentials';
import { getFirestore, setDoc, doc } from "firebase/firestore"; 

const db = getFirestore(app); 
const auth = getAuth(app);

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const nombreRegistrado = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuario registrado:", nombreRegistrado.user);

            await setDoc(doc(db, "users", nombreRegistrado.user.uid), {
                name: name,
                email: email,
                uid: nombreRegistrado.user.uid,
                fechaCreacion: new Date(),
                type: 'cliente',
                rutas: [] 
            });

            setName("");
            setEmail("");
            setPassword("");
            navigate("/");
        } catch (error) {
            console.error("Error al registrar el usuario:", error.message);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('El correo electrónico ya está en uso.');
                    break;
                case 'auth/invalid-email':
                    setError('El correo electrónico no es válido.');
                    break;
                case 'auth/weak-password':
                    setError('La contraseña debe tener al menos 6 caracteres.');
                    break;
                default:
                    setError('Ocurrió un error al registrar el usuario.');
                    break;
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg w-full max-w-md">
                {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">{error}</div>}
                <h1 className="text-center text-2xl md:text-3xl font-bold mb-6">Registrarse</h1>
                <img src={logoImg} alt="Logo" className="w-24 md:w-32 mx-auto mb-6" />
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm md:text-base font-semibold mb-1">Email</label>
                        <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full p-3 border rounded text-sm md:text-base" 
                            type="text" 
                            placeholder="Introduce tu correo" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm md:text-base font-semibold mb-1">Nombre</label>
                        <input 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="w-full p-3 border rounded text-sm md:text-base" 
                            type="text" 
                            placeholder="Introduce tu nombre" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm md:text-base font-semibold mb-1">Contraseña</label>
                        <input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full p-3 border rounded text-sm md:text-base" 
                            type="password" 
                            placeholder="Introduce tu contraseña" 
                        />
                    </div>
                    <button 
                        className="bg-black text-white rounded-md p-3 text-sm md:text-base cursor-pointer hover:bg-gray-800 transition-colors"
                        type="submit"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
}