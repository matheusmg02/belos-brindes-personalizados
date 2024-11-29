import ProdutoModel from "../models/Produto.js";


export const create = async (req, res) => {
  ProdutoModel.create(req.body)
  .then(produtos => res.json(produtos))
  .catch(err => res.json(err));
};

export const buscarProdutos = async (req, res) => {
  try {
    const produtoData = await ProdutoModel.find();
    if (!produtoData || produtoData.length === 0) {
      return res.status(404).json({ message: "" });
    }
    res.status(200).json(produtoData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const atualizarProduto = async (req, res) => {
  try {
    const id = req.params.id;
    const produtoExist = await ProdutoModel.findById(id);
    if (!produtoExist) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    const produtoAtualizado = await ProdutoModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // res.status(200).json(updatedData);
    res.status(200).json({ message: "User Updated successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deletarProduto = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await ProdutoModel.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }
    await ProdutoModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};