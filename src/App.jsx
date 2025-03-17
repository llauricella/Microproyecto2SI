import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useContext} from 'react';
import { UserContext } from './Context/userContext';
import Header from "./components/Header";
import Principal from "./components/Principal";
import Login from "./components/Login";
import Rutas from "./components/Rutas";
import Calendar from "./components/Calendar";
import Agenda from "./components/Agenda";
import Register from "./components/Register";
import Información from "./components/Información";
import Perfil from "./components/Perfil";
import Contacto from "./components/Contacto";
import CreaciónRuta from "./components/CreaciónRuta";
import ModificarUsuarios from "./components/ModificarUsuarios";
import Conócenos from "./components/Conocenos";
import Paypal from "./components/Paypal";

function App() {
  const profileContext = useContext(UserContext);
  const { Logged, profile } = profileContext;

  return (
    <Router> 
      <div className="block bg-[url(https://t4.ftcdn.net/jpg/03/98/56/25/360_F_398562516_KRzXMRVHk6I7SUbbWhuWjggmykE6oYQy.jpg)] bg-cover min-h-screen">
        <Header/>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rutas" element={<Rutas />} />
          <Route path="/agenda" element={Logged ? <Calendar /> : <Login />} />
          <Route path="/planes" element={Logged ? <Agenda /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/conocenos" element={<Conócenos />} />
          <Route path="/informacion" element={<Información/>} />
          <Route path="/perfil" element={<Perfil/>} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/crearutas" element={Logged && profile && profile.type == "admin" ? <CreaciónRuta /> : <Login />} />
          <Route path="/modificarusuarios" element={Logged && profile && profile.type == "admin" ? <ModificarUsuarios /> : <Login />} />
          <Route path="/paypal" element={Logged ? <Paypal /> : <Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;