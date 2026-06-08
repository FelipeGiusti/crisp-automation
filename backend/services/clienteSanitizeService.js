function formatarDataExcel(dataExcel) {
    if(!dataExcel){
        return '';
    }

    const numero = Number(dataExcel);

    if(isNan(numero)){
        return dataExcel.toString().trim();
    }

    const data = new Date((numero - 25569) * 86400 * 1000);

    return data.toLocaleDateString('pt-BR');
}

function formatarValor(valor){
    if (valor === undefined || valor === null || valor === ''){
        return '';
    }

    const numero = Number(valor);

    if(isNaN(numero)){
        return valor.toString().trim();
    }

    return numero.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
     });
}


function sanitizarCliente(cliente){
    return {
        ...cliente,

        nome: cliente.nome
            ?.toString()
            ?.trim(),

        email: cliente.email
            ?.toString()
            ?.trim()
            ?.toLowerCase(),

        plano: cliente.plano
            ?.toString()
            ?.trim(),
        
        valor: formatarValor(cliente.valor),

        dataVencimento: formatarDataExcel(cliente.dataVencimento),
        
        quantidadeUsuarios: cliente.quantidadeUsuarios
            ?.toString()
            ?.trim(),

        quantidadePropostas: cliente.quantidadePropostas
            ?.toString()
            ?.trim(),

        quantidadeDocumentos: cliente.quantidadeDocumentos
            ?.toString()
            ?.trim(),

        quantidadePaginasCaptura: cliente.quantidadePaginasCaptura
            ?.toString()
            ?.trim()
    };
}

module.exports = {
    sanitizarCliente
};