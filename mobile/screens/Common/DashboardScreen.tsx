import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Animated 
} from 'react-native';
import { COLORS, SPACING, SIZES, SHADOWS } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, 
  Map as MapIcon, 
  CircleUser, 
  Bell, 
  Plus, 
  Briefcase, 
  TrendingUp, 
  ShoppingBag,
  Zap
} from 'lucide-react-native';
import { CATEGORIES } from '../../constants/categories';

export const DashboardScreen = ({ navigation }: any) => {
  const { profile, refreshProfile } = useAuth();
  const [isWorkerMode, setIsWorkerMode] = useState(profile?.currentMode === 'worker');

  const toggleMode = async () => {
    const newMode = isWorkerMode ? 'client' : 'worker';
    setIsWorkerMode(!isWorkerMode);
    // Persist to Firebase in production via AuthService.switchRoleMode
    alert(`Switched to ${newMode.toUpperCase()} Mode`);
  };

  const renderClientDashboard = () => (
    <View style={styles.dashboardContent}>
       <View style={styles.searchBar}>
          <Search color={COLORS.textLight} size={20} />
          <TextInput placeholder="Search for plumbers, cleaners..." style={styles.searchInput} />
       </View>

       <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity>
             <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
       </View>

       <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {CATEGORIES.slice(0, 5).map(cat => (
            <TouchableOpacity key={cat.id} style={styles.categoryItem} onClick={() => navigation.navigate('CreateJob', { cat: cat.id })}>
               <View style={styles.categoryIconCircle}>
                  <Text style={{ fontSize: 24 }}>{cat.icon === 'broom' ? '🧹' : '🔧'}</Text>
               </View>
               <Text style={styles.categoryLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
       </ScrollView>

       <TouchableOpacity style={styles.postCta} onClick={() => navigation.navigate('CreateJob')}>
          <View style={styles.postCtaContent}>
             <Text style={styles.postCtaTitle}>Need something done?</Text>
             <Text style={styles.postCtaSub}>Post a job and match with pros nearby.</Text>
          </View>
          <View style={styles.postBtn}>
            <Plus color="white" size={24} />
          </View>
       </TouchableOpacity>

       <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Marketplace</Text>
          <TouchableOpacity onClick={() => navigation.navigate('Marketplace')}>
             <Text style={styles.seeAll}>Browse Items</Text>
          </TouchableOpacity>
       </View>
       <View style={styles.marketplacePreview}>
          <ShoppingBag color={COLORS.secondary} size={32} />
          <Text style={styles.marketText}>Items for sale in Lusaka</Text>
       </View>
    </View>
  );

  const renderWorkerDashboard = () => (
    <View style={styles.dashboardContent}>
       <View style={styles.statsRow}>
          <View style={styles.statBox}>
             <Text style={styles.statLabel}>JOBS NEARBY</Text>
             <Text style={styles.statValue}>12</Text>
          </View>
          <View style={styles.statBox}>
             <Text style={styles.statLabel}>THIS WEEK</Text>
             <Text style={styles.statValue}>ZMW 2,450</Text>
          </View>
       </View>

       <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Gigs</Text>
          <View style={styles.liveIndicator}>
             <View style={styles.liveDot} />
             <Text style={styles.liveText}>LIVE</Text>
          </View>
       </View>

       <View style={styles.jobList}>
          {[1, 2].map(i => (
            <View key={i} style={styles.jobCard}>
               <View style={styles.jobHeader}>
                  <Text style={styles.jobCategory}>REPAIRS</Text>
                  <Text style={styles.jobBudget}>ZMW 150</Text>
               </View>
               <Text style={styles.jobTitle}>Fix leaking tap in Emmasdale</Text>
               <View style={styles.jobFooter}>
                  <View style={styles.jobInfo}>
                    <MapIcon size={14} color={COLORS.textLight} />
                    <Text style={styles.jobLoc}>1.2km away</Text>
                  </View>
                  <TouchableOpacity style={styles.acceptBtn}>
                     <Text style={styles.acceptText}>View Details</Text>
                  </TouchableOpacity>
               </View>
            </View>
          ))}
       </View>

       <TouchableOpacity style={styles.premiumBoost}>
          <Zap color="white" size={20} fill="white" />
          <Text style={styles.boostText}>Activate Priority Matching (Premium)</Text>
       </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
         <View>
            <Text style={styles.welcome}>Good Morning,</Text>
            <Text style={styles.userName}>{profile?.name?.split(' ')[0] || 'User'}</Text>
         </View>
         <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn}><Bell size={24} color={COLORS.text} /></TouchableOpacity>
            <TouchableOpacity style={styles.modeToggle} onClick={toggleMode}>
               <View style={[styles.modeIndicator, isWorkerMode && { backgroundColor: COLORS.secondary }]} />
               <Text style={styles.modeLabel}>{isWorkerMode ? 'WORKER' : 'CLIENT'}</Text>
            </TouchableOpacity>
         </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {isWorkerMode ? renderWorkerDashboard() : renderClientDashboard()}
      </ScrollView>

      <View style={styles.bottomNav}>
         <TouchableOpacity style={styles.navItem}><Briefcase size={24} color={COLORS.primary}/></TouchableOpacity>
         <TouchableOpacity style={styles.navItem} onClick={() => navigation.navigate('Map')}><MapIcon size={24} color={COLORS.textLight}/></TouchableOpacity>
         <TouchableOpacity style={styles.navCentral} onClick={() => navigation.navigate('CreateJob')}><Plus size={32} color="white"/></TouchableOpacity>
         <TouchableOpacity style={styles.navItem} onClick={() => navigation.navigate('Wallet')}><TrendingUp size={24} color={COLORS.textLight}/></TouchableOpacity>
         <TouchableOpacity style={styles.navItem}><CircleUser size={24} color={COLORS.textLight}/></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: SPACING.lg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  welcome: { fontSize: 14, color: COLORS.textLight, fontWeight: 'bold' },
  userName: { fontSize: 24, fontWeight: 'bold', tracking: -1 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBtn: { padding: 8 },
  modeToggle: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.surface, 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 20, 
    gap: 8,
    borderWidth: 1,
    borderColor: '#eee'
  },
  modeIndicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary },
  modeLabel: { fontSize: 10, fontWeight: 'bold', tracking: 1 },
  dashboardContent: { padding: SPACING.lg },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.surface, 
    padding: 16, 
    borderRadius: 20, 
    gap: 12,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  searchInput: { flex: 1, fontWeight: 'bold', fontSize: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  seeAll: { color: COLORS.primary, fontWeight: 'bold', fontSize: 12 },
  categoryScroll: { gap: 20, marginBottom: 32 },
  categoryItem: { alignItems: 'center', gap: 8 },
  categoryIconCircle: { width: 72, height: 72, backgroundColor: COLORS.surface, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  categoryLabel: { fontSize: 11, fontWeight: 'bold', color: COLORS.textLight },
  postCta: { backgroundColor: COLORS.primary, padding: 32, borderRadius: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...SHADOWS.medium },
  postCtaContent: { flex: 1, gap: 4 },
  postCtaTitle: { color: 'white', fontWeight: 'bold', fontSize: 20, tracking: -0.5 },
  postCtaSub: { color: 'white', opacity: 0.7, fontSize: 12 },
  postBtn: { width: 56, height: 56, backgroundColor: 'white', borderRadius: 20, alignItems: 'center', justifyContent: 'center', opacity: 0.2 },
  marketplacePreview: { height: 120, backgroundColor: COLORS.surface, borderRadius: 32, alignItems: 'center', justifyContent: 'center', gap: 8 },
  marketText: { fontWeight: 'bold', color: COLORS.textLight, fontSize: 12 },
  statsRow: { flexDirection: 'row', gap: 16, marginBottom: 32 },
  statBox: { flex: 1, backgroundColor: COLORS.surface, p: 24, borderRadius: 32, gap: 4 },
  statLabel: { fontSize: 10, fontWeight: 'bold', color: COLORS.textLight, tracking: 1 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary },
  liveIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#ffebee', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#f44336' },
  liveText: { fontSize: 10, fontWeight: 'bold', color: '#f44336' },
  jobList: { gap: 16 },
  jobCard: { backgroundColor: COLORS.white, padding: 24, borderRadius: 32, ...SHADOWS.light, borderSize: 1, borderColor: '#f0f0f0' },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  jobCategory: { fontSize: 10, fontWeight: 'bold', color: COLORS.primary, tracking: 2 },
  jobBudget: { fontWeight: 'bold', color: COLORS.text },
  jobTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 16 },
  jobFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  jobInfo: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  jobLoc: { fontSize: 12, color: COLORS.textLight, fontWeight: 'bold' },
  acceptBtn: { backgroundColor: COLORS.surface, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  acceptText: { fontSize: 12, fontWeight: 'bold', color: COLORS.primary },
  premiumBoost: { backgroundColor: COLORS.accent, padding: 20, borderRadius: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 24 },
  boostText: { color: 'white', fontWeight: 'bold' },
  bottomNav: { 
    position: 'absolute', 
    bottom: 24, 
    left: 24, 
    right: 24, 
    height: 80, 
    backgroundColor: 'white', 
    borderRadius: 40, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around', 
    ...SHADOWS.medium,
    paddingHorizontal: 20
  },
  navItem: { padding: 12 },
  navCentral: { width: 64, height: 64, backgroundColor: COLORS.primary, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginTop: -40, ...SHADOWS.medium }
});
