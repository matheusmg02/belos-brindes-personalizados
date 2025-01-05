import express from "express";
import auth from "../middlewares/auth.js";

import { create, buscarProdutos, atualizarProduto, deletarProduto } from "../controller/produtoController.js";

const produtoRoute = express.Router();

produtoRoute.post("/produto", auth(["master", "auth-produtos"]), create);
produtoRoute.get("/produtos", buscarProdutos); // Cliente
produtoRoute.put("/produto/:id", auth(["master", "auth-produtos"]), atualizarProduto);
produtoRoute.delete("/produto/:id", auth(["master", "auth-produtos"]), deletarProduto);

export default produtoRoute;