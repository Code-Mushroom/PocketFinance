import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTransactionStore } from '../../store/useTransactionStore';
import { Ionicons } from '@expo/vector-icons';

export default function Details() {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const { transactions, deleteTransaction } = useTransactionStore();
  const transaction = transactions.find(t => t.id === id);

  if (!transaction) return <View style={styles.container}><Text>Transação não encontrada.</Text></View>;

  const handleDelete = () => {
    if (!id) return;
    if (Platform.OS === 'web') {
      if (window.confirm('Tem certeza que deseja apagar?')) {
        deleteTransaction(id);
        router.back();
      }
    } else {
      Alert.alert('Excluir', 'Tem certeza?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Apagar', style: 'destructive', onPress: () => { deleteTransaction(id); router.back(); } }
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Ionicons 
          name={transaction.type === 'income' ? 'arrow-up' : 'arrow-down'} 
          size={48} 
          color={transaction.type === 'income' ? '#10b981' : '#ef4444'} 
          style={{ marginBottom: 16 }}
        />
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.amount}>R$ {transaction.amount.toFixed(2)}</Text>
        <Text style={styles.categoryBadge}>{transaction.category}</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>Excluir Transação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f3f4f6', paddingTop: 60, alignItems: 'center' },
  backButton: { alignSelf: 'flex-start', marginBottom: 20 },
  card: { backgroundColor: '#fff', width: '100%', padding: 40, borderRadius: 24, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1f2937', marginBottom: 8 },
  amount: { fontSize: 36, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  categoryBadge: { backgroundColor: '#e5e7eb', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 12, fontSize: 14, color: '#4b5563' },
  deleteButton: { marginTop: 40, padding: 16 },
  deleteText: { color: '#ef4444', fontWeight: 'bold', fontSize: 16 }
});