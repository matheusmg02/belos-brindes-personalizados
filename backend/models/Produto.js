import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema({
    nome: String,
    qtd_estoque: Number,
    descricao: String
});

export default mongoose.model("produtos", ProdutoSchema);