import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
  Dimensions 
} from 'react-native';
import { COLORS, SPACING, SIZES, SHADOWS } from '../../constants/theme';
import { CATEGORIES, CATEGORY_TAGS } from '../../constants/categories';
import { useJobs } from '../../hooks/useJobs';
import { useAuth } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Check, ChevronRight, MapPin, DollarSign, Info } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export const CreateJobScreen = ({ navigation }: any) => {
  const { postJob, loading, error } = useJobs();
  const { profile } = useAuth();
  const [step, setStep] = useState(1);
  const [jobData, setJobData] = useState({
    category: '',
    tags: [] as string[],
    title: '',
    description: '',
    budget: 0,
    location: { lat: -15.3875, lng: 28.3228, address: "Lusaka, Zambia" }
  });

  const toggleTag = (tag: string) => {
    if (jobData.tags.includes(tag)) {
        setJobData({...jobData, tags: jobData.tags.filter(t => t !== tag)});
    } else {
        if (jobData.tags.length < 5) {
            setJobData({...jobData, tags: [...jobData.tags, tag]});
        }
    }
  };

  const handleCreate = async () => {
    try {
        await postJob(jobData);
        alert("Job posted successfully! Finding your matches...");
        // Navigate to matching screen or dashboard
        navigation.navigate('JobMatching', { jobId: 'pending' });
    } catch (err: any) {
        alert(err.message);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onClick={() => step > 1 ? setStep(step - 1) : navigation.goBack()}>
        <ArrowLeft color={COLORS.text} size={24} />
      </TouchableOpacity>
      <View style={styles.progressHeader}>
         <Text style={styles.stepTitle}>Step {step} of 3</Text>
         <View style={styles.progressBar}>
           <View style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]} />
         </View>
      </View>
      <View style={{ width: 24 }} />
    </View>
  );

  const renderCategoryStep = () => (
    <ScrollView contentContainerStyle={styles.stepContent}>
      <Text style={styles.instruction}>Select Service Category</Text>
      <View style={styles.categoryGrid}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity 
            key={cat.id} 
            style={[styles.categoryCard, jobData.category === cat.id && styles.categoryCardActive]}
            onClick={() => { setJobData({...jobData, category: cat.id, tags: []}); setStep(2); }}
          >
             <Text style={styles.categoryIcon}>{cat.icon === 'broom' ? '🧹' : cat.icon === 'tools' ? '🔧' : cat.icon === 'truck' ? '🚚' : '📦'}</Text>
             <Text style={[styles.categoryLabel, jobData.category === cat.id && styles.categoryLabelActive]}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  const renderTagsStep = () => {
    const availableTags = CATEGORY_TAGS[jobData.category] || [];
    return (
      <View style={styles.stepContent}>
        <Text style={styles.instruction}>Select up to 5 Tags</Text>
        <Text style={styles.tagCounter}>{jobData.tags.length}/5 Selected</Text>
        
        <View style={styles.tagList}>
          {availableTags.map(tag => (
            <TouchableOpacity 
               key={tag} 
               style={[styles.tagItem, jobData.tags.includes(tag) && styles.tagItemActive]}
               onClick={() => toggleTag(tag)}
            >
              <Text style={[styles.tagText, jobData.tags.includes(tag) && styles.tagTextActive]}>{tag}</Text>
              {jobData.tags.includes(tag) && <Check size={14} color="white" />}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.nextButton, jobData.tags.length === 0 && styles.nextButtonDisabled]}
          disabled={jobData.tags.length === 0}
          onClick={() => setStep(3)}
        >
          <Text style={styles.nextButtonText}>Next: Job Details</Text>
          <ChevronRight color="white" size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderDetailsStep = () => (
    <ScrollView contentContainerStyle={styles.stepContent}>
      <Text style={styles.instruction}>Fine-tune your job request</Text>
      
      <View style={styles.formSection}>
        <Text style={styles.label}>Job Title</Text>
        <TextInput 
           style={styles.input} 
           placeholder="e.g. Need help fixing my kitchen sink"
           value={jobData.title}
           onChangeText={(t) => setJobData({...jobData, title: t})}
        />
        
        <Text style={styles.label}>Description</Text>
        <TextInput 
           style={[styles.input, styles.textArea]} 
           multiline 
           numberOfLines={4}
           placeholder="Briefly explain what needs to be done..."
           value={jobData.description}
           onChangeText={(t) => setJobData({...jobData, description: t})}
        />

        <View style={styles.budgetRow}>
           <View style={{ flex: 1 }}>
              <Text style={styles.label}>Job Budget (ZMW)</Text>
              <View style={styles.budgetInputContainer}>
                <DollarSign size={18} color={COLORS.primary} />
                <TextInput 
                  style={styles.budgetInput} 
                  keyboardType="numeric"
                  value={String(jobData.budget)}
                  onChangeText={(t) => setJobData({...jobData, budget: Number(t)})}
                />
              </View>
           </View>
           <View style={styles.walletCheck}>
              <Info size={14} color={profile?.walletBalance! < jobData.budget ? COLORS.error : COLORS.success} />
              <Text style={[styles.walletLabel, profile?.walletBalance! < jobData.budget && {color: COLORS.error}]}>Wallet: ZMW {profile?.walletBalance}</Text>
           </View>
        </View>

        <TouchableOpacity 
           style={[styles.postButton, (loading || !jobData.title) && styles.postButtonDisabled]}
           disabled={loading || !jobData.title}
           onClick={handleCreate}
        >
          <Text style={styles.nextButtonText}>{loading ? 'Posting...' : 'Secure & Match Workers'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {step === 1 ? renderCategoryStep() : step === 2 ? renderTagsStep() : renderDetailsStep()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: SPACING.md, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0' 
  },
  progressHeader: { flex: 1, alignItems: 'center' },
  progressBar: { width: '60%', height: 4, backgroundColor: '#eee', borderRadius: 2, marginTop: 8 },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 2 },
  stepTitle: { fontWeight: 'bold', color: COLORS.text, fontSize: 12, tracking: 1 },
  stepContent: { padding: SPACING.lg },
  instruction: { fontSize: 32, fontWeight: 'bold', color: COLORS.text, tracking: -1, marginBottom: 8 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 24 },
  categoryCard: { 
    width: (width - 64) / 2, 
    aspectRatio: 1, 
    backgroundColor: COLORS.surface, 
    borderRadius: 32, 
    padding: 24, 
    justifyContent: 'center', 
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  categoryCardActive: { borderColor: COLORS.primary, backgroundColor: COLORS.white, ...SHADOWS.medium },
  categoryIcon: { fontSize: 32 },
  categoryLabel: { fontWeight: 'bold', color: COLORS.text, fontSize: 14, textAlign: 'center' },
  categoryLabelActive: { color: COLORS.primary },
  tagCounter: { fontSize: 14, fontWeight: 'bold', color: COLORS.primary, marginBottom: 24 },
  tagList: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tagItem: { 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    borderRadius: 24, 
    backgroundColor: '#f8f8f8', 
    borderWidth: 1, 
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  tagItemActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tagText: { fontWeight: 'bold', color: COLORS.textLight, fontSize: 13 },
  tagTextActive: { color: 'white' },
  nextButton: { 
    marginTop: 'auto', 
    backgroundColor: COLORS.primary, 
    height: 64, 
    borderRadius: 32, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 12,
    ...SHADOWS.medium 
  },
  nextButtonDisabled: { opacity: 0.5 },
  nextButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  formSection: { marginTop: 24, gap: 16 },
  label: { fontWeight: 'bold', color: COLORS.text, fontSize: 14 },
  input: { 
    backgroundColor: COLORS.surface, 
    borderRadius: SIZES.radiusMd, 
    padding: 20, 
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: '#eee' 
  },
  textArea: { height: 120, textAlignVertical: 'top' },
  budgetRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 16 },
  budgetInputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.surface, 
    borderRadius: SIZES.radiusMd, 
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#eee'
  },
  budgetInput: { 
    flex: 1, 
    height: 64, 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: COLORS.text, 
    marginLeft: 8 
  },
  walletCheck: { paddingBottom: 12, gap: 4 },
  walletLabel: { fontSize: 10, fontWeight: 'bold', color: COLORS.textLight },
  postButton: { 
    backgroundColor: COLORS.accent, 
    height: 64, 
    borderRadius: 32, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 24
  },
  postButtonDisabled: { opacity: 0.5 }
});
