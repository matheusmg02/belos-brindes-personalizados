import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

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

    return (
        <div className="main-container">
            <div className="container-pedidos">
                {pedidos.map((pedido) => (
                    <p key={pedido._id}>
                        Pedido com o id: <Link to={`/pedido/${pedido._id}`}>{pedido._id}</Link>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Pedidos;