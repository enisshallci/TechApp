
import React from "react";
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Contact } from './pages/contact/Contact';
import Home from './pages/home/Home';
import About from './pages/about/About';
import { Nav } from './pages/nav/Nav';
import { Footer } from './pages/footer/Footer';
import { Shop } from './pages/shop/Shop';
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/shop" element={<Shop />} />
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;