import './styles.css';
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../Context/UserContext";
import { app } from '../Credentials';
import { getAuth, signOut } from 'firebase/auth';
import flechaMenu from '../assets/flechamenu.png';

const auth = getAuth(app);

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const profileContext = useContext(UserContext);
    const { Logged, profile } = profileContext;
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Error al desloguear el usuario:", error.message);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6  shadow-lg">
            <div className="relative">
                <button className="flex-none block cursor-pointer bg-white rounded-lg p-2 md:p-4" onClick={toggleMenu}>
                    <img
                        className={`w-6 h-6 md:w-8 md:h-8 transition-transform duration-300 ${menuOpen ? 'rotate-90' : 'rotate-0'}`}
                        src={flechaMenu}
                        alt="menuLogo"
                    />
                </button>
                <div className={`absolute top-16 left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg menu-dropdown transition-opacity duration-300 ease-out ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <ul>
                        {Logged && (
                            <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/perfil")}>Perfil</li>
                        )}
                        <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/")}>Inicio</li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/rutas")}>Rutas</li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/conocenos")}>Conócenos</li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/informacion")}>Información</li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/contacto")}>Contacto</li>
                        {Logged && profile && profile.type === "admin" && (
                            <>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/modificarusuarios")}>Modificar usuarios</li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/crearutas")}>Crear rutas</li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/rutasactivas")}>Rutas activas</li>
                            </>
                        )}
                        {Logged && profile && profile.type === "guia" && (
                            <>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/RutasAsignadas")}>Rutas asignadas</li>
                            </>
                        )}
                        {Logged && profile && profile.type === "cliente" && (
                            <>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/rutasreservadas")}>Rutas reservadas</li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <div className="text-center md:text-left">
                {Logged && profile && (
                    <div className="text-sm md:text-lg font-bold mb-2 md:mb-0">
                        Bienvenido, {profile.name}
                    </div>
                )}
            </div>
            <div className="flex-auto text-center text-3xl md:text-5xl font-sans font-bold">
                ÁVILA GUIDE
            </div>
            {location.pathname !== '/login' && (
                Logged ? (
                    <button className="m-2 md:m-4 rounded-lg bg-amber-600 cursor-pointer text-sm md:text-xl border-black border-4 p-2 md:p-4" onClick={handleLogout}>Cerrar Sesión</button>
                ) : (
                    <button className="m-2 md:m-4 rounded-lg bg-amber-600 cursor-pointer text-sm md:text-xl border-black border-4 p-2 md:p-4" onClick={() => navigate('/login')}>Iniciar Sesión</button>
                )
            )}
            <img className="m-2 md:m-4 w-16 md:w-24" src="https://www.unimet.edu.ve/wp-content/uploads/2023/07/Logo-footer.png" alt="unimetLogo" />
        </div>
    );
}

export default Header;