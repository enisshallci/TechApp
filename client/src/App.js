<<<<<<< Updated upstream
import React from "react";

import {BrowserRouter, Routes, Route} from "react-router-dom"      
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/register" element={<RegisterPage />} />     
  
        </Routes>
        </BrowserRouter>
    );
}


export default App;








=======
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Contact } from './pages/contact/Contact';
import Home from './pages/home/Home';
import About from './pages/about/About';
import { Nav } from './pages/nav/Nav';
import { Footer } from './pages/footer/Footer';
import { Shop } from './pages/shop/Shop';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
>>>>>>> Stashed changes
