import './styles.css'
import React, { useState } from 'react'
import ubicacionMetro from '../assets/ubicacionMetro.jpg';

export default function Contacto() {
    const [showForm, setShowForm] = useState(false);

    const handleContactClick = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-200 p-10 rounded-xl shadow-lg flex">
                <div className="flex-1">
                    <h1 className="bg-amber-600 p-6 rounded-lg shadow-lg text-3xl font-bold mb-4 text-center mr-5">Contacto</h1>
                    <div className="mb-4">
                        <p><strong>Correo Electrónico:</strong> avilaguide@gmail.com</p>
                    </div>
                    <div className="mb-4">
                        <p><strong>Teléfono:</strong> 0424-1671440</p>
                    </div>
                    <div className="mb-4">
                        <p><strong>Ubicación:</strong> Ditribuidor metropolitano Caracas, 1060, Miranda</p>
                    </div>
                    <button 
                        className="bg-amber-600 text-white p-2 rounded-lg shadow-lg mt-4 cursor-pointer"
                        onClick={handleContactClick}
                    >
                        Contactar
                    </button>
                    {showForm && (
                        <form className="mt-4 bg-white p-4 rounded-lg shadow-lg mr-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Nombre
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="name" 
                                    type="text" 
                                    placeholder="Tu nombre" 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Correo Electrónico
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="email" 
                                    type="email" 
                                    placeholder="Tu correo electrónico" 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                    Mensaje
                                </label>
                                <textarea 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="message" 
                                    placeholder="Tu mensaje" 
                                />
                            </div>
                            <button 
                                className="bg-amber-600 text-white p-2 rounded-lg shadow-lg"
                                type="submit"
                            >
                                Enviar
                            </button>
                        </form>
                    )}
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <a href="https://maps.app.goo.gl/qXDJAJWuLnqJVCXq5" target="_blank" rel="noreferrer">
                        <img src={ubicacionMetro} alt="Ubicación Metro" className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </a>
                </div>
            </div>
        </div>
    )
}