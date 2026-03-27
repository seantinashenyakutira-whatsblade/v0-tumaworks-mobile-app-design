import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { COLORS, SPACING, SIZES, SHADOWS } from '../../constants/theme';
import { ChevronRight, MapPin, Phone, User, Globe } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

const LANGUAGES = ['English', 'Bemba', 'Nyanja', 'Tonga', 'Swahili'];

export const OnboardingScreen = ({ navigation }: any) => {
  const { user, refreshProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: 'Lusaka, Zambia',
    language: 'English'
  });

  const handleComplete = async () => {
    if (!user) return;
    try {
      await AuthService.updateProfile(user.uid, {
        name: formData.name,
        phoneNumber: formData.phone,
        preferredLanguage: formData.language as any,
        // Location logic would use a real map picker in production
      });
      await refreshProfile();
      // Navigation handled by Auth state change usually
    } catch (err) {
      alert("Failed to save profile");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <User color={COLORS.primary} size={64} style={styles.icon} />
            <Text style={styles.title}>What's your name?</Text>
            <Text style={styles.subtitle}>Help us personalize your experience.</Text>
            <TextInput 
              style={styles.input}
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(t) => setFormData({...formData, name: t})}
            />
          </View>
        );
      case 2:
          return (
            <View style={styles.stepContainer}>
              <Phone color={COLORS.primary} size={64} style={styles.icon} />
              <Text style={styles.title}>Your Phone Number</Text>
              <Text style={styles.subtitle}>Required for secure Mobile Money payments.</Text>
              <TextInput 
                style={styles.input}
                placeholder="+260 9xx xxx xxx"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(t) => setFormData({...formData, phone: t})}
              />
            </View>
          );
      case 3:
          return (
            <View style={styles.stepContainer}>
              <Globe color={COLORS.primary} size={64} style={styles.icon} />
              <Text style={styles.title}>Preferred Language</Text>
              <Text style={styles.subtitle}>Tumaworks speaks your language.</Text>
              <View style={styles.languageGrid}>
                {LANGUAGES.map(lang => (
                  <TouchableOpacity 
                    key={lang} 
                    style={[styles.langChip, formData.language === lang && styles.langChipActive]}
                    onClick={() => setFormData({...formData, language: lang})}
                  >
                    <Text style={[styles.langText, formData.language === lang && styles.langTextActive]}>{lang}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
      default: return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.progressContainer}>
             {[1, 2, 3].map(s => (
               <View key={s} style={[styles.progressDot, s <= step && styles.progressDotActive]} />
             ))}
          </View>
          
          {renderStep()}

          <View style={styles.footer}>
             <TouchableOpacity 
               style={styles.button} 
               onClick={() => step < 3 ? setStep(step + 1) : handleComplete()}
             >
                <Text style={styles.buttonText}>{step < 3 ? 'Continue' : 'Get Started'}</Text>
                <ChevronRight color="white" size={20} />
             </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  scroll: { flexGrow: 1, padding: SPACING.xl, justifyContent: 'center' },
  progressContainer: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 40 },
  progressDot: { width: 12, height: 4, borderRadius: 2, backgroundColor: COLORS.surface },
  progressDotActive: { width: 24, backgroundColor: COLORS.primary },
  stepContainer: { alignItems: 'center', gap: 12 },
  icon: { marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: COLORS.text, textAlign: 'center', letterSpacing: -1 },
  subtitle: { fontSize: 16, color: COLORS.textLight, textAlign: 'center', marginBottom: 20 },
  input: { 
    width: '100%', 
    height: 64, 
    backgroundColor: COLORS.surface, 
    borderRadius: SIZES.radiusMd, 
    paddingHorizontal: 20, 
    fontSize: 18, 
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#eee'
  },
  languageGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 20 },
  langChip: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 30, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: '#eee' },
  langChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  langText: { fontWeight: 'bold', color: COLORS.textLight },
  langTextActive: { color: 'white' },
  footer: { marginTop: 40, width: '100%' },
  button: { 
    backgroundColor: COLORS.primary, 
    height: 64, 
    borderRadius: 32, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8,
    ...SHADOWS.medium 
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});
