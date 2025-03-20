import './styles.css';
import React from 'react';
import { useNavigate } from "react-router-dom";
import InformacionCard from './InformacionCard';

export default function Información() {
    const navigate = useNavigate();

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <h1 className="mx-auto text-center rounded-lg bg-white text-2xl md:text-3xl font-bold border-black border-4 mb-8 p-2">
                Información General
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InformacionCard
                    title="Parque Nacional El Ávila"
                    text={[
                        "El Ávila, declarado parque nacional en 1958, es una formación montañosa y el pulmón vegetal de la ciudad de Caracas. Dentro de él pueden realizarse diferentes actividades ya que ofrece múltiples caminos y senderos que se pueden recorrer."
                    ]}
                />
                <InformacionCard
                    title="Recomendaciones"
                    text={[
                        "Llevar suficiente hidratación",
                        "Pisar con firmeza para cuidar las rodillas",
                        "Usar ropa cómoda y zapatos deportivos",
                        "No se permite realizar fogatas, fumar, quemar basura ni darle comida a la fauna silvestre",
                        "IMPORTANTE: ante cualquier emergencia se encuentran varios puestos de guardaparques ubicados en distintos puntos: Sabas Nieves II, La Julia, Loma del cuño y Loma del viento"
                    ]}
                />
            </div>

            {/* Contenedor para los botones */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
                <button
                    className="w-full md:w-1/4 text-center rounded-lg bg-amber-600 text-lg md:text-2xl border-4 border-orange-300 p-2 cursor-pointer font-bold"
                    onClick={() => navigate('/galeria')}
                >
                    Galería
                </button>
                <button
                    className="w-full md:w-1/4 text-center rounded-lg bg-amber-600 text-lg md:text-2xl border-4 border-orange-300 p-2 cursor-pointer font-bold"
                    onClick={() => navigate('/foro')}
                >
                    Foro
                </button>
            </div>
        </div>
    );
}