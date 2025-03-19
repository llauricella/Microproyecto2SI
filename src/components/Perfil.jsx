import './styles.css';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';

export default function Perfil() {
    const { profile, updateProfile } = useContext(UserContext);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        photoURL: ''
    });

    useEffect(() => {
        setFormData({
            name: profile.name || '',
            email: profile.email || '',
            phoneNumber: profile.phoneNumber || '',
            photoURL: profile.photoURL || ''
        });
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        updateProfile(formData); 
        setEditMode(false);
    };

    const handleCancel = () => {
        setFormData({
            name: profile.name || '',
            email: profile.email || '',
            phoneNumber: profile.phoneNumber || '',
            photoURL: profile.photoURL || ''
        });
        setEditMode(false);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className={`bg-white p-6 rounded-lg shadow-lg ${editMode ? 'mt-10 w-96' : 'mt-[-20%] w-80'}`}>
                <h2 className="text-2xl font-bold mb-4">Perfil</h2>
                <div className="mb-4">
                    {formData.photoURL ? (
                        <img src={formData.photoURL} alt="Foto de perfil" className="w-24 h-24 rounded-full mx-auto" />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                            <span className="text-gray-500">Sin foto</span>
                        </div>
                    )}
                </div>
                {editMode ? (
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Nombre:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Teléfono:</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Foto URL:</label>
                            <input
                                type="text"
                                name="photoURL"
                                value={formData.photoURL}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
                            Guardar
                        </button>
                        <button onClick={handleCancel} className="bg-gray-500 text-white p-2 rounded ml-2">
                            Cancelar
                        </button>
                    </div>
                ) : (
                    <div>
                        <p><strong>Nombre:</strong> {formData.name || 'No disponible'}</p>
                        <br/>
                        <p><strong>Email:</strong> {formData.email || 'No disponible'}</p>
                        <br/>
                        <p><strong>Teléfono:</strong> {formData.phoneNumber || 'No disponible'}</p>
                        <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white p-2 rounded mt-4">
                            Editar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}