import ProdutoModel from "../models/Produto.js";

const ProdutoFactory = () => {
    const criarProduto = async (produtoData) => {
            return ProdutoModel.create(produtoData);
        };
        return {
            criarProduto,
    };
};

export default ProdutoFactory;