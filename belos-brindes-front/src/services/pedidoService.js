import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const gerarPedido = async(pedido) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/pedido`,
            pedido
        );
        return response.data;
    } catch (error) {
        throw new Error("Erro ao criar pedido");
    }
}