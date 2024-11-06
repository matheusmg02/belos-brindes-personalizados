const mongoose = require('mongoose');

const AdmSchema = new mongoose.Schema({
    nome: String, 
    email: String,
    senha: String
});

const AdmModel = mongoose.model("administradores", AdmSchema);
module.exports = AdmModel;