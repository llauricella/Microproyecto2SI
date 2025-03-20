import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Planes from './Planes';
import quebradaImg from '../assets/quebrada2.jpg'; 
import sabasImg from '../assets/sabasnieves.jpg';
import hotelImg from '../assets/humboldt2.jpg';
import picoImg from '../assets/piconaiguata.jpg';

function Agenda() {
    const [searchParams] = useSearchParams();
    const dateParam = searchParams.get('date');
    const selectedDate = dateParam ? new Date(dateParam) : null;

    return (
        <div className="flex justify-center px-4 md:px-8">
            <div className="p-4 bg-white w-full max-w-screen-lg rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
                    Agregar Evento
                </h1>
                {selectedDate && (
                    <p className="text-gray-600 text-center md:text-left">
                        {selectedDate.toLocaleDateString()}
                    </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                    <Planes 
                        title={'Quebrada Quintero'} 
                        diff="Facil" 
                        price="5"  
                        description="Un camino corto a una cascada espéctacular con vistas inolvidables." 
                        imageUrl={quebradaImg} 
                    />
                    <Planes 
                        title={'Sabas Nieves'} 
                        diff="Facil" 
                        price="5"  
                        description="Un camino terrenoso de gran popularidad donde se puede observar Caracas en todo su esplendor." 
                        imageUrl={sabasImg} 
                    />
                    <Planes 
                        title={'Hotel Humboldt'} 
                        diff="Medio" 
                        price="15"  
                        description="Un hermoso y selvático camino de aproximadamente dos horas." 
                        imageUrl={hotelImg} 
                    />
                    <Planes 
                        title={'Pico Naiguatá'} 
                        diff="Extremo" 
                        price="15"  
                        description="Un camino de gran calibre que requiere de los mejores senderistas." 
                        imageUrl={picoImg} 
                    />
                </div>
            </div>
        </div>
    );
}

export default Agenda;