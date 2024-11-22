const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const AdmModel = require("./models/administrador");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/administrador");

app.post("/login", (req, res) => {
    const {email, senha} = req.body;
    AdmModel.findOne({email: email})
    .then(usuario => {
        if(usuario) {
            if(usuario.senha === senha) {
                res.json("Logado com sucesso.");
            } else {
                res.json("Senha incorreta.");
            }
        } else {
            res.json("O email não está cadastrado.");
        }
    })
    .catch(err => res.json(err));
});

app.post('/cadastro', (req, res) => {
    AdmModel.create(req.body)
    .then(adms => res.json(adms))
    .catch(err => res.json(err));
});

app.listen(3000);
