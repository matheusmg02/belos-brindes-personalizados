import express from "express";
import auth from "../middlewares/auth.js";

import { create, criarComentario, buscarProdutos, buscarProdutosPorId, atualizarProduto, deletarProduto } from "../controller/produtoController.js";

const produtoRoute = express.Router();

produtoRoute.post("/produto", auth(["master", "auth-produtos"]), create);
produtoRoute.post("/produto/:id/comentario", criarComentario);
produtoRoute.get("/produtos", buscarProdutos); // Cliente
produtoRoute.get("/produto/:id", buscarProdutosPorId);
produtoRoute.put("/produto/:id", auth(["master", "auth-produtos"]), atualizarProduto);
produtoRoute.delete("/produto/:id", auth(["master", "auth-produtos"]), deletarProduto);

export default produtoRoute;