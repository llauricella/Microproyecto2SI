import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Humboldt from "../assets/humboldt.jpeg";
import LomaSerrano from "../assets/lomaserrano.jpeg";
import Paisaje from "../assets/paisaje.jpeg";
import Selva from "../assets/selva.jpeg";
import Selva2 from "../assets/selva2.jpeg";
import Torre from "../assets/torre.jpeg";
import "./styles.css";

export default function Galeria() {
    const navigate = useNavigate();
    const location = useLocation();
    const profileContext = useContext(UserContext);
    const { Logged, profile } = profileContext;

    const [images, setImages] = useState([
        { src: Humboldt, alt: "humboldt" },
        { src: LomaSerrano, alt: "lomaSerrano" },
        { src: Paisaje, alt: "paisaje" },
        { src: Selva, alt: "selva" },
        { src: Selva2, alt: "selva2" },
        { src: Torre, alt: "torre" }
    ]);

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    const isAdmin = profile?.type === "admin";

    const openEditor = (index) => {
        if (isAdmin) {
            setSelectedIndex(index);
            setIsEditorOpen(true);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            setImages((prevImages) =>
                prevImages.map((img, i) => (i === selectedIndex ? { ...img, src: newImageUrl } : img))
            );
            setIsEditorOpen(false);
        }
    };

    return (
        <div className="bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: "url(/ruta/al/fondo/principal.jpg)" }}>
            <div className="container mx-auto py-10">
                <div className="grid grid-cols-2 gap-6 px-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-64 object-cover rounded-lg border-4 border-white shadow-lg"
                            />
                            {isAdmin && (
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition cursor-pointer"
                                    onClick={() => openEditor(index)}
                                >
                                    <span className="text-white font-semibold">Editar</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {isEditorOpen && isAdmin && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg">
                        <h2 className="text-lg font-semibold mb-4">Selecciona una nueva imagen</h2>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
                        <div className="flex gap-4">
                            <button className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition" onClick={() => setIsEditorOpen(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
