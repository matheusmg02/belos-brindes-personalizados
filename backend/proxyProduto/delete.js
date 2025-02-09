import ProdutoModel from "../models/Produto.js";

const deletarProdutobyId = async (id) => {
  const produto = await ProdutoModel.findByIdAndDelete(id);
  if (!produto) {
    throw new Error("Produto não encontrado");
  }
  return produto;
};

export default deletarProdutobyId;
