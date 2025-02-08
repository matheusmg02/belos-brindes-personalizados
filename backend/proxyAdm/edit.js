import AdmModel from "../models/Administrador.js";

// Função proxy para editar um administrador por ID
const updateAdmById = async(id, newData) => {
    console.log(`Editando administrador com ID: ${id}`);
    const adm = await AdmModel.findByIdAndUpdate(id, newData, { new: true });
    if (!adm) {
      console.error(`Administrador com ID ${id} não encontrado`);
      throw new Error("Adm não encontrado");
    }
    console.log(`Administrador com ID ${id} editado com sucesso`);
    return adm;
};

export default updateAdmById;