import { useState, useEffect } from 'react';
import axios from 'axios';

function App(){
  const [arquivo, setArquivo] = useState(null);
  const [campanhas, setCampanhas] = useState([]);
  const [campanhaSelecionada, setCampanhaSelecionada] = useState(null);

  async function enviarCampanha(){
    if(!arquivo){
      alert('Selecione um arquivo');
      return;
    };


    const formData = new FormData();

    formData.append('arquivo', arquivo);

    try {
      const response = await axios.post('http://localhost:3000/campanhas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);

      alert('Campanha iniciada com sucesso');
      
      carregarCampanhas();
    } catch (error) {
      console.error(error);

      alert('Erro ao iniciar campanha');
    }
  };

  async function carregarCampanhas(){
    try{
      const response = await axios.get('http://localhost:3000/campanhas');

      setCampanhas(response.data.campanhas);
    } catch (error) {
      alert(error.responde?.data?.error || 'Erro ao iniciar campanha');
    }
  }

  useEffect(() => {
    carregarCampanhas();
    const interval = setInterval(() => {
      carregarCampanhas();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    carregarCampanhas();
  }, []);

  function getStatusColor(status){
    switch(status){
      case 'executando':
        return 'bg-yellow-500';
      case 'finalizada':
        return 'bg-green-600';
      case 'erro':
        return 'bg-red-600';
      default:
        return 'gb-zinc-600';
    }
  }

  return (
    <div className='min-h-screen bg-zinc-950 text-white flex items-center justify-center p-8'>
      <div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-xl shadow-2xl'>
        <h1 className='text-3xl font-bold mb-6'>Crisp Automation</h1>
        <label className='w-full flex items-center justify-center p-4 border border-dashed border-zinc-700 rounded-lg cursor-pointer bg-zinc-800 hover:bg-zinc-700 transition'>{arquivo ? arquivo.name : 'Selecionar arquivo XLSX'}
          <input type="file" accept='xlsx' onChange={(e) => setArquivo(e.target.files[0])} className='hidden'/>
        </label>
        <button onClick={enviarCampanha} className='w-full bg-blue-600 hover:bg-blue-500 transition rounded-lg py-3 font-semibold'>Iniciar Campanha</button>
        <div className='mt-8'>
          <h2 className='text-xl font-bold mb-4'>Campanhas</h2>
          <div className='space-y-4'>
            {
              Array.isArray(campanhas) && campanhas.map((campanha) => (
                <div key={campanha.id} className='bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow-lg'>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='font-bold text-lg'>Campanha</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(campanha.status)}`}>{campanha.status}</span>
                  </div>
                  <div className='space-y-2 text-sm'>
                    <p><strong>ID:</strong>{' '}{campanha.id}</p>
                    <p><strong>Status:</strong>{' '}{campanha.status}</p>
                    <p><strong>Enviados:</strong>{' '}{campanha.resumo?.enviados || 0}</p>
                    <p><strong>Falhas:</strong>{' '}{campanha.resumo?.falhas || 0}</p>
                    <p><strong>Inválidos:</strong>{' '}{campanha.resumo?.invalidos || 0}</p>
                    <p><strong>Duplicados:</strong>{' '}{campanha.resumo?.duplicados || 0}</p>
                  </div>
                  <button onClick={() => setCampanhaSelecionada(campanha)} className='mt-4 w-full bg-zinc-700 hover:bg-zinc-600 transition rounded-lg py-2 text-sm'>Ver detalhes</button>
                </div>
                )
              )
            }
          </div>
          {
            campanhaSelecionada && (
              <div className='fixed inset-0 bg-black/70 flex items-center justify-center p-6'>
                <div className='bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto'>
                  <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-2xl font-bold'>Detalhes da Campanha</h2>
                    <button onClick={() => setCampanhaSelecionada(null)} className='bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg'> Fechar</button>
                  </div>
                  <div className='space-y-3'>
                    {
                      campanhaSelecionada.detalhes?.map((log, index) => (
                        <div key={index} className='bg-zinc-800 border border-zinc-700 rounded-lg p-4'>
                          <p><strong>Email:</strong>{' '}{log.email}</p>
                          <p><strong>Status:</strong>{' '}{log.status}</p>
                          <p><strong>Mensagem:</strong>{' '}{log.mensagem}</p>
                          <p><strong>Data:</strong>{' '}{new Date(log.data).toLocaleDateString('pt-BR')}</p>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;