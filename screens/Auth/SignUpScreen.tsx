import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Image
} from 'react-native';
import { COLORS, SPACING, SIZES, SHADOWS } from '../../constants/theme';
import { Mail, Lock, User, Phone, ChevronRight, ArrowLeft, Check } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthService } from '../../services/authService';

export const SignUpScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!formData.email || !formData.password || !formData.agreeToTerms) return;
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await AuthService.signUp(formData.email, formData.password, {
        name: formData.name,
        phoneNumber: formData.phone
      });
      // Auth state change listener handles navigation to Onboarding or Dashboard
    } catch (err: any) {
      alert(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.content}>
           <TouchableOpacity style={styles.backBtn} onClick={() => navigation.goBack()}>
              <ArrowLeft size={24} color={COLORS.text} />
           </TouchableOpacity>

           <View style={styles.header}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Start your service journey in Zambia</Text>
           </View>

           <View style={styles.form}>
              <View style={styles.inputContainer}>
                 <User size={20} color={COLORS.textLight} />
                 <TextInput 
                   style={styles.input}
                   placeholder="Full Name"
                   value={formData.name}
                   onChangeText={(t) => setFormData({...formData, name: t})}
                 />
              </View>

              <View style={styles.inputContainer}>
                 <Mail size={20} color={COLORS.textLight} />
                 <TextInput 
                   style={styles.input}
                   placeholder="Email Address"
                   value={formData.email}
                   onChangeText={(t) => setFormData({...formData, email: t})}
                   autoCapitalize="none"
                 />
              </View>

              <View style={styles.inputContainer}>
                 <Phone size={20} color={COLORS.textLight} />
                 <TextInput 
                   style={styles.input}
                   placeholder="Phone (+260)"
                   value={formData.phone}
                   onChangeText={(t) => setFormData({...formData, phone: t})}
                   keyboardType="phone-pad"
                 />
              </View>

              <View style={styles.inputContainer}>
                 <Lock size={20} color={COLORS.textLight} />
                 <TextInput 
                   style={styles.input}
                   placeholder="Password"
                   value={formData.password}
                   onChangeText={(t) => setFormData({...formData, password: t})}
                   secureTextEntry
                 />
              </View>

              <View style={styles.inputContainer}>
                 <Lock size={20} color={COLORS.textLight} />
                 <TextInput 
                   style={styles.input}
                   placeholder="Confirm Password"
                   value={formData.confirmPassword}
                   onChangeText={(t) => setFormData({...formData, confirmPassword: t})}
                   secureTextEntry
                 />
              </View>

              <TouchableOpacity 
                 style={styles.termsRow}
                 onClick={() => setFormData({...formData, agreeToTerms: !formData.agreeToTerms})}
              >
                  <View style={[styles.checkbox, formData.agreeToTerms && styles.checkboxActive]}>
                    {formData.agreeToTerms && <Check color="white" size={12} />}
                  </View>
                  <Text style={styles.termsText}>I agree to the Terms of Service & Privacy Policy</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.signUpBtn, (loading || !formData.agreeToTerms) && { opacity: 0.5 }]} 
                disabled={loading || !formData.agreeToTerms}
                onClick={handleSignUp}
              >
                 <Text style={styles.btnText}>{loading ? 'Creating Account...' : 'Sign Up'}</Text>
                 {!loading && <ChevronRight color="white" size={20} />}
              </TouchableOpacity>
           </View>

           <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onClick={() => navigation.navigate('SignIn')}>
                 <Text style={styles.linkText}>Sign In</Text>
              </TouchableOpacity>
           </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { padding: SPACING.xl, flexGrow: 1 },
  backBtn: { width: 48, height: 48, backgroundColor: COLORS.surface, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  header: { marginBottom: 32 },
  title: { fontSize: 36, fontWeight: 'bold', color: COLORS.text, tracking: -1.5 },
  subtitle: { fontSize: 16, color: COLORS.textLight, marginTop: 4, fontWeight: 'bold' },
  form: { gap: 16 },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.surface, 
    borderRadius: 20, 
    paddingHorizontal: 20,
    height: 64,
    borderWidth: 1,
    borderColor: '#eee'
  },
  input: { flex: 1, marginLeft: 12, fontWeight: 'bold', fontSize: 16, color: COLORS.text },
  termsRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 },
  checkbox: { width: 20, height: 20, borderRadius: 6, borderWidth: 1, borderColor: '#ddd', alignItems: 'center', justifyContent: 'center' },
  checkboxActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  termsText: { fontSize: 12, color: COLORS.textLight, fontWeight: 'bold' },
  signUpBtn: { 
    backgroundColor: COLORS.primary, 
    height: 64, 
    borderRadius: 32, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 12,
    marginTop: 16,
    ...SHADOWS.medium 
  },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32, marginBottom: 20 },
  footerText: { color: COLORS.textLight, fontWeight: 'bold' },
  linkText: { color: COLORS.primary, fontWeight: 'bold' }
});
