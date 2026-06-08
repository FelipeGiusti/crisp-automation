# 🚀 Crisp Automation

Sistema de automação para envio de campanhas de renovação de planos através da plataforma Crisp, utilizando Playwright para automação do navegador, Node.js no backend e React no frontend.

## 📋 Sobre o Projeto

O Crisp Automation foi desenvolvido para automatizar o envio de mensagens de renovação para clientes, eliminando tarefas repetitivas e reduzindo o tempo gasto em processos manuais.

A aplicação permite importar uma planilha Excel contendo informações dos clientes, realizar validações, enviar mensagens automaticamente e acompanhar os resultados através de um painel administrativo.

---

## ✨ Funcionalidades

### 📤 Gestão de Campanhas

* Criação de campanhas através de upload de planilhas Excel (.xlsx)
* Controle de campanhas em execução
* Bloqueio de execução simultânea de campanhas
* Histórico de campanhas realizadas
* Visualização detalhada dos resultados de cada campanha

### 📊 Dashboard

* Lista de campanhas executadas
* Status da campanha:

  * Executando
  * Finalizada
  * Erro
* Quantidade de:

  * Enviados
  * Falhas
  * Inválidos
  * Duplicados
* Data de início e término
* Relatório detalhado por campanha

### 📄 Processamento de Planilhas

* Importação de arquivos Excel
* Leitura automática dos clientes
* Sanitização dos dados
* Validação de informações obrigatórias
* Tratamento de datas do Excel
* Formatação automática de valores monetários

### 🤖 Automação

* Login automático no Crisp
* Navegação automatizada utilizando Playwright
* Envio automatizado de mensagens
* Delay aleatório entre envios
* Retry automático em caso de falha
* Timeout de segurança para evitar travamentos

### 📈 Relatórios

* Geração de relatórios JSON
* Registro de:

  * Sucessos
  * Falhas
  * Clientes inválidos
  * Registros duplicados
* Histórico persistido localmente

### 🧹 Limpeza Automática

* Remoção automática dos arquivos enviados
* Encerramento seguro do navegador
* Liberação automática de recursos após a execução

---

## 🛠️ Tecnologias Utilizadas

### Frontend

* React
* Axios
* CSS

### Backend

* Node.js
* Express
* Multer
* UUID

### Automação

* Playwright

### Manipulação de Arquivos

* XLSX
* File System (fs)

---

## 📂 Estrutura do Projeto

```bash
crisp-automation/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── services/
│   ├── routes/
│   ├── store/
│   ├── templates/
│   ├── utils/
│   ├── uploads/
│   ├── logs/
│   └── server.js
│
└── README.md
```

## ⚙️ Como Executar

### Backend

```bash
cd backend
npm install
node server.js
```

Servidor disponível em:

```bash
http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação disponível em:

```bash
http://localhost:5173
```

---

## 📄 Modelo da Planilha

A planilha deve conter colunas compatíveis com os dados utilizados no template:

| Campo                    | Exemplo                                 |
| ------------------------ | --------------------------------------- |
| nome                     | João Silva                              |
| email                    | [joao@email.com](mailto:joao@email.com) |
| plano                    | Plano Empresarial                       |
| valor                    | 199.90                                  |
| dataVencimento           | 01/07/2026                              |
| quantidadeUsuarios       | 10                                      |
| quantidadePropostas      | 50                                      |
| quantidadeDocumentos     | 100                                     |
| quantidadePaginasCaptura | 5                                       |

---

## 🔒 Recursos de Segurança

* Validação de dados antes do envio
* Controle de campanha única em execução
* Retry automático em falhas temporárias
* Timeout de segurança
* Tratamento de exceções
* Limpeza automática de arquivos temporários

---

## 📈 Fluxo da Aplicação

```text
Upload da planilha
        ↓
Validação dos dados
        ↓
Login automático no Crisp
        ↓
Processamento dos clientes
        ↓
Envio das mensagens
        ↓
Registro dos resultados
        ↓
Geração do relatório
        ↓
Persistência da campanha
        ↓
Remoção do arquivo temporário
```

---

## 🎯 Objetivos do Projeto

* Automatizar campanhas de renovação
* Reduzir esforço operacional
* Padronizar comunicações
* Melhorar rastreabilidade dos envios
* Fornecer histórico completo das campanhas realizadas

---

## 👨‍💻 Autor

**Felipe Giusti**

Analista de Suporte Técnico | Desenvolvedor Full Stack | Automação de Processos

GitHub: https://github.com/felipegiusti

LinkedIn: https://linkedin.com/in/felipegiusti2806
