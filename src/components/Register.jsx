import logoImg from '../assets/logo.png'; 
import './styles.css'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
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
                type: 'cliente'
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
        <div className="flex flex-col justify-self-center min-h-screen">
            {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">{error}</div>}
            <div className='flex flex-col justify-self-center gap-6 bg-white rounded-xl p-10'>
                <h1 className="flex justify-center text-3xl font-bold"> Registrarse</h1>
                <img src={logoImg} alt="Logo"/>
                <form onSubmit={handleRegister} className="flex flex-col justify-center">
                    Email
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="p-4 border rounded" type="text" placeholder='Introduce tu correo'/>
                    <br></br>
                    Nombre
                    <input value={name} onChange={(e) => setName(e.target.value)} className="p-4 border rounded" type="text" placeholder='Introduce tu nombre'/>
                    <br></br>
                    Contraseña
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="p-4 border rounded" type="Password" placeholder='Introduce tu contraseña'/>
                    <br></br>
                    <button className='bg-black text-white rounded-md p-2 cursor-pointer' type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    )
}