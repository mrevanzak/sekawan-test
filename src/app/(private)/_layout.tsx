import { SignedIn } from '@clerk/clerk-expo';
import { Tabs } from 'expo-router';

export default function PrivateLayout() {
  return (
    <SignedIn>
      <Tabs />
    </SignedIn>
  );
}
