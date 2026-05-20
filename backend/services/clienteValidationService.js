function vazio(valor){
    return (
        valor === undefined ||
        valor === null ||
        String(valor).trim() === ''
    );
}

function emailValido(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarCliente(cliente){
    const erros = [];

    //OPCIONAL
    //nome

    //OBRIGATÓRIOS
    if(vazio(cliente.email)){
        erros.push('E-mail não informado');
    } else if (!emailValido(cliente.email)){
        erros.push('E-mail inválido');
    }

    if(vazio(cliente.plano)){
        erros.push('Plano não informado');
    } 

    if(vazio(cliente.valor)){
        erros.push('Valor não informado');
    }

    if(vazio(cliente.dataVencimento)){
        erros.push('Data de vencimento não informada');
    }

    if(vazio(cliente.quantidadeUsuarios)){
        erros.push('Quantidade de usuários não informada');
    }

    if(vazio(cliente.quantidadePropostas)){
        erros.push('Quantidade de propostas não informada');
    }

    if(vazio(cliente.quantidadeDocumentos)){
        erros.push('Quantidade de documentos não informada');
    }

    if(vazio(cliente.quantidadePaginasCaptura)){
        erros.push('Quantidade de páginas de captura não informada');
    }

    return {
        valido: erros.length === 0,
        erros
    };
}

module.exports = {
    validarCliente
}