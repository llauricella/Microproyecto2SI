import logoImg from '../assets/logo.png'; 
import './styles.css'
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from 'react';
import { app } from '../Credentials';
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

const db = getFirestore(app); 
const auth = getAuth(app);

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const handleLogin = async (e) => {
        e.preventDefault(); 
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log("Sesión iniciada:", user.user);
            setEmail("");
            setPassword("");
            setError(""); 
            navigate("/"); 
        } catch (error) {
            console.error("Error al iniciar sesión:", error.message);
            switch (error.code) {
                case 'auth/user-not-found':
                    setError('No se encontró una cuenta con este correo electrónico.');
                    break;
                case 'auth/wrong-password':
                    setError('La contraseña es incorrecta.');
                    break;
                case 'auth/invalid-email':
                    setError('El correo electrónico no es válido.');
                    break;
                default:
                    setError('Ocurrió un error al iniciar sesión.');
                    break;
            }
        }
    };

    const handleGoogleRegister = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Usuario registrado con Google:", user);

            // Crear un nuevo usuario en Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                fechaCreacion: new Date(),
                type: 'cliente'
            });

            setError(""); 
            navigate("/"); 
        } catch (error) {
            console.error("Error al registrar con Google:", error.message);
            setError(`Ocurrió un error al registrar con Google: ${error.message}`);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Usuario autenticado con Google:", user);

            // Verificar si el usuario ya existe en Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists()) {
                setError("No se encontró una cuenta asociada a este correo. Por favor, regístrate primero.");
                return;
            }

            setError(""); 
            navigate("/"); 
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error.message);
            setError(`Ocurrió un error al iniciar sesión con Google: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-col justify-self-center min-h-screen">
            {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">{error}</div>}
            <div className='flex flex-col justify-self-center gap-6 bg-white rounded-xl p-10'>
                <h1 className="flex justify-center text-3xl font-bold"> Iniciar sesión</h1>
                <img src={logoImg} alt="Logo"/>
                <form onSubmit={handleLogin} className="flex flex-col justify-center">
                    Email
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="p-4 border rounded" type="text" placeholder='Introduce tu correo'/>
                    <br></br>
                    Contraseña
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="p-4 border rounded" type="Password" placeholder='Introduce tu contraseña'/>
                    <br></br>
                    <button className='bg-black text-white rounded-md p-2 cursor-pointer' type="submit">Iniciar sesión</button>
                </form>
                <button className='bg-blue-500 text-white rounded-md p-2 cursor-pointer mt-2' onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
                <button className='bg-red-500 text-white rounded-md p-2 cursor-pointer mt-2' onClick={handleGoogleRegister}>Registrarse con Google</button>
                <button className='bg-black text-white rounded-md p-2 cursor-pointer' onClick={() => navigate('/Register')}>Registrarse</button>
            </div>
        </div>
    )
}

export default Login;