import bcrypt from "bcrypt";
import AdmModel from "../models/Administrador.js";

const UserService = () => {
    const createUser = async(nome, email, senha, role) => {
        const admExiste = await AdmModel.findOne({ email });
        if (admExiste) {
            throw new Error("Adm já existe");
        }
        
        const saltRound = 10;
        const hash_password = await bcrypt.hash(senha, saltRound);

        return AdmModel.create({ nome, email, senha: hash_password, role });
    };

    const readUsers = async() => {
        return AdmModel.find();
    };

    const editUser = async(id, newData) => {
        const admExist = await AdmModel.findById(id);
        if (!admExist) {
           throw new Error("Produto não encontrado");
        }
        return AdmModel.findByIdAndUpdate(id, newData, {new: true});
    };

    const removeUser = async(id) => {
        return AdmModel.findByIdAndDelete(id);
    };

    return {
        createUser,
        readUsers,
        editUser,
        removeUser
    };

    
};

export default UserService;