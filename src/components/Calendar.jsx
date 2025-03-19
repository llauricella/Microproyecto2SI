import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore, getDoc, doc } from "firebase/firestore";
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import { app } from '../Credentials';

const db = getFirestore(app);
const auth = getAuth(app);

function Calendar() {
    const navigate = useNavigate();
    const profileContext = useContext(UserContext);
    const { Logged } = profileContext;
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [searchParams] = useSearchParams();
    const routeParam = searchParams.get("route");
    const decodedRouteParam = decodeURIComponent(routeParam);
    const priceParam = searchParams.get("price");
    const decodedPriceParam = decodeURIComponent(priceParam);
    const diffParam = searchParams.get("diff");
    const decodedDiffParam = decodeURIComponent(diffParam);
    const descriptionParam = searchParams.get("description");
    const decodedDescriptionParam = decodeURIComponent(descriptionParam);
    const imageUrlParam = searchParams.get("imageURL");
    const decodedImageUrlParam = decodeURIComponent(imageUrlParam);
    const [rutas, setRutas] = useState([]);

    useEffect(() => {
        if (routeParam) {
            const fetchRutas = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, "routes"));
                    const rutasList = querySnapshot.docs
                        .map(doc => ({ id: doc.id, ...doc.data() }))
                        .filter(ruta => String(ruta.destino) === String(decodedRouteParam));
                    setRutas(rutasList);
                } catch (error) {
                    console.error("Error al obtener las rutas:", error.message);
                }
            };
            fetchRutas();
        }
    }, [routeParam]);

    function generateDays() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayMonth = new Date(year, month, 1).getDay();
        const lastDateMonth = new Date(year, month + 1, 0).getDate();
        const lastDateOfLastMonth = new Date(year, month, 0).getDate();
        const days = [];

        for (let i = firstDayMonth; i > 0; i--) {
            const date = new Date(year, month - 1, lastDateOfLastMonth - i + 1);
            days.push({ date: date.getDate(), dateObj: date, isCurrentMonth: false });
        }

        for (let i = 1; i <= lastDateMonth; i++) {
            const date = new Date(year, month, i);
            days.push({ date: i, dateObj: date, isCurrentMonth: true });
        }

        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            const date = new Date(year, month + 1, i);
            days.push({ date: i, dateObj: date, isCurrentMonth: false });
        }

        return days;
    }


    const days = generateDays();

    const isToday = (dateObj) => {
        const today = new Date();
        return dateObj.toDateString() === today.toDateString();
    };

    const DateClick = (dateObj) => {
        setSelectedDate(dateObj);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const route = rutas.find(ruta => {
            const rutaDate = new Date(ruta.fecha);
            rutaDate.setDate(rutaDate.getDate() + 1);
            return rutaDate.toDateString() === dateObj.toDateString() && rutaDate > today;
        });

        if (route) {
            setSelectedRoute(route);
        } else {
            setSelectedRoute(null);
        }
    };

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

    const handlePagarConPaypal = () => {
        if (Logged) {
            const user = auth.currentUser;

            if (!user) {
                console.error("No se encontró un usuario autenticado.");
                return;
            }

            if (!selectedRoute) {
                alert("Por favor, selecciona una ruta antes de continuar.");
                return;
            }

            const fetchUserType = async () => {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        if (userData.type !== "cliente") {
                            alert("Solo los clientes pueden reservar rutas.");
                            return;
                        }

                        navigate("/paypal", {
                            state: {
                                selectedRoute: {
                                    destino: selectedRoute.destino,
                                    precio: selectedRoute.precio,
                                    tipo: selectedRoute.tipo,
                                    guia: selectedRoute.guia,
                                    descripcion: selectedRoute.descripcion,
                                    dificultad: selectedRoute.dificultad,
                                    imagen: selectedRoute.imagen,
                                    fecha: selectedRoute.fecha,
                                },
                            },
                        });
                    } else {
                        console.error("No se encontró el documento del usuario.");
                    }
                } catch (error) {
                    console.error("Error al verificar el tipo de usuario:", error.message);
                }
            };

            fetchUserType();
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <div id="Encabezado" className="flex justify-between items-center mb-4">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer text-xl">
                    ←
                </button>
                <h2 className="font-semibold text-xl text-gray-800">
                    {currentDate.toLocaleString('default', { month: 'long' }).toUpperCase()} {currentDate.getFullYear()}
                </h2>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer text-xl">
                    →
                </button>
            </div>

            {selectedRoute && (
                <div id="ruta-info" className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
                    <h3 className="text-lg font-bold">Información de la Ruta</h3>
                    <p><strong>Destino:</strong> {selectedRoute.destino}</p>
                    <p><strong>Fecha:</strong> {new Date(new Date(selectedRoute.fecha).setDate(new Date(selectedRoute.fecha).getDate() + 1)).toLocaleDateString()}</p>
                    <p><strong>Tipo:</strong> {selectedRoute.tipo}</p>
                    <p><strong>Guía:</strong> {selectedRoute.guia}</p>

                    <button
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
                        onClick={() => handlePagarConPaypal()}
                    >
                        Confirmar evento
                    </button>
                </div>
            )}

            <div id="semana" className="grid grid-cols-7 gap-1 mb-2">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                    <div key={day} className="text-center text-sm text-gray-600 font-medium">
                        {day}
                    </div>
                ))}
            </div>

            <div id="mes" className="grid grid-cols-7 gap-1">
                {days.map(day => {
                    const isSelected = selectedDate?.toDateString() === day.dateObj.toDateString();
                    const isRutaDate = rutas.some(ruta => {
                        const rutaDate = new Date(ruta.fecha);
                        rutaDate.setDate(rutaDate.getDate() + 1);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return rutaDate.toDateString() === day.dateObj.toDateString() && rutaDate >= today;
                    });

                    const isRutaToday = rutas.some(ruta => {
                        const rutaDate = new Date(ruta.fecha);
                        rutaDate.setDate(rutaDate.getDate() + 1);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return rutaDate.toDateString() === today.toDateString();
                    });

                    return (
                        <div
                            key={day.dateObj.toISOString()}
                            onClick={() => DateClick(day.dateObj)}
                            className={`text-center p-2 rounded-full text-sm cursor-pointer transition-colors
                                ${day.isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}
                                ${isRutaToday && isToday(day.dateObj) ? 'bg-blue-500 text-white hover:bg-blue-700' : 'hover:bg-gray-100'}
                                ${isRutaDate && !isToday(day.dateObj) ? 'bg-green-500 text-white hover:bg-green-600' : ''}
                                ${isToday(day.dateObj) && !isSelected && !isRutaToday ? 'bg-blue-500 text-white hover:bg-blue-700' : ''}
                                ${isSelected ? 'bg-green-900 text-white hover:bg-green-600' : ''}`}
                        >
                            {day.date}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Calendar;