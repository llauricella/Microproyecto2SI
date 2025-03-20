import logoImg from '../assets/logo.png'; 
import './styles.css';
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
        <div className="flex justify-center items-center min-h-screen  p-4">
            <div className="flex flex-col gap-6 bg-white rounded-xl shadow-lg p-6 md:p-10 w-full max-w-md">
                {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">{error}</div>}
                <h1 className="text-center text-2xl md:text-3xl font-bold">Iniciar sesión</h1>
                <img src={logoImg} alt="Logo" className="w-24 md:w-32 mx-auto" />
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <label className="text-sm md:text-base font-semibold">Email</label>
                    <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="p-3 border rounded text-sm md:text-base" 
                        type="text" 
                        placeholder="Introduce tu correo" 
                    />
                    <label className="text-sm md:text-base font-semibold">Contraseña</label>
                    <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="p-3 border rounded text-sm md:text-base" 
                        type="password" 
                        placeholder="Introduce tu contraseña" 
                    />
                    <button className="bg-black text-white rounded-md p-3 text-sm md:text-base cursor-pointer" type="submit">
                        Iniciar sesión
                    </button>
                </form>
                <button 
                    className="bg-blue-500 text-white rounded-md p-3 text-sm md:text-base cursor-pointer mt-2" 
                    onClick={handleGoogleLogin}
                >
                    Iniciar sesión con Google
                </button>
                <button 
                    className="bg-red-500 text-white rounded-md p-3 text-sm md:text-base cursor-pointer mt-2" 
                    onClick={handleGoogleRegister}
                >
                    Registrarse con Google
                </button>
                <button 
                    className="bg-black text-white rounded-md p-3 text-sm md:text-base cursor-pointer mt-2" 
                    onClick={() => navigate('/Register')}
                >
                    Registrarse
                </button>
            </div>
        </div>
    );
}

export default Login;