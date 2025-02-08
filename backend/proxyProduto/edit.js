import ProdutoModel from "../models/Produto.js";

// Função proxy para editar um administrador por ID
const atualizarProdutoById = async(id, newData) => {
    const produto = await ProdutoModel.findByIdAndUpdate(id, newData, { new: true });
    if (!produto) {
        throw new Error("Produto não encontrado");
    }
    return produto;
};

export default atualizarProdutoById;