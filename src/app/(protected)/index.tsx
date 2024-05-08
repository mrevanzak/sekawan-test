import { useAuth } from '@clerk/clerk-expo';

import { Button } from '@/components/Button';

export default function ProtectedLayout() {
  const { signOut, isSignedIn } = useAuth();
  return (isSignedIn && <Button onPress={() => signOut}>Sign Out</Button>) || null;
}
