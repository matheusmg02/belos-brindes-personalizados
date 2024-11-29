import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css"
import { Link } from "react-router-dom";

const ListaProdutos = () => {

    const [produtos, setProdutos] = useState([]);
    useEffect(() => {
        const chamarDados = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/produtos");
                setProdutos(response.data);
            } catch (error) {
                console.log("Erro ao chamar os dados", error);
            }
        };
        chamarDados();
    }, []);
 
    const deletarProduto = async (produtoId) => {
        await axios
        .delete(`http://localhost:3000/api/produto/${produtoId}`)
        .then(() => {
            setProdutos((produtoDeletado) => produtoDeletado.filter((produto) => produto._id !== produtoId))
        })
        .catch(err => alert(err))
    }

    return (
        <div className="tabelaProdutos">
            <Link to="/cadastroproduto" type="button" className="btn btn-primary">
                Adicionar Produto <i className="fa-solid fa-user-plus"></i>
            </Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Qtd Disponível</th>
                        <th scope="col">Descrição do produto</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto)=> {
                        return (
                        <tr key={produto._id}>
                            <td>{produto.nome}</td>
                            <td>{produto.qtd_estoque}</td>
                            <td>{produto.descricao}</td>
                            <td className="acoes">
                                <Link title="Editar Produto" to={`/editarproduto/${produto._id}`}>
                                    <button type="button" className="btn btn-info">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </Link>
                                <button title="Deletar Produto" onClick={() => deletarProduto(produto._id)} type="button" className="btn btn-danger">
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ListaProdutos;