function renderTemplate(template, cliente) {
    return template.replace(
        /\{\{(.*?)\}\}/g,
        (_,chave) => {
            return cliente[chave.trim()] || '';
        }
    );
}

module.exports = {
    renderTemplate
}