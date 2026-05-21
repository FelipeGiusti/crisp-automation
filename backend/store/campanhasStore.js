const campanhas = [];

let campanhaEmExecucao = false;

module.exports = {
    campanhas,
    get campanhaEmExecucao(){
        return campanhaEmExecucao;
    },
    set campanhaEmExecucao(valor){
        campanhaEmExecucao = valor;
    }
};