import mongoose from "mongoose";

const AdmSchema = new mongoose.Schema({
    nome: String, 
    email: String,
    senha: String
});

export default mongoose.model("administradores", AdmSchema);
