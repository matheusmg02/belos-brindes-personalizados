import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const HomeADM = () => {

    const [adms, setAdms] = useState([]);
    useEffect(() => {
        const chamarDados = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/adms");
                setAdms(response.data);
            } catch (error) {
                console.log("Error ao chamar os dados", error);
            }
        };
        chamarDados();
    }, []);

    const deletarAdm = async (admId) => {
        await axios
        .delete(`http://localhost:3000/api/adm/${admId}`)
        .then(() => {
            setAdms((admDeletado) => admDeletado.filter((adm) => adm._id !== admId))
        })
        .catch(err => alert(err))
    }

    return (
        <div className="tabela-adms">
            <Link to="/listaprodutos" type="button" className="btn btn-primary">
                Ir para a lista de produtos
            </Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scpoe="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Senha</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {adms.map((adm)=> {
                        return (
                        <tr key={adm._id}>
                            <td>{adm._id}</td>
                            <td>{adm.nome}</td>
                            <td>{adm.email}</td>
                            <td>{adm.senha}</td>
                            <td className="acoes">
                                <Link title="Editar Perfil" to={`/editarperfil/${adm._id}`}>
                                    <button type="button" className="btn btn-info">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </Link>
                                <button title="Deletar Perfil" onClick={() => deletarAdm(adm._id)} type="button" className="btn btn-danger">
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default HomeADM;