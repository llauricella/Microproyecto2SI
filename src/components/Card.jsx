import React from 'react';

function Card({ title, distance, time, location, description, imageUrl }) {
    return (
        <div className="max-w-2xl mx-auto p-4 md:p-6 bg-white rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-105">
            <div className="flex flex-col md:flex-row">
                <div className="space-y-2 text-gray-600 w-full md:w-1/2 mb-4 md:mb-0">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-green-700">{title}</h3>
                    <p><span className="font-semibold">{distance}</span></p>
                    <p>Tiempo promedio: {time}</p>
                    <p>{location}</p>
                    <p>{description}</p>
                </div>
                <div className="w-full md:w-1/2">
                    <img 
                        src={imageUrl} 
                        alt={title} 
                        className="w-full h-48 md:h-full object-cover rounded-3xl shadow-xl" 
                    />
                </div>
            </div>
        </div>
    );
}

export default Card;