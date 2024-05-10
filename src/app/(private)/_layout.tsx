import { SignedIn } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function PrivateLayout() {
  return (
    <SignedIn>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: (props) => <Ionicons name="home" {...props} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: (props) => <Ionicons name="person" {...props} />,
          }}
        />
      </Tabs>
    </SignedIn>
  );
}
