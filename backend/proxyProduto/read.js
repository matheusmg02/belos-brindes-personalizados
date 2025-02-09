import ProdutoModel from "../models/Produto.js";

const readProdutos = async(id) => {
    const produto = await ProdutoModel.find(id);
    if (!produto) {
        throw new Error("Produto não encontrado");
    }
    return produto;
};

export default readProdutos;