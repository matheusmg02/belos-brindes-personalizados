import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Home from './pages/Home';

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/cadastro" element={<Cadastro />}></Route>
                <Route path="/login" element={<Login />}></Route>  
                <Route path="/home" element={<Home />}></Route>              
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;