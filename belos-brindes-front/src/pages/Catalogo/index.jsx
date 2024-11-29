import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css"

const Catalogo = () => {

    const [produtos, setProdutos] = useState([]);
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

    const [carrinho, setCarrinho] = useState([]);

    return (
        <div className="catalogo">
            
            <div className="card-container">
                {produtos.map((produto) => {
                    return (
                        <div className="card">
                            {/* <img className="card-img-top" src=".../100px180/" alt="Card image cap"/> */}
                            <div className="card-body">
                                <h5 className="card-title">{produto.nome}</h5>
                                <button href="#" className="btn btn-primary">Adicionar no orçamento</button>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="carrinho">
                <h2 className="title-carrinho">Carrinho</h2>
            </div>

        </div>
    )
}

export default Catalogo;