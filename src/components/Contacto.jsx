import './styles.css'
import React from 'react'

export default function Contacto() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h1 className="text-3xl font-bold mb-4 text-center">Contacto</h1>
                <div className="mb-4">
                    <p><strong>Correo Electrónico:</strong> avilaguide@gmail.com</p>
                </div>
                <div className="mb-4">
                    <p><strong>Teléfono:</strong> 0424-1671440</p>
                </div>
                <div className="mb-4">
                    <p><strong>Ubicación:</strong> Ditribuidor metropolitano Caracas, 1060, Miranda</p>
                </div>
            </div>
        </div>
    )
}