import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar páginas
import Home from './Pages/Home/home.jsx';
import Login from './Pages/Login/login.jsx';



function App() {
  return (
    <Router>  
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
