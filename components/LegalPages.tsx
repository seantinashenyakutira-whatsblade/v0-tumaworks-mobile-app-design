import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import { ArrowLeft, Shield } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LegalContent = ({ type, onBack }: { type: 'terms' | 'privacy', onBack: () => void }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
         <TouchableOpacity style={styles.backBtn} onClick={onBack}>
            <ArrowLeft size={24} color={COLORS.text} />
         </TouchableOpacity>
         <Text style={styles.title}>{type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scroll}>
         <View style={styles.iconContainer}>
            <Shield size={64} color={COLORS.primary} />
         </View>

         <Text style={styles.intro}>
           Last Updates: March 2026. Please read these terms carefully before using the Tumaworks platform.
         </Text>

         <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
         <Text style={styles.body}>
           By accessing and using Tumaworks, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you are prohibited from using the application.
         </Text>

         <Text style={styles.sectionTitle}>2. Escrow & Payments</Text>
         <Text style={styles.body}>
           Tumaworks operates on an escrow-based payment system. Funds for jobs are locked upon creation and released only after both parties confirm job completion. Tumaworks takes a 5% service fee from all successful transactions.
         </Text>

         <Text style={styles.sectionTitle}>3. User Roles</Text>
         <Text style={styles.body}>
           Users may operate as both Clients and Workers. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or mobile device.
         </Text>

         <Text style={styles.sectionTitle}>4. Data Privacy</Text>
         <Text style={styles.body}>
           We collect your name, phone number, and location to provide matching and payment services. Your data is encrypted and never sold to third parties. For more details, refer to our full Privacy Policy.
         </Text>

         <View style={styles.footer}>
            <Text style={styles.footerText}>Tumaworks Lusaka Headquarters, Zambia</Text>
            <Text style={styles.footerText}>support@tumaworks.com</Text>
         </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: SPACING.md, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f0f0f0', gap: 16 },
  backBtn: { width: 44, height: 44, backgroundColor: COLORS.surface, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  scroll: { padding: SPACING.lg },
  iconContainer: { alignItems: 'center', marginVertical: 32 },
  intro: { fontSize: 13, color: COLORS.textLight, fontWeight: 'bold', textAlign: 'center', marginBottom: 24, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginTop: 24, marginBottom: 8 },
  body: { fontSize: 14, color: COLORS.textLight, lineHeight: 22, fontWeight: 'bold' },
  footer: { marginTop: 48, padding: 32, backgroundColor: COLORS.surface, borderRadius: 32, alignItems: 'center', gap: 4 },
  footerText: { fontSize: 10, color: COLORS.textLight, fontWeight: 'bold', tracking: 1 }
});
