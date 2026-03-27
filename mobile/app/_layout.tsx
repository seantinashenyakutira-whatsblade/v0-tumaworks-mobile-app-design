import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { PremiumProvider } from '../context/PremiumContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';

/**
 * Root Navigation Layout (Expo Router)
 * Phase 1: Clean Architecture Rebuild
 */
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PremiumProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              contentStyle: { backgroundColor: COLORS.white }
            }}
          >
            {/* Auth flow */}
            <Stack.Screen name="index" options={{ title: 'Welcome' }} />
            <Stack.Screen name="auth/signin" options={{ title: 'Sign In' }} />
            <Stack.Screen name="auth/signup" options={{ title: 'Sign Up' }} />
            <Stack.Screen name="auth/onboarding" options={{ title: 'Onboarding' }} />

            {/* Main App flow (Tabs/Stack) */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            
            {/* Modal Screens */}
            <Stack.Screen 
              name="client/create-job" 
              options={{ 
                presentation: 'modal',
                headerShown: true,
                title: 'Post a New Job',
                headerTintColor: COLORS.primary
              }} 
            />
            
            <Stack.Screen 
              name="wallet/hub" 
              options={{ 
                title: 'Finance Hub',
                headerShown: false 
              }} 
            />

          </Stack>
        </PremiumProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
