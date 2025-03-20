import './styles.css';
import React from 'react';
import SabasNieves from '../assets/sabasnieves.jpg';
import Unimet from '../assets/unimet.jpg';

export default function Conócenos() {
    return (
        <div className="flex flex-col items-center min-h-screen p-4 md:p-10 h-full">
            <div className="bg-gray-200 p-4 rounded-lg shadow-lg mb-8 w-full max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-center">Conócenos</h2>
            </div>
            <div className="bg-orange-400 p-6 rounded-lg shadow-lg w-full max-w-4xl">
                <div className="bg-white p-4 rounded-lg shadow-lg mb-6 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-4">
                        <div className="bg-gray-200 p-2 rounded-lg shadow-lg mb-4">
                            <h3 className="text-xl md:text-2xl font-bold mb-2">Misión</h3>
                        </div>
                        <p className="text-justify">
                            Desarrollar una plataforma digital que permita a los estudiantes de la Universidad Metropolitana planificar, organizar y participar en excursiones al Parque Nacional El Ávila.
                        </p>
                    </div>
                    <div className="md:w-1/2 md:pl-4">
                        <img 
                            src={SabasNieves} 
                            alt="Sabas Nieves" 
                            className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg" 
                        />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:order-2 md:pl-4">
                        <div className="bg-gray-200 p-2 rounded-lg shadow-lg mb-4">
                            <h3 className="text-xl md:text-2xl font-bold mb-2">Visión</h3>
                        </div>
                        <p className="text-justify">
                            Ser una herramienta digital capaz de promover, dentro del ámbito universitario, un estilo de vida activo y sostenible para la organización de las actividades en el Ávila.
                        </p>
                    </div>
                    <div className="md:w-1/2 md:order-1 md:pr-4">
                        <img 
                            src={Unimet} 
                            alt="Unimet" 
                            className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}