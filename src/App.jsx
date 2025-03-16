import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header"
import Principal from "./components/Principal";
import Login from "./components/Login";
import Rutas from "./components/Rutas";
import Calendar from "./components/Calendar"
import Agenda from "./components/Agenda";
import Register from "./components/Register"
import Guias from "./components/Guias"
import Información from "./components/Información";
import Perfil from "./components/Perfil";
import Contacto from "./components/Contacto";

function App() {
  return (
  <Router> 
  <div className="block bg-[url(https://t4.ftcdn.net/jpg/03/98/56/25/360_F_398562516_KRzXMRVHk6I7SUbbWhuWjggmykE6oYQy.jpg)] bg-cover min-h-screen">
    <Header/>
        <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rutas" element={<Rutas />} />
        <Route path="/agenda" element={<Calendar />} />
        <Route path="/planes" element={<Agenda />} />
        <Route path="/register" element={<Register />} />
        <Route path="/guias" element={<Guias />} />
        <Route path="/informacion" element={<Información/>} />
        <Route path="/perfil" element={<Perfil/>} />
        <Route path="/contacto" element={<Contacto/>} />
        </Routes>
  </div>
  </Router>
)}

export default App