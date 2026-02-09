# 💰 PocketFinance

Bem-vindo ao **PocketFinance**, uma aplicação Cross-Platform (Mobile e Web) desenvolvida para gestão de despesas pessoais. Este projeto demonstra o uso de **React Native (Expo SDK 54)** com gerenciamento de estado global e validação robusta.

---

## 📋 Menu da Documentação

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

⚠️ **Atenção:** Este projeto utiliza configurações específicas para compatibilidade entre Expo SDK 54 e React 19. Siga os passos estritamente.

### 1. Instalação das Dependências
Abra o terminal na pasta do projeto e execute:
```bash
npm install --legacy-peer-deps
(A flag --legacy-peer-deps é obrigatória para resolver conflitos de versão).

2. Rodando o Aplicativo
Para iniciar (Android, iOS ou Web), use o comando que limpa o cache:

Bash
npx expo start -c
(O -c previne erros de cache do Metro Bundler/Reanimated).

No Celular: Escaneie o QR Code com o app Expo Go.

Na Web: Pressione w no terminal.

3. Rodando os Testes Unitários
Para validar a lógica de saldo e regras de negócio:

Bash
npm run test
📱 Passo a Passo de Utilização
1. Tela Inicial (Home)
Resumo: No topo, você verá o Saldo Total.

🟢 Verde: Saldo positivo.

🔴 Vermelho: Saldo negativo.

Listagem: Abaixo, a lista de transações recentes. Ícones indicam se é Receita (Seta p/ cima) ou Despesa (Seta p/ baixo).

2. Adicionar Transação
Toque no botão "+" (Floating Action Button).

Preencha o Título (ex: "Almoço").

Preencha o Valor (ex: "25.50"). Nota: O app aceita apenas números positivos.

Selecione o Tipo: "Receita" ou "Despesa".

Escolha uma Categoria (ex: Alimentação, Transporte).

Toque em Salvar.

3. Detalhes e Exclusão
Toque em qualquer item da lista na Home.

Veja os detalhes completos.

Para apagar, toque em Excluir Transação.

Na Web: Aparecerá um pop-up do navegador (window.confirm).

No Celular: Aparecerá um alerta nativo do sistema (Alert.alert).

📂 Estrutura do Repositório
pocketfinance/
├── src/                 # Código Fonte (Telas, Store, Componentes)
├── docs/                # Documentação Acadêmica
│   └── projeto-mobile/
│       ├── checkpoints/ # Progresso Semanal
│       ├── evidencias/  # Prints e Provas de Execução
│       └── ...          # Relatórios e Planos
└── README.md            # Este arquivo