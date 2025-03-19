import { useContext } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserContext } from './Context/UserContext';
import Agenda from "./components/Agenda";
import Calendar from "./components/Calendar";
import Conócenos from "./components/Conocenos";
import Contacto from "./components/Contacto";
import CreaciónRuta from "./components/CreaciónRuta";
import Header from "./components/Header";
import Información from "./components/Información";
import Login from "./components/Login";
import ModificarUsuarios from "./components/ModificarUsuarios";
import Paypal from "./components/Paypal";
import Perfil from "./components/Perfil";
import Principal from "./components/Principal";
import Register from "./components/Register";
import Rutas from "./components/Rutas";
import TransaccionExitosa from "./components/TransaccionExitosa";
import RutasActivas from './components/RutasActivas';
import RutasAsignadas from './components/RutasAsignadas';
import Galeria from './components/Galeria';
import RutasReservadas from './components/RutasReservadas';

function App() {
  const profileContext = useContext(UserContext);
  const { Logged, profile } = profileContext;

  return (
    <Router>
      <div className="block bg-[url(https://t4.ftcdn.net/jpg/03/98/56/25/360_F_398562516_KRzXMRVHk6I7SUbbWhuWjggmykE6oYQy.jpg)] bg-cover min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rutas" element={<Rutas />} />
          <Route path="/agenda" element={Logged ? <Calendar /> : <Login />} />
          <Route path="/planes" element={Logged ? <Agenda /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/conocenos" element={<Conócenos />} />
          <Route path="/informacion" element={<Información />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/crearutas" element={Logged && profile && profile.type == "admin" ? <CreaciónRuta /> : <Login />} />
          <Route path="/modificarusuarios" element={Logged && profile && profile.type == "admin" ? <ModificarUsuarios /> : <Login />} />
          <Route path="/paypal" element={Logged ? <Paypal /> : <Login />} />
          <Route path="/exitosa" element={Logged ? <TransaccionExitosa /> : <Login />} />
          <Route path="/RutasActivas" element={<RutasActivas />} />
          <Route path="/RutasAsignadas" element={<RutasAsignadas />} />
          <Route path="/galeria" element={<Galeria/>}></Route>
          <Route path="/rutasreservadas" element={<RutasReservadas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;