import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export const AdMobBanner = () => {
    // In production:
    // import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
    
    return (
        <View style={styles.banner}>
            <Text style={styles.adText}>AdMob Banner Placeholder</Text>
        </View>
    );
};

export const RewardedAdSystem = () => {
    // Hook for rewarded ads which gives Diamonds
    const showRewardedAd = () => {
        alert("Playing Rewarded Video... You earned +10 Diamonds!");
    };

    return { showRewardedAd };
};

const styles = StyleSheet.create({
  banner: { 
    width: '100%', 
    height: 60, 
    backgroundColor: '#eee', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  adText: { fontSize: 10, fontWeight: 'bold', color: COLORS.textLight, tracking: 1 }
});
