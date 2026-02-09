import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTransactionStore } from '../store/useTransactionStore';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const router = useRouter();
  const { transactions, getBalance } = useTransactionStore();
  const balance = getBalance();

  const formatCurrency = (value: number) => 
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <View style={styles.container}>
      {/* Card de Saldo */}
      <View style={[styles.balanceCard, { backgroundColor: balance >= 0 ? '#10b981' : '#ef4444' }]}>
        <Text style={styles.balanceLabel}>Saldo Atual</Text>
        <Text style={styles.balanceValue}>{formatCurrency(balance)}</Text>
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Transações Recentes</Text>
        <TouchableOpacity onPress={() => router.push('/form')} style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => router.push(`/details/${item.id}`)}
          >
            <View style={styles.iconBox}>
              <Ionicons 
                name={item.type === 'income' ? 'arrow-up-circle' : 'arrow-down-circle'} 
                size={32} 
                color={item.type === 'income' ? '#10b981' : '#ef4444'} 
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardCategory}>{item.category}</Text>
            </View>
            <Text style={[styles.cardAmount, { color: item.type === 'income' ? '#10b981' : '#ef4444' }]}>
              {item.type === 'income' ? '+' : '-'} {formatCurrency(item.amount)}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma transação ainda.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f3f4f6', paddingTop: 60 },
  balanceCard: { padding: 24, borderRadius: 16, marginBottom: 24, alignItems: 'center' },
  balanceLabel: { color: '#fff', fontSize: 16, opacity: 0.9 },
  balanceValue: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginTop: 8 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1f2937' },
  addButton: { backgroundColor: '#3b82f6', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, alignItems: 'center' },
  iconBox: { marginRight: 12 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
  cardCategory: { fontSize: 12, color: '#6b7280' },
  cardAmount: { fontSize: 16, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', color: '#9ca3af', marginTop: 40 }
});