import { useState } from "react";
import { getItem, setItem } from "../../services/localStorage";
import "./style.css";

const Carrinho = () => {
    const [produtos, setProdutos] = useState(getItem("carrinho") || []);
    console.log(produtos);

    const removeItem = (obj) => {
        const arrayFilter = produtos.filter((produto) => produto._id !== obj._id);
        setProdutos(arrayFilter);
        setItem("carrinho", arrayFilter);
    }

    return (
        <div>
            <h1>Carrinho</h1>
            <div className="container-produto">
                {produtos.map((produto) => {
                    return (
                        <div key={produto._id} >
                            <h5 className="titulo-produto">{produto.nome}</h5>
                            <p className="descricao-produto">{produto.descricao}</p>
                            <button className="btn btn-primary" onClick={() => removeItem(produto)}>Remover do carrinho</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Carrinho;