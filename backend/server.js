const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const { campanhas } = require('./store/campanhasStore');
const campanhasStore = require('./store/campanhasStore');
const { salvarCampanha, buscarCampanhas, buscarCampanhaPorId } = require('./services/campanhaPersistenceService');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const nomeArquivo = `${timestamp}-${file.originalname}`;
        cb(null, nomeArquivo);
    }
});

const upload = multer({ storage });

const { iniciarCampanha } = require('./services/campanhaService');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        sucesso: true,
        mensagem: 'Backend online 🚀'
    });
});

app.post('/campanhas', upload.single('arquivo'), async (req, res) => {
    try {
        if(!req.file){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nenhum arquivo enviado. Por favor, envie um arquivo Excel.'
            });
        }

        if(campanhasStore.campanhaEmExecucao){
            return res.status(409).json({
                sucesso: false,
                mensagem: 'Já existe uma campanha em execução.'
            });
        }

        campanhasStore.campanhaEmExecucao = true;

        if(campanhasStore.campanhaEmExecucao){
            return res.status(400).json({
                erro: 'Já existe uma campanha em execução. Por favor, aguarde a conclusão antes de iniciar outra.'
            })
        }

        campanhasStore.campanhaEmExecucao = true;

        const campanhaId = iniciarCampanha(req.file.path);

        return res.json({
            sucesso: true,
            campanhaId,
            mensagem: 'Campanha iniciada com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao executar campanha:', error);

        return res.status(500).json({
            sucesso: false,
            erro: error.message || 'Erro ao executar campanha'
        });
    } 
});

app.get('/campanhas/:id', (req, res) => {
    const campanhaId = req.params.id;

    const campanha = buscarCampanhaPorId(campanhaId);

    if(!campanha){
        return res.status(404).json({
            sucesso: false,
            mensagem: 'Campanha não encontrada'
        });
    }

    return res.json({
        sucesso: true,
        campanha
    });
});

app.get('/campanhas', (req, res) => {
    try{
        const campanhas = buscarCampanhas();

        return res.json({
            sucesso: true,
            campanhas
        });
    } catch (error) {
        return res.status(500).json({
            sucesso: false,
            erro: error.message || 'Erro ao buscar campanhas'
        });
    }
});

app.get('/campanhas', (req, res) => {
    const pastaCampanhas = path.join(__dirname, 'logs');

    const arquivos = fs.readdirSync(pastaCampanhas);

    const campanhas = arquivos.map((arquivo) => {
        const caminhoArquivo = path.join(pastaCampanhas, arquivo);

        const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');

        return JSON.parse(conteudo);
    })

    res.json(campanhas);
});

process.on('unhandledRejection', (error) => {
    console.error('🟥 - Erro não tratado:', error);
});

process.on('uncaughtException', (error) => {
    console.error('🟥 - Exceção não capturada:', error);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 🚀');
});