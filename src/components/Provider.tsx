import { ClerkProvider } from '@clerk/clerk-expo';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { ToastProvider, ToastViewport } from '@tamagui/toast';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  focusManager,
} from '@tanstack/react-query';
import Constants from 'expo-constants';
import React, { ReactNode, useEffect, useState } from 'react';
import { AppState, AppStateStatus, Platform, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import config from 'tamagui.config';

import { Toast, useToast } from '@/components/Toast';
import { tokenCache } from '@/lib/cache';

export default function Provider({ children }: { children: ReactNode }) {
  const toast = useToast();
  const colorScheme = useColorScheme();
  const { left, top, right } = useSafeAreaInsets();

  if (!Constants.expoConfig?.extra?.clerkPublishableKey) {
    throw new Error('Missing Clerk Publishable Key');
  }

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            toast.show('Error', {
              message: err.message,
            });
          },
        }),
        mutationCache: new MutationCache({
          onError: (err) => {
            toast.show('Error', {
              message: err.message,
            });
          },
        }),
      })
  );

  useEffect(() => {
    function onAppStateChange(status: AppStateStatus) {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active');
      }
    }

    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
      tokenCache={tokenCache}
    >
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider
          config={config}
          disableInjectCSS
          defaultTheme={colorScheme === 'light' ? 'light' : 'dark'}
        >
          <ToastProvider burntOptions={{ from: 'top' }} swipeDirection="up">
            <ThemeProvider value={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
              {children}
            </ThemeProvider>

            <Toast />
            <ToastViewport flexDirection="column-reverse" top={top} left={left} right={right} />
          </ToastProvider>
        </TamaguiProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
