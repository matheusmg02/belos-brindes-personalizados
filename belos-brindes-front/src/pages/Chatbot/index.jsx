import { useState } from 'react';
import axios from 'axios';
import './style.css';

const GeminiForm = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/chatbot', { prompt });
            setResponse(res.data.text);
        } catch (error) {
            console.error(error);
        }
    };
    // Função para transformar quebras de linha em <br />
    const formatResponse = (text) => {
      return text.split('\n').map((line, index) => (
          <span key={index}>
              {line}
              <br />
          </span>
      ));
    };

    return (
      <div className="main-container">
        <h1>Chatbot</h1>
          <form onSubmit={handleSubmit}>
              <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Digite seu prompt aqui"
              />
              <button type="submit">Enviar</button>
          </form>
          {response && (
              <div className="resposta">
                  <p>{formatResponse(response)}</p>
              </div>
          )}
      </div>
    );
  };

export default GeminiForm;