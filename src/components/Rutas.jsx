import React, { useState } from 'react';
import humboldtImg from '../assets/humboldt.png';
import picoImg from '../assets/pico.png';
import quebradaImg from '../assets/quebrada.png';
import sabasImg from '../assets/sabas.png';
import Card from './Card';

function Rutas() {
    const [reseñas, setReseñas] = useState({
        quebrada: [],
        sabas: [],
        humboldt: [],
        pico: [],
    });

    const [rutaSeleccionada, setRutaSeleccionada] = useState(null);

    const BadWord = (texto) => {
        const palabrasProhibidas = ['Mamaguevo', 'Coño', 'Pendejo', 'Puto', 'Marico', 'Culo', 'Verga', 'Chupalo', 'Chupasela', 'Carajo', 'Mierda', 'Puta', 'Pajuo', 'Chavista', 'Mojonero', 'Aguevoniado', 'Maldito', 'Maldita', 'mamaguevo', 'coño', 'pendejo', 'puto', 'marico', 'culo', 'verga', 'chupalo', 'chupasela', 'carajo', 'mierda', 'puta', 'pajuo', 'chavista', 'mojonero', 'aguevoniado', 'maldito', 'maldita'];
        return palabrasProhibidas.some(palabra =>
            texto.toLowerCase().includes(palabra.toLowerCase())
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const comentario = formData.get('comentario');
        const puntuacion = formData.get('puntuacion');

        if (!comentario.trim()) {
            alert('Por favor, escribe un comentario.');
            return;
        }

        if (puntuacion < 1 || puntuacion > 5) {
            alert('La puntuación debe ser entre 1 y 5.');
            return;
        }

        if (BadWord(comentario)) {
            alert('Tu reseña contiene lenguaje inapropiado. Por favor, edítala.');
            return;
        }

        const nuevaReseña = {
            comentario: comentario,
            puntuacion: puntuacion,
        };

        setReseñas((prevReseñas) => ({
            ...prevReseñas,
            [rutaSeleccionada]: [...prevReseñas[rutaSeleccionada], nuevaReseña],
        }));

        e.target.reset();
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-2 text-black-700 text-center">Organiza tu visita</h2>
            <p className="text-lg text-black text-center mb-4">Haz clic en cualquier ruta para dejar tu reseña</p>

            <div onClick={() => setRutaSeleccionada('quebrada')} className="cursor-pointer mb-4">
                <Card
                    title="Quebrada Quintero"
                    distance="2,9 km"
                    time="30 minutos"
                    location="Ubicado en la trasversal 10 de Altamira"
                    description="Popular por sus caminos de agua y cascadas"
                    imageUrl={quebradaImg}
                />
            </div>

            <div onClick={() => setRutaSeleccionada('sabas')} className="cursor-pointer mb-4">
                <Card
                    title="Sabas Nieves"
                    distance="3,58 km"
                    time="45 minutos"
                    location="Ubicado en la trasversal 10 de Altamira"
                    description="La ruta más conocida y visitada"
                    imageUrl={sabasImg}
                />
            </div>

            <div onClick={() => setRutaSeleccionada('humboldt')} className="cursor-pointer mb-4">
                <Card
                    title="Hotel Humboldt"
                    distance="9,99 km"
                    time="2 horas"
                    location="Ubicado en la Av. Boyacá, desde San Bernardino"
                    description="Ideal para las personas que buscan un mayor desafío"
                    imageUrl={humboldtImg}
                />
            </div>

            <div onClick={() => setRutaSeleccionada('pico')} className="cursor-pointer mb-4">
                <Card
                    title="Pico Naiguatá"
                    distance="8,95 km"
                    time="4 horas"
                    location="Ubicado en la Av. Boyacá, desde la entrada de El Marquez"
                    description="Conocida por su gran dificultad"
                    imageUrl={picoImg}
                />
            </div>

            {rutaSeleccionada && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-2xl font-bold mb-4">Deja tu reseña</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Puntuación (1-5):</label>
                                <input
                                    type="number"
                                    name="puntuacion"
                                    min="1"
                                    max="5"
                                    className="w-20 p-2 border-2 border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Comentario:</label>
                                <textarea
                                    name="comentario"
                                    placeholder="Escribe tu reseña aquí..."
                                    className="w-full p-2 border-2 border-gray-300 rounded-lg"
                                    rows="3"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-amber-600 text-white text-xl font-bold py-2 px-4 rounded-lg hover:bg-amber-700"
                            >
                                Enviar Reseña
                            </button>
                        </form>

                        <div className="mt-6">
                            <h4 className="text-xl font-bold mb-2">Reseñas</h4>
                            {reseñas[rutaSeleccionada].length === 0 ? (
                                <p className="text-gray-500">No hay reseñas aún. ¡Sé el primero en dejar una!</p>
                            ) : (
                                <ul className="space-y-4">
                                    {reseñas[rutaSeleccionada].map((reseña, index) => (
                                        <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                            <p className="font-bold">Puntuación: {reseña.puntuacion}/5</p>
                                            <p>{reseña.comentario}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <button
                            onClick={() => setRutaSeleccionada(null)}
                            className="mt-4 bg-gray-600 text-white text-xl font-bold py-2 px-4 rounded-lg hover:bg-gray-700"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Rutas;