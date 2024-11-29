import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import HomeADM from "./pages/HomeADM";
import EditarPerfil from "./pages/EditarPerfil";
import ListaProdutos from './pages/ListaProdutos';
import CadastroProduto from './pages/CadastroProduto';
import EditarProduto from './pages/EditarProduto'
import Catalogo from "./pages/Catalogo";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/cadastro" element={<Cadastro />}></Route>
                <Route path="/login" element={<Login />}></Route>  
                <Route path="/homeadm" element={<HomeADM />}></Route>  
                <Route path="/editarperfil/:id" element={<EditarPerfil />}></Route>  
                <Route path="/listaprodutos" element={<ListaProdutos />}></Route>              
                <Route path="/cadastroproduto" element={<CadastroProduto />}></Route>    
                <Route path="/editarproduto/:id" element={<EditarProduto />}></Route>    

                <Route path="/" element={<Catalogo />}></Route>    

            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;