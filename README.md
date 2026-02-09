# 💰 PocketFinance

Bem-vindo ao **PocketFinance**, uma aplicação Cross-Platform (Mobile e Web) desenvolvida para gestão de despesas pessoais. Este projeto demonstra o uso de **React Native (Expo SDK 54)** com gerenciamento de estado global (Zustand) e validação robusta (Zod).

---

## 📋 Documentação do Projeto

Toda a documentação acadêmica e técnica foi organizada na pasta `docs/projeto-mobile`.

| Ícone | Documento | Descrição | Link |
| :---: | :--- | :--- | :--- |
| 🆔 | **Identificação** | Dados do aluno e resumo do projeto. | [Acessar](./docs/projeto-mobile/identificacao.md) |
| 🚩 | **Checkpoints** | Histórico de evolução semanal. | [Acessar](./docs/projeto-mobile/checkpoints/) |
| 📝 | **Relatório Técnico** | Desafios e soluções (React 19/Web). | [Acessar](./docs/projeto-mobile/relatorio-final.md) |
| 🧪 | **Plano de Testes** | Cenários de validação e QA. | [Acessar](./docs/projeto-mobile/plano-de-testes.md) |
| 🤖 | **Prompt Log** | Histórico de comandos de IA utilizados. | [Acessar](./docs/projeto-mobile/prompt-log.md) |

---

## 🚀 Guia de Instalação e Execução

⚠️ **Importante:** Este projeto utiliza o **Expo SDK 54** com **React 19**. Devido a atualizações recentes, é necessário usar flags específicas para evitar erros de dependência.

### 1. Instalação
Abra o terminal na pasta do projeto e execute:
```bash
npm install --legacy-peer-deps
npm install --save-dev @types/jest
(A flag --legacy-peer-deps é obrigatória para resolver conflitos de versão entre o React 19 e bibliotecas de ícones).

2. Correção de Ambiente (Se necessário)
Se houver erro de versão (SDK 52 vs 54), rode:

npx expo install --fix
3. Rodando o Aplicativo
Para iniciar (Android, iOS ou Web), use o comando que limpa o cache:

npx expo start -c
No Celular: Escaneie o QR Code com o app Expo Go.

Na Web: Pressione w no terminal.

Problemas de Conexão? Se estiver na rede da faculdade, use npx expo start --tunnel.

4. Rodando os Testes
Para validar a lógica de saldo e regras de negócio:

npm run test
📱 Passo a Passo de Utilização
1. Tela Inicial (Home)
Resumo: No topo, você verá o Saldo Total.

🟢 Verde: Saldo positivo.

🔴 Vermelho: Saldo negativo.

Listagem: Abaixo, a lista de transações recentes.

2. Adicionar Transação
Toque no botão "+" (Floating Action Button).

Preencha o Título (ex: "Almoço").

Preencha o Valor (ex: "25.50"). Nota: O app aceita apenas números positivos.

Selecione o Tipo: "Receita" ou "Despesa".

Escolha uma Categoria e salve.

3. Detalhes e Exclusão
Toque em qualquer item da lista.

Para apagar, toque em Excluir Transação.

Web: Confirmação via navegador (window.confirm).

Mobile: Alerta nativo (Alert.alert).

📂 Estrutura do Repositório
pocketfinance/
├── src/                 # Código Fonte (Telas, Store, Componentes)
├── docs/                # Documentação Acadêmica
│   └── projeto-mobile/
│       ├── checkpoints/ # Progresso Semanal
│       ├── evidencias/  # Prints e Provas de Execução
│       └── ...          # Relatórios e Planos
└── README.md            # Este arquivo