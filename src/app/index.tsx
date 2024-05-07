import { useAuth } from '@clerk/clerk-expo';
import { Link, Redirect, Stack } from 'expo-router';
import { H2, Spacer, YStack } from 'tamagui';

import { Button } from '@/components/Button';

export default function Home() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) return <Redirect href="/(protected)" />;

  return (
    <YStack justifyContent="center" flex={1}>
      <Stack.Screen options={{ headerShown: false }} />
      <YStack gap="$5" flex={1} justifyContent="center">
        <H2 alignSelf="center">Welcome!</H2>
      </YStack>

      <Spacer flex />
      <Link href="/sign-in" asChild>
        <Button>Sign In</Button>
      </Link>
    </YStack>
  );
}
