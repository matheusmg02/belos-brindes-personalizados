import mongoose from "mongoose";

const AdmSchema = new mongoose.Schema({
    nome: String, 
    email: String,
    senha: String,
    role: {
        type: String,
        enum: ["master", "auth-pedidos", "auth-produtos"],
        required: true
    }

});

export default mongoose.model("administradores", AdmSchema);
