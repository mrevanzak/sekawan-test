import '../global.css';

import { ClerkProvider } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import { Stack } from 'expo-router';

import { tokenCache } from '@/utils/cache';

export default function Layout() {
  if (!Constants.expoConfig?.extra?.clerkPublishableKey) {
    throw new Error('Missing Clerk Publishable Key');
  }

  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
      tokenCache={tokenCache}>
      <Stack />
    </ClerkProvider>
  );
}
