# Crisp Automation

Sistema fullstack de automação e orquestração de processos, com backend em Node.js e frontend em React (Vite).

O projeto foi estruturado para centralizar regras de negócio, execução de rotinas automatizadas, manipulação de dados e interface administrativa para acompanhamento e operação.

---

# Visão geral

O **Crisp Automation** é uma aplicação voltada para automação de fluxos operacionais, organização de dados e execução de processos internos, com suporte a templates dinâmicos, armazenamento local e painel frontend para interação com o sistema.

Ele funciona como um hub central onde o backend executa as regras e o frontend oferece visibilidade e controle das operações.

---

# Arquitetura

O projeto é dividido em dois módulos principais:

## Backend (Node.js)

Responsável por:

* Regras de negócio
* Processamento de dados
* Execução de automações
* Geração de templates
* Persistência e logs
* API para consumo do frontend

## Frontend (React + Vite)

Responsável por:

* Interface administrativa
* Visualização de dados
* Interação com endpoints do backend
* Organização de fluxos e operações

---

# Stack utilizada

## Backend

* Node.js
* JavaScript (ESModules)
* Arquitetura modular
* Manipulação de arquivos (fs)
* Estrutura baseada em serviços

## Frontend

* React
* Vite
* JavaScript (ES6+)
* CSS

## Infraestrutura local

* Scripts batch para inicialização
* Variáveis de ambiente (.env)

---

# Estrutura do projeto

```
CRISP-AUTOMATION/
│
├── backend/
│   ├── constants/
│   ├── data/
│   ├── logs/
│   ├── node_modules/
│   ├── services/
│   ├── storage/
│   ├── store/
│   ├── templates/
│   ├── uploads/
│   ├── utils/
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── package.json
│   └── package-lock.json
│
├── iniciar-crisp-automatio.bat
└── README.md
```

---

# Funcionalidades implementadas

## Backend

* Estrutura modular baseada em services
* Gerenciamento de templates dinâmicos
* Armazenamento de dados locais
* Sistema de logs
* Upload e manipulação de arquivos
* Organização de estado via store
* Constantes centralizadas
* API para comunicação com frontend

## Frontend

* Interface em React com Vite
* Estrutura de páginas/componentes organizada
* Consumo de API backend
* Exibição de dados operacionais
* Estilização base com CSS

## Sistema

* Integração entre frontend e backend
* Execução local simplificada via script .bat
* Estrutura preparada para expansão modular

---

# API (Backend)

O backend expõe endpoints para:

* Gerenciamento de dados
* Execução de fluxos
* Leitura de arquivos
* Manipulação de templates
* Operações administrativas

*(Os endpoints podem variar conforme evolução do projeto)*

---

# Instalação

## Clonar o repositório

```bash
git clone <repo-url>
```

## Backend

```bash
cd backend
npm install
```

## Frontend

```bash
cd frontend
npm install
```

---

# Execução do projeto

## Backend

```bash
node server.js
```

## Frontend

```bash
npm run dev
```

---

# Execução simplificada (Windows)

O projeto inclui um script `.bat` para inicialização local rápida:

```
iniciar-crisp-automatio.bat
```

Esse script automatiza a inicialização do backend e frontend em ambientes locais.

---

# Variáveis de ambiente

No backend:

```env
PORT=3000
```

Outras variáveis podem ser adicionadas conforme necessidade de integrações futuras.

---

# Conceitos aplicados

* Arquitetura modular
* Separação de responsabilidades
* Estrutura escalável
* Comunicação cliente-servidor
* Persistência local de dados
* Organização por camadas (services / store / utils)

---

# Organização do backend

* **services/** → regras de negócio
* **store/** → estado da aplicação
* **templates/** → templates dinâmicos
* **storage/** → persistência de dados
* **uploads/** → arquivos enviados
* **logs/** → registros do sistema
* **utils/** → funções auxiliares
* **constants/** → valores globais

---

# Organização do frontend

* **src/** → código principal
* **assets/** → imagens e recursos
* **App.jsx** → componente raiz
* **main.jsx** → entrypoint

---

# Logs e rastreabilidade

O sistema mantém logs locais para:

* Execuções de processos
* Erros e exceções
* Operações do sistema

---

# Possíveis evoluções

* Autenticação de usuários
* Dashboard analítico
* Banco de dados relacional
* Deploy em nuvem
* Sistema de filas
* Observabilidade e métricas

---

# Segurança

* Uso de variáveis de ambiente
* Separação de dados sensíveis
* Estrutura preparada para autenticação futura

---

# Objetivo do projeto

Centralizar e simplificar processos operacionais, reduzindo tarefas manuais e permitindo escalabilidade através de automações estruturadas e interface web.

---

# Autor

Felipe Giusti
