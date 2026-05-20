const templateRenovacao =
`
{{saudacao}}

Estou entrando em contato com você porque o seu plano {{plano}} vence em {{dataVencimento}}.

Já estamos organizando as renovações antecipadas para deixar tudo certo e evitar qualquer imprevisto.

Se preferir, já podemos renovar agora, mantendo exatamente as mesmas condições do seu plano atual:

Plano: {{plano}}
Usuários: {{quantidadeUsuarios}}
Propostas: {{quantidadePropostas}}
Documentos: {{quantidadeDocumentos}}
Páginas de captura: {{quantidadePaginasCaptura}}
Valor: R$ {{valor}}
Vigência: mais 12 meses a partir do vencimento

Se quiser, posso cuidar de toda a renovação para você, garantindo que tudo fique certinho sem que você precise se preocupar 🙂`
;

module.exports = {
    templateRenovacao
};