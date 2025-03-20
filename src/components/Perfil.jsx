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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, photoURL: reader.result });
            };
            reader.readAsDataURL(file);
        }
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
        <div className="flex justify-center items-center min-h-screen p-4 md:p-8">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Perfil</h2>
                <div className="mb-4 text-center">
                    <label htmlFor="photoInput" className="cursor-pointer">
                        {formData.photoURL ? (
                            <img src={formData.photoURL} alt="Foto de perfil" className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto" />
                        ) : (
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                                <span className="text-gray-500">Sin foto</span>
                            </div>
                        )}
                    </label>
                    <input
                        id="photoInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
                {editMode ? (
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm md:text-base">Nombre:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm md:text-base">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm md:text-base">Teléfono:</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded text-sm md:text-base">
                                Guardar
                            </button>
                            <button onClick={handleCancel} className="bg-gray-500 text-white p-2 rounded text-sm md:text-base">
                                Cancelar
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="text-sm md:text-base"><strong>Nombre:</strong> {formData.name || 'No disponible'}</p>
                        <p className="text-sm md:text-base"><strong>Email:</strong> {formData.email || 'No disponible'}</p>
                        <p className="text-sm md:text-base"><strong>Teléfono:</strong> {formData.phoneNumber || 'No disponible'}</p>
                        <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white p-2 rounded mt-4 text-sm md:text-base">
                            Editar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}