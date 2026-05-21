const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

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

const { executarCampanha } = require('./services/campanhaService');

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

        await executarCampanha(req.file.path);

        return res.json({
            sucesso: true,
            mensagem: 'Campanha executada com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao executar campanha:', error);

        return res.status(500).json({
            sucesso: false,
            erro: error.message || 'Erro ao executar campanha'
        });
    } 
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 🚀');
});