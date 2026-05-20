const express = require('express');
const cors = require('cors');

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

app.get('/teste-campanha', async (req, res) => {
    try {
        await executarCampanha('./uploads/clientes-teste.xlsx');

        res.json({
            sucesso: true,
            mensagem: 'Campanha executada com sucesso!'
        });
    } catch (error) {
        console.error('Erro ao executar campanha:', error);
        res.status(500).json({
            sucesso: false,
            erro: error.message || 'Erro ao executar campanha'
        });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 🚀');
});