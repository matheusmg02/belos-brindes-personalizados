import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css"

const Pedido = () => {
    const [pedido, setPedido] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/pedido/${id}`);
                setPedido(response.data);
            } catch (error) {
                console.error("Error while fetching data", error);
            }
        };
        fetchData();
    }, [id]);

    if (!pedido) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>Pedido {pedido._id}</h1>
            <ul>
                {pedido.produtos && pedido.produtos.length > 0 ? (
                    pedido.produtos.map((produto) => (
                        <li key={produto._id}>
                            <strong>Produto:</strong> {produto.nome_produto} <br />
                            <strong>Quantidade:</strong> {produto.quantidade}
                        </li>
                    ))
                ) : (
                    <p>Nenhum produto encontrado neste pedido.</p>
                )}
            </ul>
        </div>
    );
};

export default Pedido;
