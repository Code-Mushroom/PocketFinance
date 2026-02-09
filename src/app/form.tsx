import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { transactionSchema, useTransactionStore } from '../store/useTransactionStore';

export default function Form() {
  const router = useRouter();
  const { addTransaction } = useTransactionStore();

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: '',
      amount: '',
      category: 'Outros',
      type: 'expense' 
    }
  });

  const selectedType = watch('type');
  const selectedCategory = watch('category');

  const onSubmit = (data: any) => {
    addTransaction({
      ...data,
      amount: Number(data.amount)
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Transação</Text>

      {/* Seletor de Tipo (Receita/Despesa) */}
      <View style={styles.typeSelector}>
        <TouchableOpacity 
          style={[styles.typeButton, selectedType === 'expense' && styles.expenseActive]} 
          onPress={() => setValue('type', 'expense')}
        >
          <Text style={[styles.typeText, selectedType === 'expense' && { color: '#fff' }]}>Despesa</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.typeButton, selectedType === 'income' && styles.incomeActive]} 
          onPress={() => setValue('type', 'income')}
        >
          <Text style={[styles.typeText, selectedType === 'income' && { color: '#fff' }]}>Receita</Text>
        </TouchableOpacity>
      </View>

      {/* Campos de Texto */}
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput 
            style={styles.input} 
            placeholder="Título (ex: Almoço)" 
            value={value} 
            onChangeText={onChange} 
          />
        )}
      />
      {errors.title && <Text style={styles.error}>{String(errors.title.message)}</Text>}

      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, value } }) => (
          <TextInput 
            style={styles.input} 
            placeholder="Valor (ex: 25.50)" 
            keyboardType="numeric"
            value={String(value)} 
            onChangeText={onChange} 
          />
        )}
      />
      {errors.amount && <Text style={styles.error}>{String(errors.amount.message)}</Text>}

      {/* Botões de Categoria Simples */}
      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categoryRow}>
        {['Alimentação', 'Transporte', 'Lazer', 'Salário', 'Outros'].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catButton, selectedCategory === cat && styles.catActive]}
            onPress={() => setValue('category', cat as any)}
          >
            <Text style={[styles.catText, selectedCategory === cat && { color: '#fff' }]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  typeSelector: { flexDirection: 'row', marginBottom: 20, backgroundColor: '#f3f4f6', borderRadius: 8, padding: 4 },
  typeButton: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 6 },
  expenseActive: { backgroundColor: '#ef4444' },
  incomeActive: { backgroundColor: '#10b981' },
  typeText: { fontWeight: '600', color: '#4b5563' },
  input: { borderWidth: 1, borderColor: '#e5e7eb', padding: 16, borderRadius: 12, fontSize: 16, marginBottom: 10, backgroundColor: '#f9fafb' },
  error: { color: '#ef4444', fontSize: 12, marginBottom: 10, marginLeft: 4 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8, marginTop: 10 },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 30 },
  catButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f3f4f6' },
  catActive: { backgroundColor: '#3b82f6' },
  catText: { fontSize: 12, color: '#4b5563' },
  saveButton: { backgroundColor: '#3b82f6', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  saveText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelButton: { padding: 18, alignItems: 'center' },
  cancelText: { color: '#6b7280', fontSize: 16 }
});