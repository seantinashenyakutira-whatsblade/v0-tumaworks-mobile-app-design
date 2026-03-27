import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Switch 
} from 'react-native';
import { COLORS, SPACING, SIZES, SHADOWS } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Briefcase, 
  Star, 
  ChevronRight, 
  Settings, 
  Shield, 
  LogOut, 
  Award, 
  MapPin, 
  Clock, 
  Smartphone,
  CreditCard,
  MessageCircle
} from 'lucide-react-native';

export const ProfileScreen = ({ navigation }: any) => {
  const { profile, logout } = useAuth();
  const [isWorker, setIsWorker] = useState(profile?.currentMode === 'worker');

  const MENU_ITEMS = [
    { id: 'history', label: 'Job History', icon: Clock, color: '#2196F3' },
    { id: 'wallet', label: 'Wallet & Payouts', icon: CreditCard, color: '#4CAF50' },
    { id: 'reviews', label: 'My Reviews', icon: Star, color: '#FF9800' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, color: '#9C27B0' },
    { id: 'premium', label: 'Upgrade to premium', icon: Award, color: COLORS.accent },
    { id: 'settings', label: 'Account Settings', icon: Settings, color: COLORS.textLight },
    { id: 'legal', label: 'Privacy & Legal', icon: Shield, color: COLORS.textLight },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      // Navigation handled by auth state
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
       <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.header}>
             <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                   <User size={48} color={COLORS.primary} />
                </View>
                {profile?.isPremium && (
                  <View style={styles.premiumBadge}>
                     <Award size={12} color="white" />
                  </View>
                )}
             </View>
             
             <Text style={styles.userName}>{profile?.name || 'Tumaworks User'}</Text>
             <View style={styles.locationRow}>
                <MapPin size={14} color={COLORS.textLight} />
                <Text style={styles.userPhone}>{profile?.location?.address || 'Lusaka, Zambia'}</Text>
             </View>
             <Text style={styles.phoneNumber}>{profile?.phoneNumber}</Text>

             <View style={styles.statsGrid}>
                <View style={styles.statBox}>
                   <Text style={styles.statVal}>{profile?.rating.toFixed(1)}</Text>
                   <View style={styles.statRow}>
                      <Star size={10} color={COLORS.accent} fill={COLORS.accent} />
                      <Text style={styles.statLabel}>Rating</Text>
                   </View>
                </View>
                <View style={[styles.statBox, styles.statBorder]}>
                   <Text style={styles.statVal}>{profile?.reviewsCount}</Text>
                   <Text style={styles.statLabel}>Reviews</Text>
                </View>
                <View style={styles.statBox}>
                   <Text style={styles.statVal}>32</Text>
                   <Text style={styles.statLabel}>Jobs</Text>
                </View>
             </View>
          </View>

          <View style={styles.modeCard}>
             <View style={styles.modeInfo}>
                <Briefcase size={20} color={isWorker ? COLORS.secondary : COLORS.primary} />
                <View>
                   <Text style={styles.modeTitle}>{isWorker ? 'Worker Mode Active' : 'Client Mode Active'}</Text>
                   <Text style={styles.modeSub}>{isWorker ? 'Earning ZMW from gigs' : 'Hiring pros for jobs'}</Text>
                </View>
             </View>
             <Switch 
               value={isWorker} 
               onValueChange={setIsWorker} 
               trackColor={{ false: '#ddd', true: COLORS.primary }}
               thumbColor="white"
             />
          </View>

          <View style={styles.menuList}>
             {MENU_ITEMS.map(item => (
                <TouchableOpacity 
                   key={item.id} 
                   style={styles.menuItem} 
                   onClick={() => navigation.navigate(item.label.replace(' ', ''))}
                >
                   <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                      <item.icon size={20} color={item.color} />
                   </View>
                   <Text style={styles.menuLabel}>{item.label}</Text>
                   <ChevronRight size={18} color="#ccc" />
                </TouchableOpacity>
             ))}
             
             <TouchableOpacity style={[styles.menuItem, styles.logoutBtn]} onClick={handleLogout}>
                <View style={[styles.menuIcon, { backgroundColor: '#FFEBEE' }]}>
                   <LogOut size={20} color="#F44336" />
                </View>
                <Text style={[styles.menuLabel, { color: '#F44336' }]}>Sign Out</Text>
             </TouchableOpacity>
          </View>

          <View style={styles.appInfo}>
             <Text style={styles.vText}>Tumaworks for Mobile v1.0.4 - Production</Text>
             <Text style={styles.vText}>Build 240B - ACCENTURE DEV</Text>
          </View>
       </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  scroll: { padding: SPACING.lg, paddingBottom: 100 },
  header: { alignItems: 'center', marginBottom: 32 },
  avatarContainer: { width: 100, height: 100, position: 'relative', marginBottom: 16 },
  avatar: { width: '100%', height: '100%', backgroundColor: COLORS.surface, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: 'white', ...SHADOWS.light },
  premiumBadge: { position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, backgroundColor: COLORS.accent, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderSize: 2, borderColor: 'white' },
  userName: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, tracking: -0.5 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  userPhone: { fontSize: 13, color: COLORS.textLight, fontWeight: 'bold' },
  phoneNumber: { fontSize: 14, color: COLORS.primary, fontWeight: 'bold', marginTop: 4 },
  statsGrid: { flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: 24, marginTop: 24, padding: 12 },
  statBox: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#eee' },
  statVal: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  statRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statLabel: { fontSize: 10, fontWeight: 'bold', color: COLORS.textLight, tracking: 1 },
  modeCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: COLORS.white, 
    padding: 24, 
    borderRadius: 32, 
    borderWidth: 1, 
    borderColor: '#f0f0f0',
    marginBottom: 32,
    ...SHADOWS.light
   },
  modeInfo: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  modeTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  modeSub: { fontSize: 12, color: COLORS.textLight, fontWeight: 'bold' },
  menuList: { gap: 8 },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.white, 
    padding: 16, 
    borderRadius: 20, 
    gap: 16,
    borderSize: 1,
    borderColor: '#f8f8f8'
  },
  menuIcon: { width: 44, height: 44, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontWeight: 'bold', fontSize: 15, color: COLORS.text },
  logoutBtn: { marginTop: 12 },
  appInfo: { marginTop: 40, alignItems: 'center', gap: 4, opacity: 0.5 },
  vText: { fontSize: 10, fontWeight: 'bold', color: COLORS.textLight, tracking: 1 }
});
