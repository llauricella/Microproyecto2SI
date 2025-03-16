import './styles.css';
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../Context/UserContext";
import { app } from '../Credentials';
import { getAuth, signOut } from 'firebase/auth';
import flechaMenu from '../assets/flechaMenu.png';

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
        <div className='flex flex-row justify-between items-center h-full'>
            <div className='relative'>
                <button className='flex-none block cursor-pointer bg-white rounded-lg m-10' onClick={toggleMenu}>
                    <img
                        className={`size-10 m-6 transition-transform duration-300 ${menuOpen ? 'rotate-90' : 'rotate-0'}`}
                        src={flechaMenu}
                        alt="menuLogo"
                    />
                </button>
                <div className={`absolute top-30 left-10 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg menu-dropdown transition-opacity duration-300 ease-out ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <ul>
                        {Logged && (
                            <li className='p-2 hover:bg-gray-100 cursor-pointer' onClick={() => navigate("/perfil")}>Perfil</li>
                        )}
                        <li className='p-2 hover:bg-gray-100 cursor-pointer' onClick={() => navigate("/")}>Inicio</li>
                        <li className='p-2 hover:bg-gray-100 cursor-pointer' onClick={() => navigate("/rutas")}>Rutas</li>
                        <li className='p-2 hover:bg-gray-100 cursor-pointer' onClick={() => navigate("/guias")}>Guías</li>
                        <li className='p-2 hover:bg-gray-100 cursor-pointer' onClick={() => navigate("/informacion")}>Información</li>
                        <li className='p-2 hover:bg-gray-100 cursor-pointer' onClick={() => navigate("/contacto")}>Contacto</li>
                    </ul>
                </div>
            </div>
            <div>
                {Logged && profile && (
                    <div className="text-xl font-bold m-10">
                        Bienvenido, {profile.name}
                    </div>
                )}
            </div>
            <div className="flex-auto text-center text-5xl font-sans font-bold ml-10">ÁVILA GUIDE</div>
            {location.pathname !== '/login' && (
                Logged ? (
                    <button className='m-10 rounded-lg bg-amber-600 cursor-pointer text-xl border-black border-4 p-4 place-items-center' onClick={handleLogout}>Cerrar Sesión</button>
                ) : (
                    <button className='m-10 rounded-lg bg-amber-600 cursor-pointer text-xl border-black border-4 p-4 place-items-center' onClick={() => navigate('/login')}>Iniciar Sesión</button>
                )
            )}
            <img className="m-10" src="https://www.unimet.edu.ve/wp-content/uploads/2023/07/Logo-footer.png" alt="unimetLogo" />
        </div>
    );
}

export default Header;