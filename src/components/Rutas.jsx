import React from 'react';
import quebradaImg from '../assets/quebrada.png'; 
import sabasImg from '../assets/sabas.png';
import humboldtImg from '../assets/humboldt.png';
import picoImg from '../assets/pico.png';
import Card from './Card';

function Rutas(){
return (
    <>
    <div className="flex flex-col gap-6">  
        
        <h2 className="text-3xl font-bold mb-4 text-black-700 text-center">Organiza tu visita</h2>

        <Card
        title = "Quebrada Quintero"
        distance = "2,9 km"
        time = "30 minutos"
        location = "Ubicado en la trasversal 10 de Altamira"
        description= "Popular por sus caminos de agua y cascadas"
        imageUrl={quebradaImg}/>

        <Card
        title = "Sabas Nieves"
        distance = "3,58 km"
        time = "45 minutos"
        location = "Ubicado en la trasversal 10 de Altamira"
        description= "La ruta más conocida y visitada"
        imageUrl={sabasImg}/>

        <Card
        title = "Hotel Humboldt"
        distance = "9,99 km"
        time = "2 horas"
        location = "Ubicado en la Av. Boyacá, desde San Bernardino"
        description= "Ideal para las personas que buscan un mayor desafío"
        imageUrl={humboldtImg}/>

        <Card
        title = "Pico Naiguatá"
        distance = "8,95 km"
        time = "4 horas"
        location = "Ubicado en la Av. Boyacá, desde la entrada de El Marquez"
        description= "Conocida por su gran dificultad"
        imageUrl={picoImg}/>

    </div>
    </>
);
};

export default Rutas;