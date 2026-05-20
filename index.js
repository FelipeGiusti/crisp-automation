//🟦🟩🟥
const playwright = require('playwright');
const readline = require('readline');

const { realizarLogin } = require('./services/loginService');
const { dispararEmail } = require('./services/emailService');
const { randomDelay, delay } = require('./utils/delay');
const { templateRenovacao } = require('./templates/renovacao');
const { renderTemplate } = require('./utils/templateEngine');
const { carregarClientes } = require('./services/xlsxService');
const { validarCliente } = require('./services/clienteValidationService');
const { sanitizarCliente } = require('./services/clienteSanitizeService');

const nomeArquivo = process.argv[2];

if(!nomeArquivo){
    console.error('🟥🟥🟥 - Por favor, forneça o nome do arquivo Excel como argumento. Exemplo: node index.js clientes.xlsx - 🟥🟥🟥');
    process.exit();
}

const clientes = carregarClientes(`./uploads/${nomeArquivo}`);

console.log('-------------------------------')

console.log(`🟩🟩🟩 - Arquivo "${nomeArquivo}" importado com sucesso - 🟩🟩🟩`);
console.log(`🟩🟩🟩 - ${clientes.length} clientes carregados para processamento - 🟩🟩🟩`);


(async () => {
    const browser = await playwright.chromium.launch({
        headless: false
    });

    const page = await browser.newPage();

    await page.goto('https://app.crisp.chat/initiate/login/');

    await page.waitForLoadState('domcontentloaded');
    await delay(3000);

    await realizarLogin(page);

    await randomDelay(2000, 5000);

    for(const cliente of clientes){
        const clienteSanitizado = sanitizarCliente(cliente);

        const validacao = validarCliente(clienteSanitizado);

        if(!validacao.valido){
            console.log(`🟥🟥🟥 - Cliente inválido: ${cliente.nome} - 🟥🟥🟥`);
            console.log(`Erros: ${validacao.erros.join(', ')}`);
            continue;
        }

        clienteSanitizado.saudacao = clienteSanitizado.nome ? `Oi, ${clienteSanitizado.nome}! Tudo bem? 🙂` : `Olá! Tudo bem? 🙂`

        const mensagem = renderTemplate(templateRenovacao, clienteSanitizado);

        const enviou = await dispararEmail(page, clienteSanitizado, mensagem);

        if (enviou.sucesso){
            console.log(`🟩🟩 - E-mail enviado com sucesso para ${clienteSanitizado.nome} - 🟩🟩`);
        } else {
            console.log('🟥🟥 - Falha ao disparar email:', enviou.erro, ' - 🟥🟥');
        }

        await randomDelay(7000, 12000);
    }

})();



// npx playwright codegen https://app.crisp.chat/initiate/login/