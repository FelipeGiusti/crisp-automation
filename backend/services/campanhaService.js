//🟦🟩🟥🟨
const playwright = require('playwright');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const { realizarLogin } = require('./loginService');
const { dispararEmail } = require('./emailService');
const { randomDelay, delay } = require('../utils/delay');
const { templateRenovacao } = require('../templates/renovacao');
const { renderTemplate } = require('../utils/templateEngine');
const { carregarClientes } = require('./xlsxService');
const { validarCliente } = require('./clienteValidationService');
const { sanitizarCliente } = require('./clienteSanitizeService');
const campanhasStore = require('../store/campanhasStore');
const { campanhas } = campanhasStore;
const { salvarCampanha } = require('./campanhaPersistenceService');
const { CAMPANHA_STATUS } = require('../constants/campanhaStatus');

function iniciarCampanha(caminhoArquivo){
    const campanhaId = uuidv4();

    executarCampanha(campanhaId, caminhoArquivo);

    return campanhaId;
}

async function executarCampanha(campanhaId, caminhoArquivo){

    let browser;

    try {
        browser = await playwright.chromium.launch({
            headless: false
        });

        const page = await browser.newPage();

        const codigoCampanha = `CMP-${Date.now()}`;

        let enviados = 0;
        let falhas = 0;
        let invalidos = 0;
        let duplicados = 0;

        campanhas[campanhaId] = {
            id: campanhaId,
            codigo: codigoCampanha,
            status: CAMPANHA_STATUS.EXECUTANDO,
            enviados: 0,
            falhas: 0,
            invalidos: 0,
            duplicados: 0,
            iniciadoEm: new Date().toISOString(),
        };

        salvarCampanha(campanhas[campanhaId]);

        const inicioExecucao = new Date();

        const logsCampanha = [];

        const clientes = carregarClientes(caminhoArquivo);

        const nomeArquivo = path.basename(caminhoArquivo);

        campanhas[campanhaId].totalClientes = clientes.length;

        console.log('-------------------------------');
        console.log(`🟩🟩🟩 - Arquivo "${nomeArquivo}" importado com sucesso - 🟩🟩🟩`);
        console.log(`🟩🟩🟩 - ${clientes.length} clientes carregados para processamento - 🟩🟩🟩`);

        

        await page.goto('https://app.crisp.chat/initiate/login/');

        await page.waitForLoadState('domcontentloaded');
        await delay(3000);

        await realizarLogin(page);

        await randomDelay(2000, 5000);

        const emailsProcessados = new Set();

        for(const cliente of clientes){
            const clienteSanitizado = sanitizarCliente(cliente);

            if(emailsProcessados.has(clienteSanitizado.email)){
                duplicados++;
                campanhas[campanhaId].duplicados = duplicados;
                salvarCampanha(campanhas[campanhaId]);
                console.log(`🟥🟥🟥 - E-mail duplicado encontrado para ${clienteSanitizado.email}. Pulando cliente: ${cliente.nome} - 🟥🟥🟥`);

                logsCampanha.push({
                    email: clienteSanitizado.email,
                    status: 'duplicado',
                    mensagem: 'E-mail duplicado',
                    data: new Date().toISOString()
                });
                continue;
            }

            const validacao = validarCliente(clienteSanitizado);

            if(!validacao.valido){
                invalidos++;
                campanhas[campanhaId].invalidos = invalidos;
                salvarCampanha(campanhas[campanhaId]);
                console.log(`🟥🟥🟥 - Cliente inválido: ${cliente.nome} - 🟥🟥🟥`);
                console.log(`Erros: ${validacao.erros.join(', ')}`);

                logsCampanha.push({
                    email: clienteSanitizado.email,
                    status: 'inválido',
                    mensagem: validacao.erros.join(', '),
                    data: new Date().toISOString()
                });
                continue;
            };

            emailsProcessados.add(clienteSanitizado.email);

            clienteSanitizado.saudacao = clienteSanitizado.nome ? `Oi, ${clienteSanitizado.nome}! Tudo bem? 🙂` : `Olá! Tudo bem? 🙂`

            const mensagem = renderTemplate(templateRenovacao, clienteSanitizado);

            let enviou;

            let tentativas = 0;

            const maxTentativas = 3;

            while(tentativas < maxTentativas){
                tentativas++;
                console.log(`🔁 Tentativa ${tentativas} para enviar e-mail para ${clienteSanitizado.nome} (${clienteSanitizado.email})`);

                try {
                    enviou = await Promisse.race([
                        dispararEmail(page, clienteSanitizado, mensagem),
                        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout no envio do e-mail')), 30000))
                    ]);
                    if(enviou.sucesso){
                        break;
                    }
                } catch (error) {
                    enviou = {
                        sucesso: false,
                        erro: error.message
                    };
                }
                console.log(`🟥 Falha na tentativa ${tentativas} para ${clienteSanitizado.email}: ${enviou.erro}`);
                await delay(3000);
            }

            if (enviou.sucesso){
                enviados++;
                campanhas[campanhaId].enviados = enviados;
                salvarCampanha(campanhas[campanhaId]);
                console.log(`🟩🟩 - E-mail enviado com sucesso para ${clienteSanitizado.nome} - 🟩🟩`);

                logsCampanha.push({
                    email: clienteSanitizado.email,
                    status: 'enviado',
                    mensagem: 'E-mail enviado com sucesso',
                    data: new Date().toISOString()
                });

            } else {
                falhas++;
                campanhas[campanhaId].falhas = falhas;
                salvarCampanha(campanhas[campanhaId]);
                console.log('🟥🟥 - Falha ao disparar email:', enviou.erro, ' - 🟥🟥');

                logsCampanha.push({
                    email: clienteSanitizado.email,
                    status: 'falha',
                    mensagem: `Erro: ${enviou.erro}`,
                    data: new Date().toISOString()
                });
            }

            await randomDelay(7000, 12000);
        }

        const fimExecucao = new Date();

        const tempoTotal = ((fimExecucao - inicioExecucao) /1000 /60).toFixed(2);


        console.log('-------------------------------');
        console.log('📊 RELATÓRIO FINAL')
        console.log(`🟩 Enviados: ${enviados}`);
        console.log(`🟥 Falhas: ${falhas}`);
        console.log(`🟨 Inválidos: ${invalidos}`);
        console.log(`🔁 Duplicados: ${duplicados}`);
        console.log(`⏱️ Tempo Total: ${tempoTotal} minutos`);
        console.log('-------------------------------');

        console.log(logsCampanha);

        const relatorio = {
            inicioExecucao: new Date(inicioExecucao).toISOString(),
            fimExecucao: fimExecucao.toISOString(),
            tempoTotalMinutos: tempoTotal,
            resumo: {
                enviados,
                falhas,
                invalidos,
                duplicados
            },
            detalhes: logsCampanha
        };

        const fs = require('fs');

        const dataArquivo = new Date().toISOString().replace(/[:.]/g, '-');

        fs.writeFileSync(
            `./logs/campanha-${dataArquivo}.json`,
            JSON.stringify(relatorio, null, 2)
        );

        campanhas[campanhaId].status = CAMPANHA_STATUS.FINALIZADA;
        campanhas[campanhaId].finalizadaEm = new Date().toISOString();
        campanhas[campanhaId].resumo = {
            enviados,
            falhas,
            invalidos,
            duplicados
        };
        campanhas[campanhaId].detalhes = logsCampanha;
        salvarCampanha(campanhas[campanhaId]);
        return campanhaId;

    } catch (error) {
        if(campanhas[campanhaId]){
            campanhas[campanhaId].status = CAMPANHA_STATUS.ERRO;
            salvarCampanha(campanhasStore.campanhas[campanhaId]);
        }
    } finally {
        campanhasStore.campanhaEmExecucao = false;

        if(browser){
            await browser.close();
        }

        if(fs.existsSync(caminhoArquivo)){
            fs.unlinkSync(caminhoArquivo);
            console.log('🗑️ Upload removido com sucesso')
        }
    }

};

module.exports = {
    executarCampanha,
    iniciarCampanha
};

// npx playwright codegen https://app.crisp.chat/initiate/login/