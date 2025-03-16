import './styles.css';
import React from 'react';
import InformacionCard from './InformacionCard';

export default function Información() {
    return (
        <div className="p-4">
            <h1 className="mx-auto w-1/4 text-center rounded-lg block bg-white text-3xl font-bold border-black border-4 mb-8">
                Información General
            </h1>

            <div className="flex justify-between w-full gap-8 col-span-1">
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
            <h1 className="mx-auto w-1/4 text-center col-span-1 rounded-lg block bg-amber-600 text-3xl border-6 border-orange-300 mb-8 mt-10 cursor-pointer font-bold ">
                Galería
            </h1>
        </div>
    );
}