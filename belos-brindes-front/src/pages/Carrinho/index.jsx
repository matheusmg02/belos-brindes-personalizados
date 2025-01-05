import { useState } from "react";
import { getItem, setItem } from "../../services/localStorage";
import axios from "axios";
import "./style.css";

const Carrinho = () => {
    const [produtos, setProdutos] = useState(getItem("carrinho") || []);
    const [quantidades, setQuantidades] = useState({});

    const handleQuantidadeChange = (id, quantidade) => {
        setQuantidades((prev) => ({
            ...prev,
            [id]: quantidade,
        }));
    };

    const removeItem = (obj) => {
        const arrayFilter = produtos.filter((produto) => produto._id !== obj._id);
        setProdutos(arrayFilter);
        setItem("carrinho", arrayFilter);

        setQuantidades((prev) => {
            const updated = { ...prev };
            delete updated[obj._id];
            return updated;
        });
    };

    const criarPedido = (e) => {
        e.preventDefault();

        const pedidoProdutos = produtos.map((produto) => ({
            id_produto: produto._id,
            nome_produto: produto.nome,
            quantidade: quantidades[produto._id] || 0,
        }));

        axios
            .post("http://localhost:3000/api/pedido", { produtos: pedidoProdutos })
            .then((result) => console.log(result.data))
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <h1>Carrinho</h1>
            <div className="container-produto">
                {produtos.map((produto) => {
                    return (
                        <div key={produto._id}>
                            <h5 className="titulo-produto">{produto.nome}</h5>
                            <p className="descricao-produto">{produto.descricao}</p>
                            <input
                                className="input-qtd"
                                type="text"
                                name="quantidade"
                                placeholder="Qtd"
                                value={quantidades[produto._id] || ""}
                                onChange={(e) => handleQuantidadeChange(produto._id, e.target.value)}
                            />
                            <button
                                className="btn btn-primary"
                                onClick={() => removeItem(produto)}
                            >
                                Remover do carrinho
                            </button>
                        </div>
                    );
                })}
            </div>
            <button
                className="btn btn-success btn-compra"
                onClick={(e) => criarPedido(e)}
            >
                Confirmar Compra
            </button>
        </div>
    );
};

export default Carrinho;
