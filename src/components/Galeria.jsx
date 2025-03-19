import React from 'react';
import Humboldt from '../assets/humboldt.jpeg';
import LomaSerrano from '../assets/lomaserrano.jpeg';
import Paisaje from '../assets/paisaje.jpeg';
import Selva from '../assets/selva.jpeg';
import Selva2 from '../assets/selva2.jpeg';
import Torre from '../assets/torre.jpeg';
import './styles.css';

export default function Galeria() {
    return (
        <div className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/ruta/al/fondo/principal.jpg)' }}>
            <div className="container mx-auto py-10">
                <div className='flex flex-col items-center gap-10'>
                    <div className='flex flex-row gap-10'>
                        <img src={Humboldt} alt="humboldt" className='w-64 h-64 object-cover rounded-lg border-4 border-white shadow-lg' />
                        <img src={LomaSerrano} alt="lomaSerrano" className='w-64 h-64 object-cover rounded-lg border-4 border-white shadow-lg' />
                    </div>
                    <div className='flex flex-row gap-10'>
                        <img src={Paisaje} alt="paisaje" className='w-64 h-64 object-cover rounded-lg border-4 border-white shadow-lg' />
                        <img src={Selva} alt="selva" className='w-64 h-64 object-cover rounded-lg border-4 border-white shadow-lg' />
                    </div>
                    <div className='flex flex-row gap-10'>
                        <img src={Selva2} alt="selva2" className='w-64 h-64 object-cover rounded-lg border-4 border-white shadow-lg' />
                        <img src={Torre} alt="torre" className='w-64 h-64 object-cover rounded-lg border-4 border-white shadow-lg' />
                    </div>
                </div>
            </div>
        </div>
    );
}