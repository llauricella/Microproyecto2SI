import React from 'react';
import {use ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/userContext';


function Planes({ title, diff, price, description, imageUrl }) {
    const navigate = useNavigate();
    const profileContext = useContext(UserContext);
    const { Logged, profile } = profileContext;
    return (
        <div className="mx-auto p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-green-800">{title}</h3>
                    <span className="text-xl font-bold text-green-800 bg-green-50 px-3 py-1 rounded-lg">{price}$</span>
                </div>
                
                <img 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-48 object-cover rounded-xl shadow-md" 
                />
                
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-700">Dificultad:</span>
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">{diff}</span>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed text-justify">{description}</p>
                    
                    <button className="w-full py-3 bg-amber-400 hover:bg-amber-500  text-gray-800 font-bold rounded-lg 
                                    transition-colors duration-200 transform hover:scale-[1.02]"onClick={() => Logged ? navigate(`/agenda?route=${encodeURIComponent(title)}`) : navigate("/login")}>
                        Pagar con PayPal
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Planes;