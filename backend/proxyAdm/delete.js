import AdmModel from "../models/Administrador.js";

// Função proxy para deletar um administrador por ID
const deleteAdmById = async (id) => {
  const adm = await AdmModel.findByIdAndDelete(id);
  if (!adm) {
    throw new Error("Adm não encontrado");
  }
  return adm;
};

export default deleteAdmById;
