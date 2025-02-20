import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import roleMessages from "../strategy/roleStrategy.js";

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

        if (requiredRoles.length > 0 && !requiredRoles.includes(req.user.role)) {
            const message = roleMessages[req.user.role] || "Permissão negada.";
            console.log("Permissão negada:", message);
            return res.status(403).json({ message });
        }

    } catch (err) {
        return res.status(401).json({message: "Token inválido"});
    }

    next();

};

export default auth;