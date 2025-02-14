import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const cadastrarProduto = async(dadosProduto) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await axios.post(
            `${API_BASE_URL}/api/produto`,
            dadosProduto,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || "Erro ao cadastrar produto");
    }
};

export const buscarProdutos = async() => {
    const response = await axios.get(
        `${API_BASE_URL}/api/produtos`
    );
    return response.data;
}
