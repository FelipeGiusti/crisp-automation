const fs = require('fs');
const path = require('path');

const pastaCampanhas = path.join(__dirname, '../data/campanhas');

function salvarCampanha(campanha){
    const caminhoArquivo = path.join(pastaCampanhas, `${campanha.id}.json`);

    fs.writeFileSync(caminhoArquivo, JSON.stringify(campanha, null, 2));
};

function buscarCampanhas(){
    const arquivos = fs.readdirSync(pastaCampanhas);

    const campanhas = arquivos.map(arquivo =>{
        const caminhoArquivo = path.join(pastaCampanhas, arquivo);
        const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');

        return JSON.parse(conteudo);
    });

    return campanhas;
}

function buscarCampanhaPorId(campanhaId){
    const caminhoArquivo = path.join(pastaCampanhas, `${campanhaId}.json`);

    if(!fs.existsSync(caminhoArquivo)){
        return null;
    }

    const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');

    return JSON.parse(conteudo);
}

module.exports = {
    salvarCampanha,
    buscarCampanhas,
    buscarCampanhaPorId
};