import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Image
} from 'react-native';
import { COLORS, SPACING, SIZES, SHADOWS } from '../../constants/theme';
import { Mail, Lock, ChevronRight, ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthService } from '../../services/authService';

export const SignInScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      await AuthService.signIn(email, password);
      // Auth state listener handles navigation
    } catch (err: any) {
      alert(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <View style={styles.content}>
           <TouchableOpacity style={styles.backBtn} onClick={() => navigation.goBack()}>
              <ArrowLeft size={24} color={COLORS.text} />
           </TouchableOpacity>

           <View style={styles.header}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to your Tumaworks account</Text>
           </View>

           <View style={styles.form}>
              <View style={styles.inputContainer}>
                 <Mail size={20} color={COLORS.textLight} />
                 <TextInput 
                   style={styles.input}
                   placeholder="Email Address"
                   value={email}
                   onChangeText={setEmail}
                   keyboardType="email-address"
                   autoCapitalize="none"
                 />
              </View>

              <View style={styles.inputContainer}>
                 <Lock size={20} color={COLORS.textLight} />
                 <TextInput 
                   style={styles.input}
                   placeholder="Password"
                   value={password}
                   onChangeText={setPassword}
                   secureTextEntry
                 />
              </View>

              <TouchableOpacity style={styles.forgotPass}>
                 <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.signInBtn, loading && { opacity: 0.5 }]} 
                disabled={loading}
                onClick={handleSignIn}
              >
                 <Text style={styles.btnText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
                 {!loading && <ChevronRight color="white" size={20} />}
              </TouchableOpacity>
           </View>

           <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onClick={() => navigation.navigate('SignUp')}>
                 <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
           </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { flex: 1, padding: SPACING.xl },
  backBtn: { width: 48, height: 48, backgroundColor: COLORS.surface, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  header: { marginBottom: 40 },
  title: { fontSize: 40, fontWeight: 'bold', color: COLORS.text, tracking: -1.5 },
  subtitle: { fontSize: 16, color: COLORS.textLight, marginTop: 8, fontWeight: 'bold' },
  form: { gap: 20 },
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
  forgotPass: { alignSelf: 'flex-end' },
  forgotText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 14 },
  signInBtn: { 
    backgroundColor: COLORS.primary, 
    height: 64, 
    borderRadius: 32, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 12,
    marginTop: 20,
    ...SHADOWS.medium 
  },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto', marginBottom: 20 },
  footerText: { color: COLORS.textLight, fontWeight: 'bold' },
  signUpLink: { color: COLORS.primary, fontWeight: 'bold' }
});
