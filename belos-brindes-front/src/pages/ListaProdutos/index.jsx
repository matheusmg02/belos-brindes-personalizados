import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";

const ListaProdutos = () => {
    const queryClient = useQueryClient();

    const fetchProdutos = async () => {
        const response = await axios.get("http://localhost:3000/api/produtos");
        return response.data;
    };

    const { data: produtos, isLoading, isError, error } = useQuery({
        queryKey: ["produtos"],
        queryFn: fetchProdutos,
    });

    const deleteProduto = async (produtoId) => {
        const token = sessionStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/produto/${produtoId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    };

    const mutation = useMutation({
        mutationFn: deleteProduto,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["produtos"] });
        },
    });

    const deletarProduto = (produtoId) => {
        mutation.mutate(produtoId);
    };

    if (isLoading) return <div>Carregando...</div>;
    if (isError) return <div>Erro: {error.message}</div>;

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
                    {produtos.map((produto) => (
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
                                <button
                                    title="Deletar Produto"
                                    onClick={() => deletarProduto(produto._id)}
                                    type="button"
                                    className="btn btn-danger"
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaProdutos;