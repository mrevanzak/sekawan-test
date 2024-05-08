import type { ExpoConfig } from '@expo/config';

const defineConfig = (): ExpoConfig => ({
  name: 'sekawan-test',
  slug: 'sekawan-test',
  version: process.env.VERSION?.toString(),

  scheme: 'sekawan-test',
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/favicon.png',
  },
  plugins: ['expo-router'],
  experiments: {
    typedRoutes: true,

    tsconfigPaths: true,
  },

  orientation: 'portrait',
  icon: './assets/icon.png',

  userInterfaceStyle: 'light',

  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.mrevanzak.sekawantest',
  },
  android: {
    package: 'com.mrevanzak.sekawantest',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  extra: {
    eas: {
      projectId: '93407f5e-a9e7-4450-9fde-62a0c7db505d',
    },
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  },
});

export default defineConfig;

//merge string without space
''.replace(/\s/g, '');
