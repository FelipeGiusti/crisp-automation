function excelDateToBRDate(excelDate){
    const data = new Date((excelDate - (25569) * 86400)) * 1000;

    return data.toLocaleDateString('pt-BR');
}

module.exports = {
    excelDateToBRDate
};