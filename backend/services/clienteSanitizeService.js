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
        
        valor: cliente.valor
            ?.toString()
            ?.trim(),

        dataVencimento: cliente.dataVencimento
            ?.toString()
            ?.trim(),
        
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