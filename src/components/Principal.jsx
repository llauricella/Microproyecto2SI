import './styles.css'
import Login from './Login';
import logoImg from '../assets/logo.png'; 
import { useNavigate} from "react-router-dom";
import {use ,useContext } from 'react';
import { UserContext } from "../Context/UserContext";


function Principal({ onNavigate }) {
    const navigate = useNavigate();
    const profileContext = useContext(UserContext);
    const { Logged, profile } = profileContext;
        return (
        <div>
            <img src={logoImg} alt="Logo" className='border-2 rounded-lg col-span-4 block justify-self-center mt-20'/>
            <div className="grid grid-cols-4 gap-2 text-center mt-25">
                <button className="col-span-1 rounded-lg cursor-pointer block m-10 bg-amber-600 text-2xl font-bold border-black border-4 h-24 col-start-1" onClick={() => navigate("/rutas")}>RUTAS</button>
                <button className="col-span-1 rounded-lg cursor-pointer block m-10 bg-amber-600 text-2xl font-bold border-black border-4 h-24" onClick={() => navigate("/conocenos")}>CONÓCENOS</button>
                <button className="col-span-1 rounded-lg cursor-pointer block m-10 bg-amber-600 text-2xl font-bold border-black border-4 h-24" onClick={() => navigate("/informacion")}>INFORMACIÓN GENERAL</button>
                <button className="col-span-1 rounded-lg cursor-pointer block m-10 bg-amber-600 text-2xl font-bold border-black border-4 h-24" onClick={() => Logged ? navigate("/planes") : navigate("/login")}>PLANES</button>
            </div>
        </div>
        
    )
}

export default Principal;