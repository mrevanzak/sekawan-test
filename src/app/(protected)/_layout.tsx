import { Stack } from 'expo-router';

export default function ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          padding: 16,
          backgroundColor: 'white',
        },
      }}
    />
  );
}
