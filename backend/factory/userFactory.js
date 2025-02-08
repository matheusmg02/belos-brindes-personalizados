import bcrypt from "bcrypt";
import AdmModel from "../models/Administrador.js";

const UserFactory = () => {
    const createUser = async (nome, email, senha, role) => {
        const saltRound = 10;
        const hash_password = await bcrypt.hash(senha, saltRound);

        return AdmModel.create({ nome, email, senha: hash_password, role });
    };
    return {
        createUser,
    };
};

export default UserFactory;