import 'global.css';

import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spinner } from 'tamagui';

import Provider from '@/components/Provider';

function Layout() {
  const router = useRouter();
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const { isSignedIn, isLoaded } = useAuth();
  console.log('isSignedIn', isSignedIn);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.replace('/(private)');
    } else {
      router.replace('/(public)');
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) return <Spinner flex={1} justifyContent="center" size="large" />;

  return (
    <SafeAreaView style={{ flex: 1 }} onTouchStart={() => Keyboard.dismiss()}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
        initialRouteName="(public)"
      />
    </SafeAreaView>
  );
}

export default function InitialLayout() {
  return (
    <Provider>
      <Layout />
    </Provider>
  );
}
