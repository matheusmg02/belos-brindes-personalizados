import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import "./style.css"

const Produto = () => {
    const [produto, setProduto] = useState(null);
    const [comentario, setComentario] = useState("");
    const [avaliacao, setAvaliacao] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/produto/${id}`);
                setProduto(response.data);
            } catch (error) {
                console.error("Erro ao buscar produto", error);
            }
        };
        fetchData();
    }, [id]);

    const enviarComentario = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/api/produto/${id}/comentario`, {
                comentario,
                avaliacao
            });
            setProduto(response.data);
            setComentario("");
            setAvaliacao(0);
        } catch (error) {
            console.error("Erro ao enviar comentário", error);
        }
    };

    const calcularMediaEstrelas = () => {
        if (!produto || !produto.comentarios.length) return 0;
        const totalEstrelas = produto.comentarios.reduce((acc, c) => acc + c.avaliacao, 0);
        return (totalEstrelas / produto.comentarios.length).toFixed(1);
    };

    return (
        <div className="container">
            {produto ? (
                <>
                    <h1>{produto.nome} <span className="media-estrelas">⭐ {calcularMediaEstrelas()}/5</span></h1>
                    
                    <div className="comentarios-container">
                        <h3>Comentários:</h3>
                        <ul>
                            {produto.comentarios.map((c, index) => (
                                <li key={index}>
                                    {c.comentario} - ⭐ {c.avaliacao}/5
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="form-container">
                        <h3>Deixe seu comentário</h3>
                        <textarea
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            placeholder="Escreva seu comentário..."
                        />
                        <p>Deixe sua nota:</p>
                        <input
                            type="number"
                            value={avaliacao}
                            onChange={(e) => setAvaliacao(e.target.value)}
                            min="0"
                            max="5"
                        />
                        <button onClick={enviarComentario}>Enviar</button>
                    </div>
                </>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default Produto;
