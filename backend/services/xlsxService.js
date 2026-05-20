const xlsx = require('xlsx');

function carregarClientes(caminhoArquivo){
    const workbook = xlsx.readFile(caminhoArquivo);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const clientes = xlsx.utils.sheet_to_json(sheet);

    return clientes;
}

module.exports = {
    carregarClientes
}