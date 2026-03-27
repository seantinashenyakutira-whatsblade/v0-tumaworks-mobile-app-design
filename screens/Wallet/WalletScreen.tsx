import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  TextInput 
} from 'react-native';
import { COLORS, SPACING, SIZES, SHADOWS } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../hooks/useWallet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  ChevronRight, 
  Plus, 
  Send, 
  ShieldCheck, 
  Clock, 
  TrendingUp,
  CreditCard
} from 'lucide-react-native';

const PAYMENT_METHODS = [
  { id: 'mtn', label: 'MTN MoMo', logo: 'https://images.seeklogo.com/logo-png/43/1/mtn-logo-png_seeklogo-431589.png', color: '#FFCC00' },
  { id: 'airtel', label: 'Airtel Money', logo: 'https://images.seeklogo.com/logo-png/16/1/airtel-logo-png_seeklogo-168291.png', color: '#E11900' },
  { id: 'zamtel', label: 'Zamtel Money', logo: 'https://jacktembo.github.io/PaymentAssets/img/zamtel logo-2-p-500.png', color: '#00A381' },
  { id: 'stripe', label: 'Visa/Mastercard', logo: 'https://images.seeklogo.com/logo-png/29/1/visa-logo-png_seeklogo-292504.png', color: '#1A1F71' }
];

