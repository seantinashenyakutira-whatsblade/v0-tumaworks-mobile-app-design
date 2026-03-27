# 🚀 Tumaworks Mobile Deployment & Production Guide

This guide provides the necessary steps to run, build, and publish the Tumaworks React Native (Expo) application.

## 🛠️ 1. Local Development Environment

### Prerequisites:
- **Node.js**: (LTS version recommended)
- **Expo CLI**: `npm install -g expo-cli`
- **Git**: For version control.
- **Expo Go App**: Install on your iOS/Android device for real-time testing.

### Steps:
1. Clone the repository and navigate into it.
2. Install dependencies:
   ```bash
   npm install
   # Or using yarn
   yarn install
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```
4. Scan the QR code with your phone or use the Android/iOS emulator buttons.

---

## 🔐 2. Setting Environment Variables

### Local (.env):
Create a `.env` file in the root directory for standard local variables:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSy...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=tumaworks-...
EXPO_PUBLIC_STRIPE_KEY=pk_test_...
```

### Production (EAS Build):
For secure production builds, use EAS Secrets:
1. Initialize EAS: `npx eas build:configure`
2. Add secrets:
   ```bash
   npx eas secret:create --name FIREBASE_API_KEY --value "YOUR_API_KEY"
   ```
3. Map these in your `app.config.js` or `app.json` under `extra`.

---

## 📦 5. Building the Mobile App (APK / AAB)

Tumaworks uses Expo Application Services (EAS) for high-performance cloud builds.

### Android Build (APK/AAB):
1. Install EAS CLI: `npm install -g eas-cli`
2. Login to Expo: `npx eas login`
3. Configure project: `npx eas build:configure`
4. **Build APK** (for testing):
   ```bash
   npx eas build --platform android --profile preview
   ```
5. **Build AAB** (for Play Store):
   ```bash
   npx eas build --platform android --profile production
   ```

---

## 📡 6. Publishing to Google Play Store

### A. Prepare Assets
- App Icons: 1024x1024px.
- Adaptive Icon: 1080x1080px.
- Play Store Screenshots (Phone: 2+, Tablet: 2+).

### B. Google Play Console Workflow
1. Create a developer account at [Google Play Console](https://play.google.com/console).
2. Create a new app and complete the **Initial Setup tasks** (Privacy Policy, App Access, Ad Rating).
3. Under **Production**, create a new **Release**.
4. Upload the `.aab` file downloaded from the EAS build dashboard.
5. Provide localized descriptions and store listings.
6. Submit for review (Usually takes 2-7 days).

---

## 🔒 Security Hardening Check (Production Only)
- [ ] Enable Firestore Rules (no public writes except auth-guarded).
- [ ] Set up Firebase App Check for Android.
- [ ] Restrict API keys in Google Cloud Console (referencing the SHA-1 of your app).
- [ ] Enable Stripe Webhooks in your Firebase Functions for secure payment confirmation.
