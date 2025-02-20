import ProdutoModel from "../models/Produto.js";

const ProdutoService = () => {
    const criarProduto = async (produtoData) => {
        return ProdutoModel.create(produtoData);
    };

    const postComentario = async(id, comentario, avaliacao) => {
        const produto = await ProdutoModel.findById(id);

        if (!produto) 
            throw new Error("Produto não encontrado");

        produto.comentarios.push({comentario, avaliacao});
        await produto.save();

        return produto;
    };

    const lerProdutos = async() => {
        return ProdutoModel.find();
    };

    const lerProdutoPorId = async(id) => {
        return ProdutoModel.findById(id);
    };
    
    const editarProduto = async(id, newData) => {
        const produtoExist = await ProdutoModel.findById(id);
        if (!produtoExist) {
            throw new Error("Erro ao editar produto");
        }
        
        return ProdutoModel.findByIdAndUpdate(id, newData, {new: true});
    };

    const removerProduto = async(id) => {

        const userExist = await ProdutoModel.findById(id);
        if (!userExist) {
            throw new Error("Produto não encontrado");
        }

        return ProdutoModel.findByIdAndDelete(id);
    };

    return {
        criarProduto,
        postComentario,
        lerProdutos,
        lerProdutoPorId,
        editarProduto,
        removerProduto
    };
};

export default ProdutoService;