export const WalletScreen = ({ navigation }: any) => {
  const { profile, refreshProfile } = useAuth();
  const { deposit, loading, balances } = useWallet();
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [amount, setAmount] = useState('100');
  const [selectedGateway, setSelectedGateway] = useState('mtn');

  const handleDeposit = async () => {
    try {
      await deposit(Number(amount), selectedGateway);
      alert("Payment successful! Funds added to your wallet.");
      setShowAddFunds(false);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const renderBalanceCard = () => (
    <View style={styles.balanceCard}>
       <View style={styles.cardHeader}>
          <Text style={styles.cardLabel}>AVAILABLE BALANCE</Text>
          <ShieldCheck color="white" size={16} />
       </View>
       <Text style={styles.balanceText}>ZMW {balances.wallet.toFixed(2)}</Text>
       <View style={styles.cardActions}>
          <TouchableOpacity style={styles.cardButton} onClick={() => setShowAddFunds(true)}>
             <Plus size={18} color={COLORS.primary} />
             <Text style={styles.cardButtonText}>Add Funds</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cardButton, { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#fff' }]}>
             <Send size={18} color="white" />
             <Text style={[styles.cardButtonText, { color: 'white' }]}>Send</Text>
          </TouchableOpacity>
       </View>
    </View>
  );

  const renderEscrowSummary = () => (
    <View style={styles.escrowGrid}>
       <View style={styles.escrowItem}>
          <View style={styles.escrowIconContainer}>
             <Clock size={20} color={COLORS.accent} />
          </View>
          <View>
             <Text style={styles.escrowLabel}>ESCROW (LOCKED)</Text>
             <Text style={styles.escrowValue}>ZMW {balances.escrow.toFixed(2)}</Text>
          </View>
       </View>
       <View style={styles.escrowItem}>
          <View style={[styles.escrowIconContainer, { backgroundColor: '#E8F5E9' }]}>
             <TrendingUp size={20} color={COLORS.success} />
          </View>
          <View>
             <Text style={styles.escrowLabel}>PENDING EARNINGS</Text>
             <Text style={styles.escrowValue}>ZMW {balances.pending.toFixed(2)}</Text>
          </View>
       </View>
    </View>
  );

  if (showAddFunds) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.addFundsContent}>
           <TouchableOpacity style={styles.backBtn} onClick={() => setShowAddFunds(false)}>
              <ArrowLeft size={24} color={COLORS.text} />
           </TouchableOpacity>
           <Text style={styles.addFundsTitle}>Deposit Funds</Text>
           
           <View style={styles.amountInputContainer}>
              <Text style={styles.zmw}>ZMW</Text>
              <TextInput 
                style={styles.amountInput}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                autoFocus
              />
           </View>

           <Text style={styles.sectionTitle}>Select Gateway</Text>
           <View style={styles.gatewayList}>
              {PAYMENT_METHODS.map(m => (
                <TouchableOpacity 
                   key={m.id} 
                   style={[styles.gatewayCard, selectedGateway === m.id && { borderColor: COLORS.primary, backgroundColor: '#f0fdf4' }]}
                   onClick={() => setSelectedGateway(m.id)}
                >
                   <Image source={{ uri: m.logo }} style={styles.gatewayLogo} resizeMode="contain" />
                   <Text style={[styles.gatewayText, selectedGateway === m.id && { color: COLORS.primary }]}>{m.label}</Text>
                   {selectedGateway === m.id && <ShieldCheck size={16} color={COLORS.primary} />}
                </TouchableOpacity>
              ))}
           </View>

           <TouchableOpacity 
             style={[styles.confirmBtn, loading && { opacity: 0.5 }]}
             disabled={loading}
             onClick={handleDeposit}
            >
              <Text style={styles.confirmBtnText}>{loading ? 'Processing...' : `Pay ZMW ${amount}`}</Text>
           </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
         <View style={styles.header}>
            <Text style={styles.headerTitle}>Finance Hub</Text>
            <TouchableOpacity style={styles.profileMini}>
               <Text style={styles.profileEmoji}>💰</Text>
            </TouchableOpacity>
         </View>

         {renderBalanceCard()}
         {renderEscrowSummary()}

         <Text style={styles.sectionTitle}>Recent Transactions</Text>
         <View style={styles.recentTransactions}>
            <View style={styles.emptyState}>
               <CreditCard size={48} color="#eee" />
               <Text style={styles.emptyText}>No transactions yet</Text>
            </View>
         </View>

         <TouchableOpacity style={styles.premiumBanner}>
            <View style={styles.premiumText}>
               <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
               <Text style={styles.premiumDesc}>Rank #1 and get 3x more jobs.</Text>
            </View>
            <ChevronRight color="white" size={24} />
         </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  scroll: { padding: SPACING.lg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  headerTitle: { fontSize: 32, fontWeight: 'bold', tracking: -1 },
  profileMini: { width: 48, height: 48, backgroundColor: COLORS.surface, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  profileEmoji: { fontSize: 24 },
  balanceCard: { backgroundColor: COLORS.primary, borderRadius: 40, padding: 32, ...SHADOWS.medium },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardLabel: { color: 'white', opacity: 0.6, fontWeight: 'bold', fontSize: 10, tracking: 2 },
  balanceText: { color: 'white', fontSize: 48, fontWeight: 'bold', tracking: -2, marginVertical: 16 },
  cardActions: { flexDirection: 'row', gap: 12 },
  cardButton: { backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 24 },
  cardButtonText: { fontWeight: 'bold', color: COLORS.primary, fontSize: 13 },
  escrowGrid: { flexDirection: 'row', gap: 16, marginTop: 16 },
  escrowItem: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 32, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 12 },
  escrowIconContainer: { width: 44, height: 44, backgroundColor: '#FFF3E0', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  escrowLabel: { fontSize: 8, fontWeight: 'bold', color: COLORS.textLight, tracking: 1 },
  escrowValue: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, tracking: -0.5 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text, marginTop: 32, marginBottom: 16 },
  recentTransactions: { minHeight: 200, justifyContent: 'center' },
  emptyState: { alignItems: 'center', gap: 8 },
  emptyText: { color: COLORS.textLight, fontWeight: 'bold' },
  premiumBanner: { backgroundColor: COLORS.secondary, padding: 24, borderRadius: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 },
  premiumText: { gap: 4 },
  premiumTitle: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  premiumDesc: { color: 'white', opacity: 0.8, fontSize: 12 },
  addFundsContent: { p: SPACING.xl, flex: 1 },
  backBtn: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.surface, borderRadius: 16, marginBottom: 24 },
  addFundsTitle: { fontSize: 32, fontWeight: 'bold', tracking: -1, marginBottom: 40 },
  amountInputContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 48 },
  zmw: { fontSize: 32, fontWeight: 'bold', color: '#ccc' },
  amountInput: { fontSize: 64, fontWeight: 'bold', color: COLORS.text, tracking: -3 },
  gatewayList: { gap: 12 },
  gatewayCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, padding: 20, borderRadius: 24, gap: 16, borderSize: 1, borderColor: '#eee' },
  gatewayLogo: { width: 40, height: 40, borderRadius: 8 },
  gatewayText: { flex: 1, fontWeight: 'bold', fontSize: 16, color: COLORS.text },
  confirmBtn: { backgroundColor: COLORS.primary, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginTop: 40, ...SHADOWS.medium },
  confirmBtnText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});
