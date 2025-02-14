import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const cadastrarUsuario = async(dadosUsuario) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/cadastro`, dadosUsuario);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || "Erro ao cadastrar usuário");
    }
};

export const loginUsuario = async(dadosLogin) => {
    try {
        const {data: token} = await axios.post(`${API_BASE_URL}/api/login`, dadosLogin);

        sessionStorage.setItem("token", token);

        return token;
    } catch (error) {
        alert("erro ao fazer o login")
        throw new Error(error.response?.data || "Erro ao fazer login");
    }
};

export const mudarPerfil = async(id, dadosUsuario) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/api/adm/${id}`,
            dadosUsuario
        );
        return response.data;
    } catch (error) {
        throw new Error("Erro ao mudar perfil");
    }    
};