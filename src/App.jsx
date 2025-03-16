import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header"
import Principal from "./components/Principal";
import Login from "./components/Login";
import Rutas from "./components/Rutas";
import Register from "./components/Register"

function App() {
  return (
  <Router> 
  <div className="block bg-[url(https://t4.ftcdn.net/jpg/03/98/56/25/360_F_398562516_KRzXMRVHk6I7SUbbWhuWjggmykE6oYQy.jpg)] bg-cover min-h-screen">
    <Header/>
        <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rutas" element={<Rutas />} />
        <Route path="/register" element={<Register />} />
        </Routes>
  </div>
  </Router>
)}

export default App