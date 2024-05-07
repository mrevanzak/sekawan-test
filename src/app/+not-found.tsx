import { Link, Stack } from 'expo-router';
import { H1, Main, Paragraph, YStack } from 'tamagui';

import { Container } from '@/components/Container';

export default function NotFoundScreen() {
  return (
    <Container>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Main>
        <YStack>
          <H1>This screen doesn't exist.</H1>
          <Link href="/">
            <Paragraph>Go to home screen!</Paragraph>
          </Link>
        </YStack>
      </Main>
    </Container>
  );
}
