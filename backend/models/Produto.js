import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema({
    nome: String,
    qtd_estoque: Number,
    descricao: String,
    comentarios: [
        {
            comentario: String,
            avaliacao: Number,
            data: { type: Date, default: Date.now }
        }
    ]
});

export default mongoose.model("produtos", ProdutoSchema);