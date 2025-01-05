import express from "express";
import auth from "../middlewares/auth.js";

import { login, create, buscarAdms, editarAdm, deletarAdm} from "../controller/admController.js";

const admRoute = express.Router();

admRoute.post("/cadastro", create);
admRoute.post("/login", login);
admRoute.get("/adms", auth(["master", "auth-produtos", "auth-pedidos"]), buscarAdms);
admRoute.put("/adm/:id", editarAdm);
admRoute.delete("/adm/:id", deletarAdm);

export default admRoute;