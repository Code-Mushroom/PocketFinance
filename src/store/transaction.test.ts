import { transactionSchema, useTransactionStore } from './useTransactionStore';

// 1. Mock (Simulação) do AsyncStorage para o teste não quebrar fora do celular
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('💰 Testes de Lógica Financeira', () => {
  
  // Teste A: Validação dos Dados (Regras do Zod)
  it('Deve ACEITAR uma transação válida', () => {
    const dadosValidos = {
      title: 'Salário',
      amount: 1500,
      category: 'Salário',
      type: 'income'
    };
    const resultado = transactionSchema.safeParse(dadosValidos);
    expect(resultado.success).toBe(true);
  });

  it('Deve REJEITAR valores negativos', () => {
    const dadosInvalidos = {
      title: 'Erro',
      amount: -50, // Valor negativo proibido
      category: 'Outros',
      type: 'expense'
    };
    const resultado = transactionSchema.safeParse(dadosInvalidos);
    expect(resultado.success).toBe(false);
    if (!resultado.success) {
      // Verifica se a mensagem de erro é a que definimos
      expect(resultado.error.issues[0].message).toBe("O valor deve ser positivo");
    }
  });

  // Teste B: Lógica de Saldo (Store)
  it('Deve calcular o saldo corretamente (Receita - Despesa)', () => {
    const store = useTransactionStore.getState();
    
    // Limpa a store antes do teste
    useTransactionStore.setState({ transactions: [] });

    // Adiciona Receita de 100
    store.addTransaction({ title: 'R', amount: 100, category: 'Salário', type: 'income' });
    
    // Adiciona Despesa de 40
    store.addTransaction({ title: 'D', amount: 40, category: 'Alimentação', type: 'expense' });

    // O saldo deve ser 60
    expect(store.getBalance()).toBe(60);
  });
});