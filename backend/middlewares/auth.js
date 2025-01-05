import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (requiredRoles = []) => (req, res, next) => {

    const token = req.headers.authorization;

    if(!token) {
        console.log("token não fornecido");
        return res.status(401).json({message: "Acesso negado"});
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
        req.user = decoded;

        if(requiredRoles && !requiredRoles.includes(req.user.role)) {
            console.log("permissão negada");
            return res.status(403).json({ message: "Permissão negada" });
        }

    } catch (err) {
        return res.status(401).json({message: "Token inválido"});
    }

    next();

};

export default auth;