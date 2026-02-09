# 📝 Relatório Final - PocketFinance

## 1. Desafios Técnicos Específicos

### A. Tipagem e Cálculos Numéricos
**Desafio:** O `TextInput` retorna strings, mas precisamos de números (float) para os cálculos.
**Solução:** Utilização do `z.coerce.number()` no Schema do Zod para converter automaticamente a string do input antes de salvar na Store.

### B. Feedback Visual Condicional
**Desafio:** Indicar claramente se o saldo é positivo ou negativo.
**Solução:** Estilização dinâmica (`backgroundColor: balance >= 0 ? '#10b981' : '#ef4444'`).

### C. Compatibilidade Web/Mobile
**Solução:** Implementação híbrida para alertas de exclusão:
- `window.confirm` para Web.
- `Alert.alert` nativo para Mobile.

## 2. Conclusão
O projeto atingiu todos os requisitos de CRUD, Estado Global e Validação, demonstrando uma arquitetura escalável e testável.