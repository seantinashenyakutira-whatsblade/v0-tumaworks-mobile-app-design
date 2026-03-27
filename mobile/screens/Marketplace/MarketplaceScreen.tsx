import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  TextInput,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { COLORS, SPACING, SIZES, SHADOWS } from '../../constants/theme';
import { DatabaseService } from '../../services/databaseService';
import { MarketplaceListing } from '../../utils/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, 
  Filter, 
  Plus, 
  Heart, 
  MapPin, 
  Tag, 
  ArrowLeft, 
  ShoppingBag,
  Clock
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export const MarketplaceScreen = ({ navigation }: any) => {
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const CATEGORIES = ['All', 'Electronics', 'Home', 'Tools', 'Fashion', 'Art', 'Other'];

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const data = await DatabaseService.getMarketplaceListings();
      setListings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderListing = ({ item }: { item: MarketplaceListing }) => (
    <TouchableOpacity style={styles.listingCard} onClick={() => navigation.navigate('ListingDetail', { listing: item })}>
       <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' }} 
            style={styles.listingImage} 
          />
          <TouchableOpacity style={styles.wishlistBtn}>
             <Heart size={16} color="white" />
          </TouchableOpacity>
       </View>
       <View style={styles.listingContent}>
          <Text style={styles.listingPrice}>ZMW {item.price}</Text>
          <Text style={styles.listingTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.listingLocation}>
             <MapPin size={10} color={COLORS.textLight} />
             <Text style={styles.locationText}>{item.location?.address?.split(',')[0] || 'Lusaka'}</Text>
          </View>
       </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.header}>
          <View style={styles.headerTop}>
             <TouchableOpacity style={styles.backBtn} onClick={() => navigation.goBack()}>
                <ArrowLeft size={24} color={COLORS.text} />
             </TouchableOpacity>
             <Text style={styles.headerTitle}>Marketplace</Text>
             <TouchableOpacity style={styles.sellBtn} onClick={() => navigation.navigate('CreateListing')}>
                <Plus size={20} color="white" />
                <Text style={styles.sellBtnText}>Sell</Text>
             </TouchableOpacity>
          </View>
          
          <View style={styles.searchContainer}>
             <View style={styles.searchBar}>
                <Search size={20} color={COLORS.textLight} />
                <TextInput 
                   style={styles.searchInput}
                   placeholder="Search for items..."
                   value={searchQuery}
                   onChangeText={setSearchQuery}
                />
             </View>
             <TouchableOpacity style={styles.filterBtn}>
                <Filter size={20} color={COLORS.text} />
             </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
             {CATEGORIES.map(cat => (
               <TouchableOpacity 
                  key={cat} 
                  style={[styles.catItem, selectedCategory === cat && styles.catItemActive]}
                  onClick={() => setSelectedCategory(cat)}
               >
                  <Text style={[styles.catText, selectedCategory === cat && styles.catTextActive]}>{cat}</Text>
               </TouchableOpacity>
             ))}
          </ScrollView>
       </View>

       {loading ? (
         <View style={styles.loader}>
            <ActivityIndicator size="large" color={COLORS.primary} />
         </View>
       ) : (
         <FlatList 
            data={listings}
            keyExtractor={item => item.id}
            renderItem={renderListing}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
               <View style={styles.promoBanner}>
                  <Tag size={20} color="white" />
                  <Text style={styles.promoText}>Featured Local Artisans in Copperbelt</Text>
               </View>
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                 <ShoppingBag size={64} color="#eee" />
                 <Text style={styles.emptyTitle}>No items found</Text>
                 <Text style={styles.emptySub}>Try adjusting your filters or category.</Text>
              </View>
            )}
         />
       )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: SPACING.md, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.surface, borderRadius: 12 },
  headerTitle: { fontSize: 32, fontWeight: 'bold', tracking: -1 },
  sellBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.accent, 
    height: 44, 
    borderRadius: 22, 
    paddingHorizontal: 20, 
    gap: 8,
    ...SHADOWS.medium 
  },
  sellBtnText: { color: 'white', fontWeight: 'bold' },
  searchContainer: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  searchBar: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.surface, 
    height: 56, 
    borderRadius: 20, 
    paddingHorizontal: 16, 
    gap: 12,
    borderSize: 1,
    borderColor: '#eee'
  },
  searchInput: { flex: 1, fontWeight: 'bold', fontSize: 16 },
  filterBtn: { width: 56, height: 56, backgroundColor: COLORS.surface, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  catScroll: { paddingVertical: 8 },
  catItem: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: COLORS.surface, marginRight: 12 },
  catItemActive: { backgroundColor: COLORS.primary },
  catText: { fontSize: 13, fontWeight: 'bold', color: COLORS.textLight },
  catTextActive: { color: 'white' },
  listContent: { padding: SPACING.md },
  promoBanner: { 
    backgroundColor: COLORS.secondary, 
    padding: 24, 
    borderRadius: 32, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    marginBottom: 24 
  },
  promoText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  listingCard: { width: (width - 48) / 2, marginBottom: 20, marginRight: 16 },
  imageContainer: { width: '100%', aspectRatio: 0.9, borderRadius: 24, overflow: 'hidden', position: 'relative' },
  listingImage: { width: '100%', height: '100%' },
  wishlistBtn: { position: 'absolute', top: 12, right: 12, width: 32, height: 32, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  listingContent: { marginTop: 12, gap: 4, paddingHorizontal: 4 },
  listingPrice: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary },
  listingTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.text, tracking: -0.2 },
  listingLocation: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  locationText: { fontSize: 10, color: COLORS.textLight, fontWeight: 'bold' },
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40, marginTop: 40 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text, marginTop: 24 },
  emptySub: { fontSize: 14, color: COLORS.textLight, textAlign: 'center', marginTop: 8 }
});
