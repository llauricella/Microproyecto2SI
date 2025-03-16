import logoImg from '../assets/logo.png'; 
import './styles.css'
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from 'react';
import { app } from '../Credentials';
import { getFirestore, setDoc, doc } from "firebase/firestore"; // Asegúrate de importar estas funciones
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

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Usuario registrado con Google:", user);
            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                fechaCreacion: new Date()
            });
            navigate("/");
        } catch (error) {
            console.error("Error al registrar con Google:", error.message);
            setError(`Ocurrió un error al registrar con Google: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-col justify-self-center min-h-screen">
<<<<<<< HEAD
            <div className='bg-white m-5 rounded-md p-10 text-center text-3xl font-bold'>Log In</div>
            <div className='flex flex-col justify-center gap-6 bg-white rounded-md p-10'>
                <img src={logoImg} alt="Logo" className='border-2 rounded-lg'/>
                <input className="p-1 border-2 rounded-md" type="text" placeholder='User'/>
                <input className="p-1 border-2 rounded-md" type="Password" placeholder='Contraseña'/>
                <button className='bg-black text-emerald-700 rounded-md p-2 cursor-pointer font-bold'>Iniciar Sección</button>
                <a href="" className='text-center'>¿Olvidaste tu contraseña?</a>
=======
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
                <button className='bg-red-500 text-white rounded-md p-2 cursor-pointer mt-4' onClick={handleGoogleLogin}>Iniciar sesión Google</button>
                <button className='bg-black text-white rounded-md p-2 cursor-pointer' onClick={() => navigate('/Register')}>Registrarse</button>
>>>>>>> d4893206b9622eeab61640b675b4f41c07c23b18
            </div>
        </div>
    )
}

export default Login;