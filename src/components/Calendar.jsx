import { useNavigate} from "react-router-dom";
import {use ,useContext, useState } from 'react';
import { UserContext } from '../Context/userContext';



function Calendar() {
    const navigate = useNavigate();
    const profileContext = useContext(UserContext);
    const { Logged, profile } = profileContext;
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    function generateDays(){
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
    };

    const addEvent = () => {
        if (selectedDate && Logged) {
            
        }
        else if (!Logged)(
            navigate("/login")
        )
    };

    const days = generateDays();

    const isToday = (dateObj) => {
        const today = new Date();
        return dateObj.toDateString() === today.toDateString();
    };

    const DateClick = (dateObj) => {
        setSelectedDate(dateObj);
    };

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">

    <div id = "Encabezado" className="flex justify-between items-center mb-4">
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

    {selectedDate && (
        <div id="eventos" className="flex gap-2 mb-4 justify-center">
        <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer" onClick={() => addEvent()}
        >
            Agregar evento
        </button>

        </div>
    )}

    <div id = "semana" className="grid grid-cols-7 gap-1 mb-2">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
        <div key={day} className="text-center text-sm text-gray-600 font-medium">
            {day}
        </div>
        ))}
    </div>

    <div id= "mes" className="grid grid-cols-7 gap-1">
        {days.map((day) => {
        const isSelected = selectedDate?.toDateString() === day.dateObj.toDateString();
        return (
            <div
            key={day.dateObj.toISOString()}
            onClick={() => DateClick(day.dateObj)}
            className={`text-center p-2 rounded-full text-sm cursor-pointer transition-colors
                ${day.isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}
                ${isToday(day.dateObj) && !isSelected ? 'bg-blue-500 text-white hover:bg-blue-700' : 'hover:bg-gray-100'}
                ${isSelected ? 'bg-green-500 text-white hover:bg-green-600' : ''}`}
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