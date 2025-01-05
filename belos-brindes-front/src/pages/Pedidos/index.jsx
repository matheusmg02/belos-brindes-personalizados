import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Pedidos = () => {

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/api/pedidos", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setPedidos(response.data);
                console.log(pedidos);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="main-container">
            <div className="container-pedidos">
                {pedidos.map((pedido) => {
                    return(
                        <p>Pedido com o id: <Link to={`/pedido/${pedido._id}`}>{pedido._id}</Link></p>
                    )
                })}
            </div>
        </div>
    )
}
    
export default Pedidos;