import React from 'react';

function Card({ title, distance, time, location, description, imageUrl }) {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-110">
            <div className="flex">
                <div className="space-y-1 text-gray-600 md:w-1/2">
                <h3 className="text-3xl font-bold mb-2 text-green-700">{title}</h3>
                    <p><span className="font-semibold">{distance}</span></p>
                    <p>Tiempo promedio: {time}</p>
                    <p>{location}</p>
                    <p>{description}</p>
                </div>
                <div className="md:w-1/2">
                    <img 
                        src={imageUrl} 
                        alt={title} 
                        className="w-full object-cover rounded-3xl shadow-xl" 
                    />
                </div>
            </div>
        </div>
    );
}

export default Card;