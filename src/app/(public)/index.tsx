import { Link } from 'expo-router';
import { H2, Spacer, YStack } from 'tamagui';

import { Button } from '@/components/Button';

export default function Home() {
  return (
    <YStack justifyContent="center" flex={1}>
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
