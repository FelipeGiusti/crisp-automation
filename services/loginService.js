//🟦🟩🟥
require('dotenv').config();

const { delay } = require('../utils/delay');

async function realizarLogin(page){
    try {
        console.log('🟦🟦🟦 - Iniciando processo de login - 🟦🟦🟦');
    
        await page.getByRole('textbox', 
            { name: 'Autentique-se com o seu' })
         .fill(process.env.CRISP_EMAIL);
        await delay(2500);

        await page.getByRole('textbox', 
            { name: 'Palavra-passe *' })
            .fill(process.env.CRISP_PASSWORD);
        await delay(2500);

        await page.getByRole('button', 
            { name: 'Iniciar Sessão no Painel' })
            .click();

        console.log('🟩🟩🟩 - Login realizado com sucesso - 🟩🟩🟩');

        return {
            sucesso: true
        };
        
    } catch (error) {
        console.log(`🟥🟥🟥 - Erro login: ${error.message} - 🟥🟥🟥`);

        return {
            sucesso: false,
            erro: error.message
        }
    }
}

module.exports = {
    realizarLogin
}