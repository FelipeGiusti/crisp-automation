import { useState } from 'react';
import axios from 'axios';

function App(){
  const [arquivo, setArquivo] = useState(null);

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
    } catch (error) {
      console.error(error);

      alert('Erro ao iniciar campanha');
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
      </div>
    </div>
  );
}

export default App;