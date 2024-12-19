import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { getItem, setItem } from "../../services/localStorage";

const Catalogo = () => {

    const [produtos, setProdutos] = useState([]);
    const [carrinho, setCarrinho] = useState( getItem("carrinho") || []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/produtos");
                setProdutos(response.data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchData();
    }, []);

    const handleClick = (obj) => {
        const element = carrinho.find((produto) => produto._id === obj._id);
        if(element) {
            const arrayFilter = carrinho.filter((produto) => produto._id !== obj._id);
            setCarrinho(arrayFilter);
            setItem("carrinho", arrayFilter);
        } else {
            setCarrinho([...carrinho, obj]);
            setItem("carrinho", [...carrinho, obj]);
        }
    }

    return (
        <div className="catalogo">
            <div className="card-container">
                {produtos.map((produto) => {
                    return (
                        <div key={produto._id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{produto.nome}</h5>
                                <button href="#" className="btn btn-primary" onClick={() => handleClick(produto)}>
                                    {
                                        carrinho.some((itemCarrinho) => itemCarrinho._id === produto._id) ? (
                                            "Remover do carrinho"
                                        ) : (
                                            "Adicionar ao carrinho"
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Link to="/carrinho">Ir para o carrinho</Link>
        </div>
    )
}

export default Catalogo;