import 'global.css';

import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Provider from '@/components/Provider';

export default function Layout() {
  const router = useRouter();
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1 }} onTouchStart={() => Keyboard.dismiss()}>
        <SignedOut>
          <Stack
            screenOptions={{
              headerLeft: (props) =>
                props.canGoBack && (
                  <TouchableOpacity onPress={router.back}>
                    <Ionicons name="arrow-back" size={34} />
                  </TouchableOpacity>
                ),
              title: '',
              headerShadowVisible: false,
              contentStyle: {
                padding: 16,
                backgroundColor: 'white',
              },
            }}
          />
        </SignedOut>
        <SignedIn>
          <Slot />
        </SignedIn>
      </SafeAreaView>
    </Provider>
  );
}
