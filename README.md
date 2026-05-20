# Crisp Automation

Automação de processos e comunicação utilizando JavaScript + Playwright.

## Sobre o projeto

O **Crisp Automation** é um projeto desenvolvido para automatizar fluxos operacionais relacionados ao atendimento, envio de mensagens, disparo de e-mails, validação de dados de clientes e execução de rotinas repetitivas dentro de plataformas web.

O projeto utiliza:

* Node.js
* Playwright
* JavaScript
* Templates dinâmicos
* Manipulação de dados
* Fluxos assíncronos
* Estratégias de automação resilientes

O objetivo principal é reduzir trabalho manual, aumentar produtividade operacional e garantir padronização nos processos de comunicação.

---

# Funcionalidades

## Automação Web

* Navegação automatizada
* Login automático
* Preenchimento de formulários
* Interação com páginas dinâmicas
* Esperas inteligentes
* Tratamento de carregamento de elementos
* Execução de fluxos em sequência

## Disparo de mensagens

* Envio automatizado de e-mails
* Mensagens personalizadas por cliente
* Templates dinâmicos
* Saudação automática
* Substituição de variáveis
* Controle de execução

## Tratamento de dados

* Leitura de listas de clientes
* Validação de informações
* Sanitização de dados
* Tratamento de valores nulos
* Controle de clientes inválidos

## Logs e rastreabilidade

* Logs de execução
* Identificação de falhas
* Controle de sucesso e erro
* Rastreamento de clientes processados
* Monitoramento de etapas da automação

---

# Estrutura do projeto

```bash
crisp-automation/
│
├── src/
│   ├── services/
│   ├── templates/
│   ├── utils/
│   ├── validators/
│   ├── config/
│   └── index.js
│
├── data/
│   ├── clientes.json
│   └── logs/
│
├── .env
├── package.json
├── package-lock.json
└── README.md
```

---

# Tecnologias utilizadas

## Backend / Runtime

* Node.js
* JavaScript ES6+

## Automação

* Playwright

## Manipulação de dados

* JSON
* File System (fs)
* Path

## Configuração

* dotenv

---

# Requisitos

Antes de executar o projeto, você precisa ter instalado:

* Node.js 18+
* npm ou yarn
* Navegadores do Playwright

---

# Instalação

## Clone o repositório

```bash
git clone https://github.com/seu-usuario/crisp-automation.git
```

## Acesse a pasta

```bash
cd crisp-automation
```

## Instale as dependências

```bash
npm install
```

## Instale os navegadores do Playwright

```bash
npx playwright install
```

---

# Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
CRISP_EMAIL=seu-email
CRISP_PASSWORD=sua-senha
HEADLESS=false
```

---

# Executando o projeto

## Ambiente de desenvolvimento

```bash
npm run dev
```

## Ambiente de produção

```bash
npm start
```

---

# Fluxo geral da automação

1. Inicializa navegador Playwright
2. Realiza autenticação
3. Carrega lista de clientes
4. Valida dados dos clientes
5. Renderiza template personalizado
6. Executa envio automatizado
7. Registra logs da operação
8. Finaliza navegador

---

# Exemplo de renderização dinâmica

```javascript
for (const cliente of clientes) {
    cliente.saudacao = cliente.nome
        ? `Oi, ${cliente.nome}! Tudo bem? 🙂`
        : `Olá! Tudo bem? 🙂`;

    const mensagem = renderTemplate(templateRenovacao, cliente);

    const enviou = await dispararEmail(page, cliente, mensagem);

    console.log(enviou);
}
```

---

# Validação de clientes

Exemplo de validação:

```javascript
function validarCliente(cliente) {
    if (!cliente.email) return false;
    if (!cliente.nome) return false;

    return true;
}
```

Uso:

```javascript
if (!validarCliente(cliente)) {
    console.log('Cliente inválido');
    continue;
}
```

---

# Templates dinâmicos

O projeto trabalha com templates personalizados utilizando placeholders.

## Exemplo

```txt
{{saudacao}}

Passando para lembrar sobre sua renovação.

Qualquer dúvida estamos à disposição.
```

## Resultado

```txt
Oi, Felipe! Tudo bem? 🙂

Passando para lembrar sobre sua renovação.

Qualquer dúvida estamos à disposição.
```

---

# Logs

Exemplo de log:

```txt
[INFO] Cliente processado com sucesso
[ERROR] Falha ao enviar mensagem
[WARNING] Cliente inválido
```

---

# Boas práticas implementadas

* Separação de responsabilidades
* Funções reutilizáveis
* Tratamento de erros
* Código assíncrono com async/await
* Estrutura escalável
* Templates desacoplados
* Configuração por variáveis de ambiente
* Organização modular

---

# Tratamento de erros

Exemplo:

```javascript
try {
    await dispararEmail(page, cliente, mensagem);
} catch (error) {
    console.error('Erro ao disparar mensagem:', error);
}
```

---

# Scripts úteis

## Executar aplicação

```bash
npm start
```

## Desenvolvimento

```bash
npm run dev
```

## Executar testes

```bash
npm test
```

---

# Possíveis melhorias futuras

* Dashboard operacional
* Integração com banco de dados
* Sistema de filas
* Retry automático
* Controle de taxa de envio
* Relatórios em tempo real
* Integração com APIs externas
* Painel administrativo
* Dockerização
* CI/CD
* Métricas e observabilidade

---

# Segurança

Recomendações:

* Nunca subir `.env` para o GitHub
* Utilizar variáveis de ambiente
* Criar logs sem dados sensíveis
* Implementar controle de autenticação
* Utilizar criptografia para credenciais

---

# Convenções do projeto

## Nomeação

* camelCase para variáveis
* PascalCase para classes
* kebab-case para arquivos quando necessário

## Estrutura

* Uma responsabilidade por arquivo
* Serviços desacoplados
* Utilitários reutilizáveis

---

# Exemplo de arquitetura

```txt
Controller
   ↓
Service
   ↓
Validator
   ↓
Template Engine
   ↓
Automation Layer (Playwright)
```

---

# Troubleshooting

## Navegador não abre

Execute:

```bash
npx playwright install
```

## Dependências quebradas

Execute:

```bash
npm install
```

## Problemas com cache

Execute:

```bash
npm cache clean --force
```

---

# Performance

O projeto foi pensado para:

* Reduzir ações manuais
* Minimizar tempo operacional
* Escalar processos repetitivos
* Facilitar manutenção
* Melhorar rastreabilidade

---

# Contribuição

## Fluxo recomendado

1. Fork do projeto
2. Criar branch:

```bash
git checkout -b feature/nova-feature
```

3. Commit:

```bash
git commit -m "feat: adiciona nova feature"
```

4. Push:

```bash
git push origin feature/nova-feature
```

5. Abrir Pull Request

---

# Licença

Este projeto é privado e destinado para uso interno.

---

# Autor

Desenvolvido por Felipe Giusti.

---

# Visão futura

O Crisp Automation pode evoluir para:

* Plataforma de automação operacional
* Sistema inteligente de comunicação
* Central de automações empresariais
* Ferramenta SaaS escalável
* Hub de automação de atendimento

---

# Filosofia do projeto

Automatizar não significa apenas executar tarefas automaticamente.

Significa transformar processos repetitivos em operações confiáveis, escaláveis e sustentáveis.
