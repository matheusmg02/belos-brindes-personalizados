import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import "./style.css";
import { getItem, setItem } from "../../services/sessionStorage";

const Catalogo = () => {
    const [carrinho, setCarrinho] = useState(getItem("carrinho") || []);

    const fetchProdutos = async () => {
        const response = await axios.get("http://localhost:3000/api/produtos");
        return response.data;
    };

    const { data: produtos, isLoading, isError, error } = useQuery({
        queryKey: ["produtos"],
        queryFn: fetchProdutos,
    });
    
    const handleProduto = (obj) => {
        const element = carrinho.find((produto) => produto._id === obj._id);
        if (element) {
            const carrinhoFilter = carrinho.filter((produto) => produto._id !== obj._id);
            setCarrinho(carrinhoFilter);
            setItem("carrinho", carrinhoFilter);
        } else {
            setCarrinho([...carrinho, obj]);
            setItem("carrinho", [...carrinho, obj]);
        }
    };

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (isError) {
        return <div>Erro ao carregar os produtos: {error.message}</div>;
    }

    return (
        <div className="catalogo">
            <div className="card-container">
                {produtos.map((produto) => {
                    return (
                        <div key={produto._id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{produto.nome}</h5>
                                <button
                                    href="#"
                                    className="btn btn-primary"
                                    onClick={() => handleProduto(produto)}
                                >
                                    {carrinho.some((itemCarrinho) => itemCarrinho._id === produto._id)
                                        ? "Remover do carrinho"
                                        : "Adicionar ao carrinho"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Link to="/carrinho">Ir para o carrinho</Link>
        </div>
    );
};

export default Catalogo;