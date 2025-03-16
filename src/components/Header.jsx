import './styles.css'
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../Context/userContext';
import { app } from '../Credentials';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(app);

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const profileContext = useContext(UserContext);
    const { Logged, profile } = profileContext;

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Error al desloguear el usuario:", error.message);
        }
    };

    return (
        <div className='flex flex-row justify-between items-center h-full'>
            <button className='flex-none block cursor-pointer bg-white rounded-lg m-10'onClick={() => navigate("/")}>
                <img className='size-10 m-6' src="https://www.svgrepo.com/show/509382/menu.svg" alt="menuLogo" />
            </button>
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
    )
}

export default Header;