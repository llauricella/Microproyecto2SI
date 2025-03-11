import './styles.css'
import Login from './Login';
import logoImg from '../assets/logo.png'; 
import { useNavigate} from "react-router-dom";

function Principal({ onNavigate }) {
    const navigate = useNavigate();
    return (
        <div>
            <img src={logoImg} alt="Logo" className='border-2 rounded-lg col-span-4 block justify-self-center'/>
            <div className="grid grid-cols-4 gap-2 text-center">
                <button className="col-span-1 rounded-lg cursor-pointer block m-10 bg-amber-600 text-2xl font-bold border-black border-4 h-25 col-start-1" onClick={() => navigate("/rutas")}>RUTAS</button>
                <button className="col-span-1 rounded-lg cursor-pointer block m-10 bg-amber-600 text-2xl font-bold border-black border-4">GUIAS</button>
                <button className="col-span-1 rounded-lg cursor-pointer block m-10 bg-amber-600 text-2xl font-bold border-black border-4">INFORMACION GENERAL</button>
                <button className="col-span-1 rounded-lg cursor-pointer block m-10 bg-amber-600 text-2xl font-bold border-black border-4">PLANES</button>
            </div>
            <button className='m-10 rounded-lg bg-amber-600 cursor-pointer text-2xl border-black border-4 p-5 place-items-center' onClick={() => navigate('/login')}>Iniciar Sesión</button>
        </div>
        
    )
}

export default Principal;