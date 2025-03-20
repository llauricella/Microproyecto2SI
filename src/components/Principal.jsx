import './styles.css';
import logoImg from '../assets/logo.png'; 
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../Context/UserContext";

function Principal({ onNavigate }) {
    const navigate = useNavigate();
    const profileContext = useContext(UserContext);
    const { Logged } = profileContext;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <img 
                src={logoImg} 
                alt="Logo" 
                className="w-32 md:w-48 mx-auto border-2 rounded-lg mt-10 mb-8"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <button 
                    className="rounded-lg cursor-pointer bg-amber-600 text-lg md:text-xl font-bold border-black border-4 h-20 md:h-24"
                    onClick={() => navigate("/rutas")}
                >
                    RUTAS
                </button>
                <button 
                    className="rounded-lg cursor-pointer bg-amber-600 text-lg md:text-xl font-bold border-black border-4 h-20 md:h-24"
                    onClick={() => navigate("/conocenos")}
                >
                    CONÓCENOS
                </button>
                <button 
                    className="rounded-lg cursor-pointer bg-amber-600 text-lg md:text-xl font-bold border-black border-4 h-20 md:h-24"
                    onClick={() => navigate("/informacion")}
                >
                    INFORMACIÓN GENERAL
                </button>
                <button 
                    className="rounded-lg cursor-pointer bg-amber-600 text-lg md:text-xl font-bold border-black border-4 h-20 md:h-24"
                    onClick={() => Logged ? navigate("/planes") : navigate("/login")}
                >
                    PLANES
                </button>
            </div>
        </div>
    );
}

export default Principal;