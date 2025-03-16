import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from './Card';


function Planes() {
        const [searchParams] = useSearchParams();
        const action = searchParams.get('action');
        const dateParam = searchParams.get('date');
        const selectedDate = dateParam ? new Date(dateParam) : null;
      
        return (
            <div className="flex justify-center">
                <div className="p-4 bg-white w-xl rounded-xl">
                    <h1 className="text-2xl font-bold mb-4">
                    {action === 'add' ? 'Agregar' : 'Quitar'} Evento
                    </h1>
                    {selectedDate && (
                    <p className="text-gray-600">
                        {selectedDate.toLocaleDateString()}
                    </p>
                    )}

                </div>
          </div>
        );
      };


export default Planes