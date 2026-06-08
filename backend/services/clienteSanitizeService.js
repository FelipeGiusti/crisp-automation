function formatarDataExcel(dataExcel) {
    if(!dataExcel){
        return '';
    }

    const numero = Number(dataExcel);

    if(isNaN(numero)){
        return dataExcel.toString().trim();
    }

    const data = new Date(Date.UTC(1899,11,30));
    data.setUTCDate(data.getUTCDate() + numero);

    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const ano = data.getUTCFullYear();

    return `${dia}/${mes}/${ano}`;
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