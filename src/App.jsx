import React, { useState } from 'react';
import Header from "./components/Header"
import Principal from "./components/Principal";
import Login from "./components/Login";
import Rutas from "./components/Rutas";

function App() {
  const [CurrentComponent, setCurrentComponent] = useState('Principal');
  return <div className="block bg-[url(https://t4.ftcdn.net/jpg/03/98/56/25/360_F_398562516_KRzXMRVHk6I7SUbbWhuWjggmykE6oYQy.jpg)] bg-cover min-h-screen">
    <Header/>
    {currentComponent === 'Principal' && (
      <Principal onNavigate={() => setCurrentComponent('Login')} />)}
    {currentComponent === 'Login' && (
      <Login onNavigate={() => setCurrentComponent('Principal')} />)}
    {currentComponent === 'Rutas' && (
      <Principal onNavigate={() => setCurrentComponent('Login')} />)}
    </div>
}

export default App;