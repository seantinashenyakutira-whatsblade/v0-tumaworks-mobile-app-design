import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface PremiumContextType {
  isPremium: boolean;
  premiumType?: 'individual' | 'business';
  checkPremiumStatus: () => boolean;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const PremiumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile } = useAuth();
  
  const checkPremiumStatus = () => {
    if (!profile?.isPremium) return false;
    // Check if subscription has expired
    const now = new Date();
    const expiry = profile.premiumUntil ? (profile.premiumUntil as any).toDate ? (profile.premiumUntil as any).toDate() : new Date(profile.premiumUntil as any) : null;
    return expiry ? expiry > now : true;
  };

  return (
    <PremiumContext.Provider 
      value={{ 
        isPremium: checkPremiumStatus(), 
        premiumType: profile?.premiumType,
        checkPremiumStatus 
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
};
