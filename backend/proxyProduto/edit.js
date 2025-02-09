import ProdutoModel from "../models/Produto.js";

const atualizarProdutoById = async(id, newData) => {
    const produto = await ProdutoModel.findByIdAndUpdate(id, newData, { new: true });
    if (!produto) {
        throw new Error("Produto não encontrado");
    }
    return produto;
};

export default atualizarProdutoById;