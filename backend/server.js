import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import produtoRoute from "./routes/produtoRoute.js";
import admRoute from "./routes/admRoute.js";
import pedidoRoute from "./routes/pedidoRoute.js";


const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT;
const MONGOURL = process.env.MONGO_URL;

mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("DB conectado");
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => console.log(error));

app.use("/api", produtoRoute);
app.use("/api", admRoute);
app.use("/api", pedidoRoute);

/* 

Rotas públicas:
    - Login e Cadastro do cliente
    - Catálogo

Rotas privadas:
    - Lista de usuários (mostrando a permissão das contas, clientes e adms)
*/
