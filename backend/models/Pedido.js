import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema({
    produtos: [
        { 
            id_produto: {type: mongoose.Schema.Types.ObjectId, ref: "Produto"},
            nome_produto: {type: mongoose.Schema.Types.String, ref: "Produto"},
            quantidade: {type: mongoose.Schema.Types.Number},
        }
    ]
});

export default mongoose.model("pedidos", PedidoSchema);