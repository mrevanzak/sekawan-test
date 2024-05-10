import { SignedOut } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';

export default function PublicLayout() {
  return (
    <SignedOut>
      <Stack
        screenOptions={{
          headerBackTitle: 'Back',

          title: '',
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: 'white',
            padding: 16,
          },
        }}
      />
    </SignedOut>
  );
}
