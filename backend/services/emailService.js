//🟦🟩🟥
const { delay } = require('../utils/delay');

async function criarNovaConversa(page){
    console.log("🟦 - Criando nova conversa..."); 
    await page.getByRole('button')
        .filter({ hasText: 'Criar uma nova conversa'})
        .click();
    await delay(2500);
    console.log("🟩 - Nova conversa criada com sucesso!");
}

async function preencherDestinatario(page, email){
    console.log("🟦 - Preenchendo destinatário...");
    await page.getByRole('textbox', 
        { name: 'E-mail do usuário *' })
        .fill(email);
    console.log("🟩 - Destinatário preenchido com sucesso!");
}

async function preencherNome(page, nome){
    console.log("🟦 - Preenchendo nome...");
    await page.getByRole('textbox', 
        { name: 'Nome do usuário *' })
        .fill(nome);
    await delay(2500);
    console.log("🟩 - Nome preenchido com sucesso!");
}

async function preencherAssunto(page, assunto){
    console.log("🟦 - Preenchendo assunto...");
    await page.getByRole('textbox', 
        { name: 'Assunto do e-mail (se houver)' })
        .fill(assunto);
    await delay(2500);
    console.log("🟩 - Assunto preenchido com sucesso!");
}

async function criarConversa(page){
    console.log("🟦 - Criando conversa...");
    await page.getByRole('button', 
        { name: 'Criar Conversa' })
        .click();
    await delay(2500);
    console.log("🟩 - Conversa criada com sucesso!");
}

async function preencherMensagem(page, mensagem){
    console.log("🟦 - Preenchendo mensagem...");
    await page.getByRole('textbox')
        .first()
        .click();
    await delay(2500);
    await page.getByRole('textbox')
        .first()
        .fill(mensagem);
    await delay(2500);
    console.log("🟩 - Mensagem preenchida com sucesso!");
}

async function enviarEmail(page){
    console.log("🟦 - Enviando e-mail...");
    await page.getByRole('button').filter( 
        { hasText: 'EnviarEnter' })
        .click();
    await delay(2500);

    //CONFIRMAR ENVIO DO E-MAIL
    //deixar essa linha abaixo comentada para evitar de ficar spammando o envio de e-mails durante os testes
    await page.getByRole('button', 
        { name: 'Enviar Mensagem' })
        .click();

    console.log("🟩 - E-mail enviado com sucesso!");
}

async function dispararEmail(page, cliente, mensagem){

    try {
        console.log(`🟦🟦 - Iniciando envio para ${cliente.nome} - 🟦🟦`);

        await criarNovaConversa(page);

        await preencherDestinatario(page, cliente.email);

        await preencherNome(page, cliente.nome);

        await preencherAssunto(page, cliente.assunto);

        await criarConversa(page);

        await preencherMensagem(page, mensagem);

        await enviarEmail(page);

        return {
            sucesso: true
        };

    } catch (error) {
        console.log('------------------');
        console.log(`Cliente: ${cliente.nome}`);
        console.log(`Erro: ${error.message}`);
        console.log('------------------');

        return {
            sucesso: false,
            erro: error.message
        };
    }
}

module.exports = {
    dispararEmail
};