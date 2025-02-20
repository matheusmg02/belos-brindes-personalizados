import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";

const Pedidos = () => {
    const fetchPedidos = async () => {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/pedidos", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    };

    const { data: pedidos, isLoading, isError, error } = useQuery({
        queryKey: ["pedidos"],
        queryFn: fetchPedidos,
    });

    if (isLoading) return <div>Carregando...</div>;
    if (isError) return <div>Erro: {error.message}</div>;

    // return (
    //     <div className="main-container">
    //         <div className="container-pedidos">
    //             {pedidos.map((pedido) => (
    //                 <p key={pedido._id}>
    //                     Pedido com o id: <Link to={`/pedido/${pedido._id}`}>{pedido._id}</Link>
    //                 </p>
    //             ))}
    //         </div>
    //     </div>
    // );

    return (
        <div className="tabela-pedidos">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Id do pedido</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((pedido) => {
                        return (
                            <tr key={pedido._id}>
                                <td><Link to={`/pedido/${pedido._id}`}>{pedido._id}</Link></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Pedidos;